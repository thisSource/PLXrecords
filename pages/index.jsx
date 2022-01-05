import Background from "../components/index/background";
import MobileBackground from "../components/index/MobileBackground";
import Clicked from "../components/index/Clicked";
import React, { useEffect, useState } from "react";

function Index() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    window.innerWidth < 600 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  return (
    <div>
      {isMobile ? (
        <MobileBackground />
      ) : (
        <div>
          {" "}
          <Clicked /> <Background />{" "}
        </div>
      )}
    </div>
  );
}

export default Index;
