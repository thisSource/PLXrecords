import React from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(
  () =>
    import("react-p5").then((mod) => {
      require("p5/lib/addons/p5.sound");
      return mod.default;
    }),
  {
    ssr: false
  }
);

export default (props) => {
  let spacing = 50;
  let x = 0;
  let y = 0;
  let startBottom;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(255, 214, 255);
    startBottom = p5.createVector(p5.windowWidth, p5.windowHeight)
    
  };

  const draw = (p5) => {
    p5.stroke(0);
    if (p5.random(1) < 0.5) {
      p5.line(x, y, x + spacing, y + spacing);
    } else {
      p5.line(x, y + spacing, x + spacing, y);
    }
    x += spacing;

    if (x > p5.windowWidth) {
      x = 0;
      y += spacing;
    }
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};
