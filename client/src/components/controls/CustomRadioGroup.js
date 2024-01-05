import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const CustomRadioGroup = ({ radioMode, setRadioMode, radioData }) => {
  return (
    <div className="customRadioGroup">
      <FormControl>
        <RadioGroup
          aria-labelledby="custom-radio-buttons-group"
          name="custom-radio-buttons-group"
          value={radioMode}
          onChange={(e) => setRadioMode(e.target.value)}
        >
          {radioData?.map((data) => (
            <FormControlLabel
              value={data?.value}
              control={<Radio size="small" />}
              label={data?.label}
              key={data?.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default CustomRadioGroup;
