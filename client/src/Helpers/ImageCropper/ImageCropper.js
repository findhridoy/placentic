import CloseIcon from "@mui/icons-material/Close";
import CropIcon from "@mui/icons-material/Crop";
import FlipIcon from "@mui/icons-material/Flip";
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import { Box, IconButton, Skeleton } from "@mui/material";
import React, { useRef, useState } from "react";
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";
import CustomButton from "../../components/controls/CustomButton";
import { dataURLtoFile } from "../ImageHandler/ConvertDataURL";

const ImageCropper = ({ image, setImage, filename, setOpen }) => {
  const cropperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  //   const [aspectRatio, setAspectRatio] = useState(1);

  //   const handleChange = (e) => {
  //     setAspectRatio(e.target.value);
  //   };

  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const imgBase64 = cropper.getCroppedCanvas().toDataURL();
    const canvasURLToFile = dataURLtoFile(imgBase64, filename);

    setImage(canvasURLToFile);
    setOpen(false);
  };
  const rotate = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.rotate(90);
  };
  const flip = (type) => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (type === "h") {
      cropper.scaleX(scaleX === 1 ? -1 : 1);
      setScaleX(scaleX === 1 ? -1 : 1);
    } else {
      cropper.scaleY(scaleY === 1 ? -1 : 1);
      setScaleY(scaleY === 1 ? -1 : 1);
    }
  };
  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" width={"100%"} height={400} />
      )}
      <Box display={"flex"} justifyContent={"flex-end"} mb={1}>
        {/* <Box>
          <span className="select__title">Aspect Ratio </span>
          <Select value={aspectRatio} onChange={handleChange}>
            <MenuItem value={1}>Default</MenuItem>
            <MenuItem value={3 / 2}>3 : 2</MenuItem>
            <MenuItem value={4 / 3}>4 : 3</MenuItem>
            <MenuItem value={16 / 9}>16 : 9</MenuItem>
          </Select>
        </Box> */}
        <Box>
          <IconButton onClick={rotate}>
            <ScreenRotationIcon />
          </IconButton>
          <IconButton onClick={() => flip("h")}>
            <FlipIcon />
          </IconButton>
          <IconButton onClick={() => flip("v")}>
            <FlipIcon sx={{ transform: "rotate(-90deg)" }} />
          </IconButton>
        </Box>
      </Box>

      <Cropper
        src={image}
        style={{ height: 500, width: "100%" }}
        // Cropper.js options
        initialAspectRatio={16 / 9}
        guides={true}
        responsive={true}
        ready={() => {
          setLoading(false);
        }}
        ref={cropperRef}
        viewMode={1}
      />

      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <CustomButton
          className="btn btn__dark"
          text="Select Image"
          loading={loading}
          type="button"
          startIcon={!loading && <CropIcon />}
          onClick={handleClick}
        />
        <CustomButton
          className="btn btn__dark"
          text="Cancel"
          type="button"
          startIcon={<CloseIcon />}
          onClick={() => setOpen(false)}
        />
      </Box>
    </>
  );
};

export default ImageCropper;
