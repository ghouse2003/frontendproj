import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const UploadPreview = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [uploadError, setUploadError] = useState(null);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        // Create a preview URL for the file
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(renderPreview(fileUrl, file.type));
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('File uploaded successfully:', error);
            setUploadError('File uploaded successfully.');
        }
    };

    const renderPreview = (fileUrl, fileType) => {
        if (fileType.startsWith('image/')) {
            return <img src={fileUrl} alt="Preview" />;
        } else if (fileType.startsWith('audio/')) {
            return <audio controls src={fileUrl}>Your browser does not support the audio element.</audio>;
        } else if (fileType.startsWith('video/')) {
            return <video controls width="250"><source src={fileUrl} type={fileType} />Your browser does not support the video tag.</video>;
        } else if (fileType === 'application/pdf') {
            return <embed src={fileUrl} type="application/pdf" width="250" height="200" />;
        } else {
            return <p>Unsupported file format</p>;
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: loginUsername,
                password: loginPassword,
            });
            setLoginMessage('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            setLoginMessage('Login failed.');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username: registerUsername,
                password: registerPassword,
            });
            setRegisterMessage('User registered successfully!');
        } catch (error) {
            console.error('Register error:', error);
            setRegisterMessage('Registration failed.');
        }
    };

    return (
        <div className="container">
            <h1>Upload and Preview File</h1>

            <input type="file" onChange={handleFileChange} />
            <div className="preview-container">
                <h3>Preview:</h3>
                {previewUrl ? previewUrl : <p>No file selected</p>}
            </div>

            <button onClick={handleUpload}>Upload</button>
            {uploadError && <div className="error">{uploadError}</div>}

            <div className="login-section">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                {loginMessage && <div className="success-message">{loginMessage}</div>}
            </div>

            <div className="register-section">
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
                {registerMessage && <div className="success-message">{registerMessage}</div>}
            </div>
        </div>
    );
};

export default UploadPreview;
