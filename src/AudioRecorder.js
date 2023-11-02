import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

const AudioRecorderComponent = () => {
  const [audioData, setAudioData] = useState(null);

  const handleAudioData = (data) => {
    setAudioData(data);
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <AudioRecorder
        onData={handleAudioData}
        title="Record your voice"
        startLabel="Start Recording"
        stopLabel="Stop Recording"
      />
      {audioData && (
        <audio controls>
          <source src={audioData.url} type="audio/wav" />
        </audio>
      )}
    </div>
  );
};

export default AudioRecorderComponent;
