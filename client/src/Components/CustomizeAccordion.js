import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { useState } from "react";
// import { paymentOption } from "../assets/json/radioData";
import ShippingForm from "./ShippingForm";
import StripePayment from "./StripePayment";
import CustomAlert from "./controls/CustomAlert";
// import CustomRadioGroup from "./controls/CustomRadioGroup";
import UserInfoSkeleton from "./skeletons/UserInfoSkeleton";

// Mui element
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:before": {
    display: "none",
  },
}));

// Mui element
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CustomizeAccordion = ({ isLoading, isError, user, userInfo }) => {
  // States
  const [expanded, setExpanded] = useState(
    userInfo?.isAddress ? "panel3" : "panel2"
  );
  const [radioMode, setRadioMode] = useState("now");

  // Mui element
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="custom__accordion">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        disabled
      >
        <MuiAccordionSummary
          expandIcon={
            <div className="accordion__checkbox">
              <span className="checkbox__text">a</span>
            </div>
          }
        >
          <div className="accordion__summery">
            <div className="accordion__content">
              <div className="accordion__title">
                <span className="title__text">Login</span>
                {!isError && userInfo?.email && (
                  <CheckCircleIcon color="success" />
                )}
              </div>

              {isLoading ? (
                <UserInfoSkeleton size={2} />
              ) : isError ? (
                <CustomAlert severity="warning" message="Somthing was wrong!" />
              ) : (
                <>
                  <span className="user__name">{user?.name}</span>
                  <br />
                  <span className="user__email">{user?.email}</span>
                </>
              )}
            </div>
          </div>
        </MuiAccordionSummary>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        disabled={isError}
      >
        <MuiAccordionSummary
          expandIcon={
            <div className="accordion__checkbox">
              <span className="checkbox__text">b</span>
            </div>
          }
        >
          <div className="accordion__summery">
            <div className="accordion__content">
              <div className="accordion__title">
                <span className="title__text">Shipping Address</span>
                {!isError && userInfo?.isAddress && (
                  <CheckCircleIcon color="success" />
                )}
              </div>

              {isLoading ? (
                <UserInfoSkeleton size={4} />
              ) : isError ? (
                <CustomAlert severity="warning" message="Somthing was wrong!" />
              ) : (
                <span className="user__name">
                  {user?.phone ? "+88" + user?.phone : ""}
                  <br />
                  {user?.address},
                  <br />
                  {user?.city}-{user?.zip_code}, {user?.country}
                </span>
              )}
            </div>

            {!isError && (
              <div className={expanded === "panel2" ? "expanded__icon" : ""}>
                <IconButton>
                  <ExpandMoreIcon />
                </IconButton>
              </div>
            )}
          </div>
        </MuiAccordionSummary>
        <AccordionDetails>
          <ShippingForm user={user} setExpanded={setExpanded} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        disabled={isError}
      >
        <MuiAccordionSummary
          expandIcon={
            <div className="accordion__checkbox">
              <span className="checkbox__text">c</span>
            </div>
          }
        >
          <div className="accordion__summery">
            <div className="accordion__content">
              <div className="accordion__title">
                <span className="title__text">Payment Method</span>
                {/* <CheckCircleIcon color="success" /> */}
              </div>
            </div>
            {!isError && (
              <div className={expanded === "panel3" ? "expanded__icon" : ""}>
                <IconButton>
                  <ExpandMoreIcon />
                </IconButton>
              </div>
            )}
          </div>
        </MuiAccordionSummary>
        <AccordionDetails>
          {/* <div className="accordion__radio">
            <CustomRadioGroup
              radioMode={radioMode}
              setRadioMode={setRadioMode}
              radioData={paymentOption}
            />
          </div> */}

          {/* {radioMode === "now" && <StripePayment />} */}
          <StripePayment />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CustomizeAccordion;
