import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  //   marginTop: "1rem",
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CustomAccordion = () => {
  const [expanded, setExpanded] = React.useState("panel2");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="custom__accordion">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <MuiAccordionSummary
          expandIcon={
            <div className="accordion__checkbox">
              <span className="checkbox__text">a</span>
            </div>
          }
        >
          <div className="accordion__summery">
            <div className="accordion__title">
              <span className="title__text">Login</span>
              <CheckCircleIcon color="success" />
            </div>
            <span className="user__name">User</span>
            <span className="user__phone">024652124154</span>
          </div>
        </MuiAccordionSummary>

        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <MuiAccordionSummary
          expandIcon={
            <div className="accordion__checkbox">
              <span className="checkbox__text">b</span>
            </div>
          }
        >
          <div className="accordion__summery">
            <div className="accordion__title">
              <span className="title__text">Shipping Address</span>
              <CheckCircleIcon color="success" />
            </div>
            {/* <span className="user__name">User</span>
            <span className="user__phone">024652124154</span> */}
          </div>
        </MuiAccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <MuiAccordionSummary
          expandIcon={
            <div className="accordion__checkbox">
              <span className="checkbox__text">c</span>
            </div>
          }
        >
          <div className="accordion__summery">
            <div className="accordion__title">
              <span className="title__text">Payment Method</span>
              <CheckCircleIcon color="success" />
            </div>
            {/* <span className="user__name">User</span>
            <span className="user__phone">024652124154</span> */}
          </div>
        </MuiAccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CustomAccordion;
