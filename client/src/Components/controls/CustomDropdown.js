import React from "react";

const CustomDropdown = ({ options, selectedStates, updateStates }) => {
  // set value in state
  const handleDropdownChange = (e) => {
    updateStates(e.target.value);
  };
  return (
    <div className="customDropdown">
      <span className="customDropdown__title">Sort By</span>
      <div className="custom-select">
        <select value={selectedStates} onChange={handleDropdownChange}>
          {options?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomDropdown;
