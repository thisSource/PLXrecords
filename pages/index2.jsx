import Background from "../components/index/background";
import MobileBackground from "../components/index/MobileBackground";
import Clicked from "../components/index/Clicked";
import React, { useEffect, useState } from "react";
import OceansBackground from "../components/index/oceansBackground";
import OceansBackgroundMobile from "../components/index/OceansBackgroundMobile";

function Index() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    window.innerWidth < 600 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  return (
    <div>
      {isMobile ? (
        <OceansBackgroundMobile />
      ) : (
        <div>
          {" "}
          <OceansBackground />{" "}
        </div>
      )}
    </div>
  );
}

export default Index;
