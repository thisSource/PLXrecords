import { useState } from "react";

function Clicked() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="" onClick={() => setIsClicked(true)}>
      {" "}
      {isClicked ? (
        <span></span>
      ) : (
        <div className="fixed h-screen w-screen">
          <p className="fixed bottom-2 left-8 font-semibold text-sm"> Click anywhere to turn on sound</p>
        </div>
      )}
    </div>
  );
}

export default Clicked;
