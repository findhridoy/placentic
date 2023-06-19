import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const CustomDropdown = ({ options, updateStates }) => {
  //   const defaultOption = options[0];

  // set value in state
  const handleDropdownChange = (e) => {
    updateStates(e.value);
  };
  return (
    <div className="customDropdown">
      <span className="customDropdown__title">Sort By</span>
      <Dropdown
        className="customDropdown__dropdown"
        controlClassName="customDropdown__control"
        placeholderClassName="customDropdown__placeholder"
        menuClassName="customDropdown__menu"
        arrowClassName="customDropdown__arrow"
        options={options}
        onChange={(e) => handleDropdownChange(e)}
        // value={defaultOption}
        placeholder="Default"
        arrowClosed={<ArrowDropDownIcon />}
        arrowOpen={<ArrowDropUpIcon />}
      />
    </div>
  );
};

export default CustomDropdown;
