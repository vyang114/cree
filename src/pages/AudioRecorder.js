import { useState, useEffect, useRef } from "react";
import { webmFixDuration } from "./BlobFix";
import axios from 'axios';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import '../styles/audioRecorder.css'

function getMimeType() {
    const types = [
        "audio/webm",
        "audio/mp4",
        "audio/ogg",
        "audio/wav",
        "audio/aac",
    ];
    for (let i = 0; i < types.length; i++) {
        if (MediaRecorder.isTypeSupported(types[i])) {
            return types[i];
        }
    }
    return undefined;
}

const client = new S3Client({
    credentials: {
        accessKeyId: "AKIATELQNZIIDWI5KOZY",
        secretAccessKey: "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"
    },
    region: "ca-central-1"
});

export default function AudioRecorder(onRecordingComplete) {
    const [recording, setRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [output, setOutput] = useState('');

    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const audioRef = useRef(null);

    const startRecording = async () => {
        // Reset recording (if any)
        setRecordedBlob(null);

        let startTime = Date.now();

        try {
            if (!streamRef.current) {
                streamRef.current = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
            }

            const mimeType = getMimeType();
            const mediaRecorder = new MediaRecorder(streamRef.current, {
                mimeType,
            });

            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.addEventListener("dataavailable", async (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
                if (mediaRecorder.state === "inactive") {
                    const duration = Date.now() - startTime;

                    // Received a stop event
                    let blob = new Blob(chunksRef.current, { type: mimeType });

                    if (mimeType === "audio/webm") {
                        blob = await webmFixDuration(blob, duration, blob.type);
                    }

                    setRecordedBlob(blob);
                    onRecordingComplete = blob;
                    // console.log('Blob size:', blob.size);

                    const formData = new FormData();
                    let audio = new Audio(`/assets/sounds/apple.wav`)
                    
                    // console.log("blob", blob)
                    
                    // audio_file has to match with Python's /inference function
                    formData.append('audio_file', blob, "recording.webm");
                    
                    // for (var key of formData.entries()) {
                    //   console.log(key[0] + ', ' + key[1]);
                    // }

                    // const blobUrl = URL.createObjectURL(blob)
                    // let file = new File([blob], 'browser.wav', { type: 'audio/wav',    lastModified: Date.now() })
                    // console.log(file)
                    // await uploadFilesToS3('wav','/',file,'browser.wav')
                    // console.log("after upload")
                    
                    handleInference(formData);

                    chunksRef.current = [];
                }
            });
            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const uploadFilesToS3 = async(extension,path,file,fileName) => {
        const command = new PutObjectCommand({
            Bucket: "cree-audio",
            Key: fileName,
            Body: file,
          });

          try {
            const response = await client.send(command);
            console.log(response);
          } catch (err) {
            console.error(err);
          }
      }

    const handleInference = async ( formData ) => {
        
      try {
        const response = await axios.post('http://127.0.0.1:8000/inference', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const obj = JSON.parse(response.data.body);
        console.log(obj.result)
        setOutput(obj.result);
    //     // setOutput(response.data.result);
    } catch (error) {
        console.error('Error performing inference:', error);
    }
    
    // try {
    //     const response = await axios.get('http://127.0.0.1:8000/inference?audio_file=onion.wav', {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //   } catch (error) {
    //     console.error('Error performing inference:', error);
    //   }
    
    // const response = await fetch("https://t7sdin3c04.execute-api.ca-central-1.amazonaws.com/dev", {
    //     method: 'GET',
    //     headers: {
    //       "Content-Type": "application/json"
    //     //   'Content-Type': 'multipart/form-data',
    //     },
    //     redirect: 'follow'
    //   });
    //     const obj = JSON.parse(response.data.result);
        // console.log(response.result)
        // setOutput(response.data.body);
    };

    const stopRecording = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state === "recording"
        ) {
            mediaRecorderRef.current.stop(); // set state to inactive
            setDuration(0);
            setRecording(false);
        }
    };

    useEffect(() => {
        let stream = null;

        if (recording) {
            const timer = setInterval(() => {
                setDuration((prevDuration) => prevDuration + 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [recording]);

    const handleToggleRecording = () => {
        if (recording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <button
                type='button'
                // className="audio-button"
                onClick={handleToggleRecording}
            >
                {recording
                    ? `Stop Recording`
                    : "Start Recording"}
            </button>

            {recordedBlob && (
                <audio className='w-full' ref={audioRef} controls>
                    <source
                        src={URL.createObjectURL(recordedBlob)}
                        type={recordedBlob.type}
                    />
                </audio>
            )}
          
          <div>
        <p>Detected: {output}</p>
        </div>
        </div>
    );
}
