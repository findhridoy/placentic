import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../app/features/auth/authApi";
import { paymentOption } from "../assets/json/radioData";
import ShippingForm from "./ShippingForm";
import StripePayment from "./StripePayment";
import CustomRadioGroup from "./controls/CustomRadioGroup";

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

const CustomizeAccordion = () => {
  // *Redux element
  const { data: user } = useGetProfileQuery();

  console.log(user);

  // States
  const [isAddress, setIsAddress] = useState(false);
  const [expanded, setExpanded] = useState("panel2");
  const [radioMode, setRadioMode] = useState("now");

  useEffect(() => {
    if (user?.address && user.zip_code) {
      setIsAddress(true);
    }
  }, [user]);

  console.log(isAddress);

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
            <div>
              <div className="accordion__title">
                <span className="title__text">Login</span>
                {user?.email && <CheckCircleIcon color="success" />}
              </div>
              <span className="user__name">{user?.name}</span>
              <br />
              <span className="user__email">{user?.email}</span>
            </div>
          </div>
        </MuiAccordionSummary>
      </Accordion>

      <Accordion
        expanded={!isAddress && expanded === "panel2"}
        onChange={handleChange("panel2")}

        // disabled={user?.address ? true : false}
      >
        <MuiAccordionSummary
          expandIcon={
            <div className="accordion__checkbox">
              <span className="checkbox__text">b</span>
            </div>
          }
        >
          <div className="accordion__summery">
            <div>
              <div className="accordion__title">
                <span className="title__text">Shipping Address</span>
                {user?.address && <CheckCircleIcon color="success" />}
              </div>

              {user?.address && (
                <span className="user__name">
                  {user?.phone ? "+880" + user?.phone : ""}, {user?.address}{" "}
                  <br /> {user?.city}-{user?.zip_code}, {user?.country}
                </span>
              )}
            </div>

            <div className="accordion__btn btn">
              <Button onClick={() => setIsAddress(false)}>
                <span className="btn__text">Change</span>
              </Button>
            </div>
          </div>
        </MuiAccordionSummary>
        <AccordionDetails>
          <ShippingForm user={user} setExpanded={setExpanded} />
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
          </div>
        </MuiAccordionSummary>
        <AccordionDetails>
          <div className="accordion__radio">
            <CustomRadioGroup
              radioMode={radioMode}
              setRadioMode={setRadioMode}
              radioData={paymentOption}
            />
          </div>

          {radioMode === "now" && <StripePayment />}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CustomizeAccordion;
