import CloseIcon from "@mui/icons-material/Close";
import CropIcon from "@mui/icons-material/Crop";
import FlipIcon from "@mui/icons-material/Flip";
import { MenuItem, Select, Slider, ToggleButton } from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { dataURLtoFile } from "../helpers/ImageHandler/ConvertDataURL";
import getCroppedImg from "../helpers/ImageHandler/CroppedImage";
import CustomButton from "./controls/CustomButton";
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
  const [rotation, setRotation] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [selected, setSelected] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [aspectRatio, setAspectRatio] = useState(1);

  const handleChange = (event) => {
    setAspectRatio(event.target.value);
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
    } catch (error) {
      // error
    }
  };

  // Cancel crop area
  const cancelCropArea = () => {
    setShowImage(null);
  };

  // Flip image
  // useEffect(() => {
  //   if (selected) {
  //     setRotation(180);
  //     setScaleX(-1);
  //   }
  //   if (!selected) {
  //     setRotation(0);
  //     setScaleX(1);
  //   }
  // }, [selected]);

  const handleFlipImage = () => {
    if (!selected) {
      setScaleX(-1);
    }
    if (selected) {
      setScaleX(1);
    }
  };

  return (
    <>
      {showImage && (
        <div className="imageHandler__container">
          <Cropper
            mediaClassName="cropImage__container"
            // transform={selected ? `scalex(${scaleX})` : ""}
            image={showImage}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />

          <div className="imageHandler__slider">
            <Slider
              disabled={selected}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
              valueLabelDisplay="auto"
            />
            <ToggleButton
              value="check"
              size="small"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
              onClick={handleFlipImage}
            >
              <FlipIcon />
            </ToggleButton>
          </div>

          <div className="imageHandler__btnContainer">
            <div className="button__group">
              <CustomButton
                className="btn btn__dark"
                text="Select Image"
                loading={loading}
                type="button"
                startIcon={!loading && <CropIcon />}
                onClick={handleCroppedImage}
              />
              <CustomButton
                className="btn btn__dark"
                text="Cancel"
                type="button"
                startIcon={<CloseIcon />}
                onClick={cancelCropArea}
              />
            </div>

            <div className="imageHandler__select">
              <span className="select__title">Aspect Ratio </span>
              <Select value={aspectRatio} onChange={handleChange}>
                <MenuItem value={1}>Default</MenuItem>
                <MenuItem value={3 / 2}>3 : 2</MenuItem>
                <MenuItem value={4 / 3}>4 : 3</MenuItem>
                <MenuItem value={16 / 9}>16 : 9</MenuItem>
              </Select>
            </div>
          </div>
        </div>
      )}
      {showImageLoader && <CustomLoader size={40} />}
    </>
  );
};

export default ImageHandler;
