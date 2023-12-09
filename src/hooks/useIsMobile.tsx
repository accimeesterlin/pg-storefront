import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileDevice);
    };

    // Initial check
    checkIsMobile();

    // Event listener for changes in window size
    const resizeHandler = () => {
      checkIsMobile();
    };

    window.addEventListener("resize", resizeHandler);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
