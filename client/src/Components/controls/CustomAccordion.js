import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React from "react";

const CustomAccordion = ({ title, children, ...others }) => {
  return (
    <div className="customAccordion">
      <Accordion
        defaultExpanded={true}
        square={true}
        disableGutters={true}
        {...others}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h4 className="customAccordion__title">{title}</h4>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomAccordion;
