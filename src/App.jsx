import React, { useState } from 'react';
import './App.css';
import AWS from 'aws-sdk';
import { useEffect } from 'react';


AWS.config.update({
	accessKeyId: '',
	secretAccessKey: '',
	region: '',
  });



const s3 = new AWS.S3();

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages()
  }, []);

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

        setImages((prevImages) => [...prevImages, selectedFile.name])
      }
    });
  };

const getImages = () => {
    const params = {
      Bucket: 'fabulous-dolphins-uploads',
    };

    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.error('Fel vid hämtning av bilder:', err);
      } else {

        const imageList = data.Contents.map((obj) => obj.Key);
        setImages(imageList);
      }
    });
  };

  return (
    <>
      <section className='container'>
        <div className="top-div">
          <h1 className='title'>Ladda upp bröllopsbilder</h1>
          <div className="input-div">
            <input type="file" onChange={handleFileChange} />
          </div>
          <button className='btn' onClick={() => { handleUpload(); }}>Ladda upp filer</button>
        </div>
        <div className="image-list">
          {images.map((imageName, index) => (
            <img
              key={index}
              src={`https://fabulous-dolphins-uploads.s3.eu-north-1.amazonaws.com/${imageName}`}
              alt={imageName}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default App; 