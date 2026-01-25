import { useEffect, useState } from "react";

export const useScroll = () => {
  const [scrolledTop, setScrolledTop] = useState(window.scrollY === 0);

  useEffect(() => {
    const onWindowScroll = () => {
      setScrolledTop(window.scrollY <= 0);
    };

    window.addEventListener("scroll", onWindowScroll);

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  return {
    scrolledTop,
  };
};
