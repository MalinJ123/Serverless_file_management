import React, { useState } from 'react';
import './App.css';
import AWS from 'aws-sdk';

AWS.config.update({
	accessKeyId: '',
	secretAccessKey: '',
	region: 'eu-north-1',
  });

const s3 = new AWS.S3();

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Välj en fil först.');
      return;
    }

    const params = {
      Bucket: 'fabulous-dolphins-uploads',
      Key: selectedFile.name,
      Body: selectedFile,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Fel vid uppladdning:', err);
      } else {
        console.log('Bilden laddades upp!:', data.Location);
      }
    });
  };

  return (
    <>
      <div className='container'>
        <h1 className='title'>Ladda upp bröllopsbilder</h1>
        <input type="file" onChange={handleFileChange} />
        <button className='btn' onClick={handleUpload}>Ladda upp filer</button>
      </div>
    </>
  );
};

export default App;