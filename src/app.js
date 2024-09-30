import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    
    // Generate preview URL
    const fileUrl = URL.createObjectURL(uploadedFile);
    setPreviewUrl(fileUrl);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus(`File uploaded successfully! URL: ${response.data.url}`);
    } catch (error) {
      setUploadStatus('Error uploading file.');
    }
  };

  return (
    <div>
      <h1>Upload and Preview File</h1>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <h3>Preview:</h3>
          <img src={previewUrl} alt="Preview" width="200" />
        </div>
      )}
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default App;
