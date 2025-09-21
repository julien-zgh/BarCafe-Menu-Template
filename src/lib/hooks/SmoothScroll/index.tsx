import { useEffect } from "react";

const useSmoothScroll = (multiplier = 0.3) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy({
        top: e.deltaY * multiplier,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [multiplier]);
};

export default useSmoothScroll;
