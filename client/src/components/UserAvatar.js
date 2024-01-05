import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Avatar, Badge, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import ImageHandler from "./ImageHandler";

const UserAvatar = ({ setAvatar, user }) => {
  // States
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

      <ImageHandler
        showImage={showImage}
        setShowImage={setShowImage}
        showImageLoader={showImageLoader}
        setCroppedImage={setCroppedImage}
        setAvatar={setAvatar}
        user={user}
      />
    </div>
  );
};

export default UserAvatar;
