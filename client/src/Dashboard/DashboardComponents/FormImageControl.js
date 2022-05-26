import React, { useRef, useState } from "react";
import ImageHandler from "../../Components/ImageHandler";

const FormImageControl = ({ setImage, errors, user }) => {
  const [showImage, setShowImage] = useState(null);
  const [showImageLoader, setShowImageLoader] = useState();
  const [croppedImage, setCroppedImage] = useState(null);

  // Refs
  const fileRef = useRef();

  // File setup
  const handleFileChange = (event) => {
    if (event.target.files.length !== 0) {
      setShowImageLoader(true);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setShowImage(reader.result);
        setShowImageLoader(false);
      };
    }
  };
  return (
    <>
      <span className="form__group">
        <label className="form__label">Image</label>
        <input
          className="form__control"
          type="file"
          ref={fileRef}
          // style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {errors?.image && <span className="form__error">{errors?.image}</span>}
      </span>

      <ImageHandler
        showImage={showImage}
        setShowImage={setShowImage}
        showImageLoader={showImageLoader}
        setCroppedImage={setCroppedImage}
        setAvatar={setImage}
        user={user}
      />
    </>
  );
};

export default FormImageControl;
