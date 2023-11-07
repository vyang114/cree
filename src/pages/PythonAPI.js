import React, { useState } from 'react';
import axios from 'axios';

function PythonAPI( {recording} ) {
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState('');

  const handleInference = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/inference', { input_text: recording });
      setOutput(response.data.result);
    } catch (error) {
      console.error('Error performing inference:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleInference}>Perform Inference</button>
      <p>Output: {output}</p>
    </div>
  );
}

export default PythonAPI;
