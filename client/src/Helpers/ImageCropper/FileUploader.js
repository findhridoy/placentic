import { Button, Input, Modal } from "@mui/material";
import React, { useState } from "react";
import ImageCropper from "./ImageCropper";

const FileUploader = ({ image, setImage, errors }) => {
  const [open, setOpen] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files.length === 0) {
      return alert("Please select a file.");
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setOpen(true);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="fileUploader">
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={onChange}
          sx={{
            display: "none",
          }}
        />
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      {errors?.image && <span className="form__error">{errors?.image}</span>}

      <Modal open={open}>
        <div className="fileUoloader__popup">
          <div className="popup">
            <ImageCropper image={image} setImage={setImage} setOpen={setOpen} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileUploader;
