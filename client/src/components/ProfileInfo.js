import React from "react";

const ListItem = ({ register, isEdit, property, value }) => {
  return (
    <li className="profileInfo__item">
      <span className="item__property">{property}</span>
      {isEdit ? (
        <input
          className="form__control"
          type="text"
          defaultValue={value ? value : ""}
          {...register(property)}
        />
      ) : (
        <span className="item__value">{value ? value : "Not set yet."}</span>
      )}
    </li>
  );
};

const ProfileInfo = ({ register, isEdit, user }) => {
  return (
    <>
      <ul className="profileInfo__list">
        <ListItem
          register={register}
          isEdit={isEdit}
          property="name"
          value={user?.name}
        />

        <ListItem
          register={register}
          isEdit={isEdit}
          property="username"
          value={user?.username}
        />

        <ListItem
          register={register}
          isEdit={isEdit}
          property="email"
          value={user?.email}
        />

        <ListItem
          register={register}
          isEdit={isEdit}
          property="phone"
          value={user?.phone}
        />

        <ListItem
          register={register}
          isEdit={isEdit}
          property="country"
          value={user?.country}
        />
      </ul>
    </>
  );
};

export default ProfileInfo;
