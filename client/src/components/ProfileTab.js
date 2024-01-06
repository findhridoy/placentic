import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import ProductTabSkeleton from "./skeletons/ProductTabSkeleton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const ProfileTab = ({ product, loading }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {loading ? (
        <ProductTabSkeleton />
      ) : (
        <>
          <AppBar position="static" color="transparent">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Recent Order" {...a11yProps(0)} />
              <Tab label="Addresses" {...a11yProps(1)} />
              {/* <Tab label="Additional Info" {...a11yProps(2)} /> */}
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {/* <ProductReview product={product} loading={loading} /> */}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {/* addresses */}
            </TabPanel>
            {/* <TabPanel value={value} index={2} dir={theme.direction}>
              <span className="product__description">
                There are no additional information set yet.
              </span>
            </TabPanel> */}
          </SwipeableViews>
        </>
      )}
    </Box>
  );
};

export default ProfileTab;
