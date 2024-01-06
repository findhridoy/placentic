import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import UserMenu from "../components/ProfileMenu";

const ProfileLayout = ({ children, title, filter, setFilter }) => {
  return (
    <div className="profileLayout">
      <UserMenu />
      <div className="profileLayout__container">
        <ProfileHeader title={title} filter={filter} setFilter={setFilter} />
        <div className="profileLayout__pages">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
