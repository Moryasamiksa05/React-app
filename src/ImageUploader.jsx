import { useRef, useState } from 'react';

const ImageUploader = ({ onUpload }) => {
  const fileInputRef = useRef();
  const [previews, setPreviews] = useState([]);

  const handleSelect = (e) => {
    const files = Array.from(e.target.files);
    const readers = [];

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleUpload = () => {
    if (previews.length > 0) {
      onUpload(previews);
      setPreviews([]);
    }
  };

  return (
    <div className="uploader">
      <h2>Choose Images</h2>
      <div className="upload-box" onClick={() => fileInputRef.current.click()}>
        <p>Click to select images</p>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleSelect}
          style={{ display: 'none' }}
        />
      </div>

      {previews.length > 0 && (
        <>
          <div className="preview-grid">
            {previews.map((src, idx) => (
              <img key={idx} src={src} alt={`preview-${idx}`} className="preview" />
            ))}
          </div>
          <button onClick={handleUpload}>Upload All</button>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
