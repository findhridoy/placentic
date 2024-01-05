import React from "react";
import AnimatedCursor from "react-animated-cursor";

const Kursor = () => {
  return (
    <>
      <AnimatedCursor
        innerSize={15}
        outerSize={35}
        color="0, 0, 0"
        outerAlpha={0.2}
        innerScale={0.5}
        outerScale={1.5}
      />
    </>
  );
};

export default Kursor;
