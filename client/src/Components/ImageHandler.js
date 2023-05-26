import CloseIcon from "@mui/icons-material/Close";
import CropIcon from "@mui/icons-material/Crop";
import { Button, CircularProgress, Slider } from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { dataURLtoFile } from "../helpers/ImageHandler/ConvertDataURL";
import getCroppedImg from "../helpers/ImageHandler/CroppedImage";
import CustomLoader from "./controls/CustomLoader";

const ImageHandler = ({
  showImage,
  setShowImage,
  showImageLoader,
  setCroppedImage,
  setAvatar,
  user,
}) => {
  // States
  const [loading, setLoading] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Crop result
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Set Cropped image
  const handleCroppedImage = async () => {
    try {
      setLoading(true);
      const canvas = await getCroppedImg(showImage, croppedAreaPixels);
      const canvasDataURL = canvas.toDataURL("image/jpeg");
      const avatarName = `${user?.username.toLowerCase()}-avatar.jpeg`;
      const canvasURLToFile = dataURLtoFile(canvasDataURL, avatarName);
      setCroppedImage(canvasDataURL);
      setAvatar(canvasURLToFile);
      setShowImage(null);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Cancel crop area
  const cancelCropArea = () => {
    setShowImage(null);
  };
  return (
    <>
      {showImage && (
        <div className="imageHandler__container">
          <Cropper
            mediaClassName="cropImage__container"
            image={showImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />

          <Slider
            min={1}
            step={0.1}
            value={zoom}
            onChange={(e, zoom) => setZoom(zoom)}
            valueLabelDisplay="auto"
          />

          <div className="imageHandler__btnContainer">
            <div className="button__group">
              <div className="btn btn__dark">
                <Button
                  type="button"
                  startIcon={!loading && <CropIcon />}
                  onClick={handleCroppedImage}
                  // disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={30} thickness={3} />
                  ) : (
                    "Select Image"
                  )}
                </Button>
              </div>
              <div className="btn btn__dark">
                <Button
                  type="button"
                  startIcon={<CloseIcon />}
                  onClick={cancelCropArea}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showImageLoader && <CustomLoader size={40} />}
    </>
  );
};

export default ImageHandler;
