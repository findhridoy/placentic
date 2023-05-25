import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../App/actions/userActions";
import ShippingForm from "./ShippingForm";
import StripePayment from "./StripePayment";

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

const CustomAccordion = () => {
  // Mui element
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // *Redux element
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userProfile);
  const { user: updateUser } = useSelector((state) => state.updateUserProfile);

  // States
  const [expanded, setExpanded] = useState(user?.address ? "panel3" : "panel2");
  const [action, setAction] = useState(user?.address ? true : false);

  useEffect(() => {
    dispatch(getUserProfile("profile"));
  }, [dispatch, updateUser]);

  // console.log(userInfo);

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
            <div className="accordion__title">
              <span className="title__text">Login</span>
              {user?.email && <CheckCircleIcon color="success" />}
            </div>
            <span className="user__name">{user?.name}</span>
            <span className="user__phone">
              {/* {user?.phone ? "+880-" + user?.phone : ""} */}
              {user?.email}
            </span>
          </div>
        </MuiAccordionSummary>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        disabled={action}
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
              {user?.address && <CheckCircleIcon color="success" />}
            </div>

            {user?.address && (
              <span className="user__name">
                {user?.phone}, {user?.address} <br /> {user?.city}-
                {user?.zip_code}, {user?.country}
              </span>
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
          <StripePayment />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CustomAccordion;
