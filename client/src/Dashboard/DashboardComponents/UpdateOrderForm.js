import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React from "react";
import CustomButton from "../../components/controls/CustomButton";

const UpdateOrderForm = ({
  title,
  handleSubmit,
  label,
  register,
  inputName,
  data,
  errors,
  setOpen,
}) => {
  return (
    <div className="addProducts">
      <div className="addProducts__form">
        <h2 className="form__title">{title}</h2>
        <form onSubmit={handleSubmit}>
          <span className="form__group">
            <label className="form__label">{label}</label>
            <select className="form__select" {...register(`${inputName}`)}>
              <option className="form__option" value="">
                Select
              </option>

              {data?.map((option, index) => (
                <option className="form__option" value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
            {errors?.inputName && (
              <span className="form__error">{errors?.inputName?.message}</span>
            )}
          </span>

          <CustomButton
            className="addProducts__btn btn small__btn btn__dark"
            text="Update"
            loading={false}
            type="submit"
          />
        </form>
        <div className="addProducts__close">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderForm;
