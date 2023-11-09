import { useState, useEffect, useRef } from "react";
import { webmFixDuration } from "./BlobFix";
import axios from 'axios';

import { S3, PutObjectCommand, S3Client, ManagedUpload } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Buffer } from "buffer";
import { toWav } from 'audiobuffer-to-wav';

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
                    
                    const audioContext = new AudioContext();
                    const fileReader = new FileReader();
                    // Set up file reader on loaded end event
                    fileReader.onloadend = () => {
                        const arrayBuffer = fileReader.result; // as ArrayBuffer;
                
                        // Convert array buffer into audio buffer
                        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                        // Do something with audioBuffer
                        console.log(audioBuffer);
                        var MP3Blob = audioBufferToWav(audioBuffer);
                        // onStop(MP3Blob, audioBuffer);
                        console.log(MP3Blob)
                        uploadFilesToS3('wav','/', MP3Blob,'browser.wav')  // this should be await
                        });
                    };

                    //Load blob
                    fileReader.readAsArrayBuffer(blob);

                    console.log('Blob:', blob);

                    if (mimeType === "audio/webm") {
                        blob = await webmFixDuration(blob, duration, blob.type);
                    }

                    setRecordedBlob(blob);
                    onRecordingComplete = blob;

                    const formData = new FormData();
                    // audio_file has to match with Python's /inference function
                    formData.append('audio_file', blob, "recording.webm");
                    
                    // for (var key of formData.entries()) {
                    //   console.log(key[0] + ', ' + key[1]);
                    // }

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

    function audioBufferToWav(aBuffer) {
        let numOfChan = aBuffer.numberOfChannels,
          btwLength = aBuffer.length * numOfChan * 2 + 44,
          btwArrBuff = new ArrayBuffer(btwLength),
          btwView = new DataView(btwArrBuff),
          btwChnls = [],
          btwIndex,
          btwSample,
          btwOffset = 0,
          btwPos = 0;
        setUint32(0x46464952); // "RIFF"
        setUint32(btwLength - 8); // file length - 8
        setUint32(0x45564157); // "WAVE"
        setUint32(0x20746d66); // "fmt " chunk
        setUint32(16); // length = 16
        setUint16(1); // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(aBuffer.sampleRate);
        setUint32(aBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2); // block-align
        setUint16(16); // 16-bit
        setUint32(0x61746164); // "data" - chunk
        setUint32(btwLength - btwPos - 4); // chunk length
      
        for (btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++)
          btwChnls.push(aBuffer.getChannelData(btwIndex));
      
        while (btwPos < btwLength) {
          for (btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
            // interleave btwChnls
            btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])); // clamp
            btwSample =
              (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) | 0; // scale to 16-bit signed int
            btwView.setInt16(btwPos, btwSample, true); // write 16-bit sample
            btwPos += 2;
          }
          btwOffset++; // next source sample
        }
      
        return new Blob([btwArrBuff], { type: "audio/wav" });
      
        function setUint16(data) {
          btwView.setUint16(btwPos, data, true);
          btwPos += 2;
        }
      
        function setUint32(data) {
          btwView.setUint32(btwPos, data, true);
          btwPos += 4;
        }
      }

    const uploadFilesToS3 = async(extension,path,file,fileName) => {
        var albumBucketName = "cree-audio";
        var bucketRegion = "us-east-1";

        const client = new S3Client(
            {
                region:'ca-central-1',
                credentials:{
                    accessKeyId:'AKIATELQNZIIKRWIAJP5',
                    secretAccessKey:'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'
                }
            }
        );

        var command = new PutObjectCommand({
              Bucket: albumBucketName,
              Key: fileName,
              Body: file
          });
        
        const response = await client.send(command);
        
        (async () => {
            const response = await client.send(command);
            console.log("response", response);
        })();
        
        // const command = new PutObjectCommand({
        //     Bucket: "cree-audio",
        //     Key: fileName,
        //     Body: file,
        //   });

        //   try {
        //     const response = await client.send(command);
        //     console.log(response);
        //   } catch (err) {
        //     console.error(err);
        //   }
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
