import CloseIcon from "@mui/icons-material/Close";
import CropIcon from "@mui/icons-material/Crop";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  IconButton,
  Slider,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { dataURLtoFile } from "../Helpers/CropImageResult/ConvertDataURL";
import getCroppedImg from "../Helpers/CropImageResult/CropImage";

const UserAvatar = ({ setAvatar, user }) => {
  // States
  const [loading, setLoading] = useState();
  const [showImage, setShowImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Refs
  const fileRef = useRef();

  // File setup
  const handleFileChange = (event) => {
    if (event.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setShowImage(reader.result);
      };
    }
  };

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
    <div className="userAvater">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <IconButton size="small" onClick={() => fileRef.current.click()}>
            <PhotoCameraIcon />
            <input
              type="file"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </IconButton>
        }
      >
        <Avatar
          sx={{ width: 150, height: 150 }}
          alt={user?.name}
          src={croppedImage ? croppedImage : user?.avatar ? user?.avatar : ""}
        />
      </Badge>

      {showImage && (
        <div className="userAvatar__cropContainer">
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

          <div className="userAvater__btnContainer">
            <div className="button__group">
              <div className="btn btn__dark">
                <Button
                  type="button"
                  startIcon={!loading && <CropIcon />}
                  onClick={handleCroppedImage}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={30} />
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
    </div>
  );
};

export default UserAvatar;
