import { useEffect, useState } from "react";

const useDebounce = (keyword, timeout, callback) => {
  const [timer, setTimer] = useState(null);

  const clearTime = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    clearTime();

    if (keyword && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
};

export default useDebounce;
