import { Skeleton, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import ProductReview from "./ProductReview";

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

const ProductTab = ({ product, loading }) => {
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
      <AppBar position="static" color="transparent">
        {loading ? (
          <Stack justifyContent="space-between" direction="row" spacing={1}>
            <Skeleton
              height={49}
              width="100%"
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              height={49}
              width="100%"
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              height={49}
              width="100%"
              animation="wave"
              variant="rectangular"
            />
          </Stack>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label={`Reviews (${product?.countReviews})`}
              {...a11yProps(0)}
            />
            <Tab label="Description" {...a11yProps(1)} />
            <Tab label="Additional Info" {...a11yProps(2)} />
          </Tabs>
        )}
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ProductReview product={product} loading={loading} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <span className="product__description">{product?.description}</span>
          <span className="product__description">{product?.description}</span>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}></TabPanel>
      </SwipeableViews>
    </Box>
  );
};

export default ProductTab;
