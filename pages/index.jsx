import Background from "../components/index/background";
import MobileBackground from "../components/index/MobileBackground";
import React, { useEffect, useState } from "react";

function Index() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    window.innerWidth < 600 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  return (
    <div>
      {/* <p className="fixed top-1/2 -left-24 transform -rotate-90 text-sm">Click anywhere to start and stop sound</p> */}
      {isMobile ? <MobileBackground /> : <Background />}
    </div>
  );
}

export default Index;
