import { useEffect, useState } from "react";

function useInvolvScreenSize() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [isTabTwo, setIsTabTwo] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.screen.width < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }

      if (window.screen.width >= 768 && window.screen.width < 1280) {
        setIsTab(true);
      } else {
        setIsTab(false);
      }

      if (window.screen.width >= 768 && window.screen.width < 1024) {
        setIsTabTwo(true);
      } else {
        setIsTabTwo(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return [isMobile, isTab, isTabTwo];
}

export default useInvolvScreenSize;
