import React, { useState } from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(
  () =>
    import("react-p5").then((mod) => {
      require("p5/lib/addons/p5.sound");
      return mod.default;
    }),
  {
    ssr: false,
  }
);

let mySound;
let mySound2;

let cnv;
let ocean, oceanB, oceanC, oceanD, oceanE;
let fft;
let spectrum;
const mouseMoved = (p5) => {};

const touchMoved = (p5) => {};

const OceansBackground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundLoading, setSoundLoading] = useState(true);

  const setup = (p5, canvasParentRef) => {
    cnv = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef);

    // p5, xPos, yPos, xSpeed, ySpeed, radius, r, g, b
    ocean = new Ocean(
      p5,
      600,
      400,
      p5.random(-0.2, 0.2),
      p5.random(-0.2, 0.2),
      168 * 3,
      0,
      150,
      250
    );
    oceanB = new Ocean(
      p5,
      600,
      700,
      p5.random(-0.2, 0.2),
      p5.random(-0.2, 0.2),
      85 * 3,
      100,
      100,
      255
    );
    oceanC = new Ocean(
      p5,
      900,
      200,
      p5.random(-0.2, 0.2),
      p5.random(-0.2, 0.2),
      71 * 3,
      50,
      150,
      255
    );
    oceanD = new Ocean(
      p5,
      400,
      600,
      p5.random(-0.2, 0.2),
      p5.random(-0.2, 0.2),
      21 * 3,
      2,
      2,
      255
    );
    oceanE = new Ocean(
      p5,
      1300,
      300,
      p5.random(-0.2, 0.2),
      p5.random(-0.2, 0.2),
      15 * 3,
      150,
      150,
      255
    );


    mySound = p5.loadSound("audio/zeldaslow1.mp3", () => setSoundLoading(false));
    // mySound2 = p5.loadSound("audio/Singular Över Loop 2.mp3", () => setSoundLoading(false));

    fft = new window.p5.FFT(0.1, 16);
  };

  const togglePlay = () => {
    if (mySound.isPlaying()) {
      mySound.pause();
      // mySound2.pause()
      setIsPlaying(false);
    } else {
      mySound.play();
      // mySound2.play()
      setIsPlaying(true);
    }
  };

  const styles = {
    positionCenter:
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform",
    buttonText: "text-xl p-4 text-gray-700 sm:hover:text-gray-600 lg:text-2xl",
  };

  let wave;

const draw = (p5) => {
  p5.background(200);
  // spectrum = fft.analyze();
  
  spectrum = fft.analyze()
  let spectrumAdjustomr = 4000
  // spectrum = fft.getEnergy("treble");

  console.log(spectrum)
  ocean.isOver(p5, "The Pacific Ocean");
  ocean.update(p5);
  ocean.surface(spectrum[5] /spectrumAdjustomr + 0.001, 0.0);
  ocean.display(p5);
  ocean.edges(p5);

  // oceanB.collider(p5, ocean)
  oceanB.isOver(p5, "The Atlantic Ocean");
  oceanB.update(p5);
  oceanB.surface(spectrum[4] / spectrumAdjustomr + 0.001, 0.0);
  oceanB.display(p5);
  oceanB.edges(p5);

  // ocean.collider(p5, oceanB)
  oceanC.isOver(p5, "The Indian Ocean");
  oceanC.update(p5);
  oceanC.surface(spectrum[3] / spectrumAdjustomr + 0.001, 0.0);
  oceanC.display(p5);
  oceanC.edges(p5);

  // oceanB.collider(p5, ocean)
  oceanD.isOver(p5, "The Southern Ocean");
  oceanD.update(p5);
  oceanD.surface(spectrum[2] / spectrumAdjustomr + 0.001, 0.0);
  oceanD.display(p5);
  oceanD.edges(p5);

  // oceanB.collider(p5, ocean)
  oceanE.isOver(p5, "The Arctic Ocean ");
  oceanE.update(p5);
  oceanE.surface(spectrum[1] / spectrumAdjustomr + 0.001, 0.0);
  oceanE.display(p5);
  oceanE.edges(p5);
};


  return (
    <div>
      <div className="absolute bottom-10 w-full px-5">
        <div className="flex justify-between">
          <button className={styles.buttonText} onClick={togglePlay}>
            {soundLoading
              ? "Loading"
              : isPlaying
              ? "Pause audio"
              : "Play audio"}
          </button>
          {/* <a
            href="https://billetto.se/e/plx-tjaro-2022-biljetter-602287"
            target="_blank"
            className={styles.buttonText}
            rel="noopener noreferrer"
          >
            Tickets
          </a> */}
        </div>
      </div>
      <Sketch
        mouseMoved={mouseMoved}
        touchMoved={touchMoved}
        setup={setup}
        draw={draw}
      />
    </div>
  );
};

export default OceansBackground;

class Ocean {
  constructor(p5, xPos, yPos, xSpeed, ySpeed, radius, r, g, b) {
    this.inc = 0.1;
    this.noiseMax = 0.9;
    this.phase = 0.0;
    this.zoff = 0.01;

    this.pos = p5.createVector(xPos, yPos);
    this.vel = p5.createVector(xSpeed, ySpeed);
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  update(p5) {
    p5.ellipseMode(p5.CENTER);
  }

  edges(p5) {
    if (this.pos.x > p5.windowWidth - 100 || this.pos.x < 0 + 100) {
      this.vel.x *= -1;
    }

    if (this.pos.y > p5.windowHeight - 100 || this.pos.y < 0 + 100) {
      this.vel.y *= -1;
    }
  }

  collider(p5, other) {
    if (other == this) {
      return;
    }

    let relative = window.p5.Vector.sub(other.pos, this.pos);
    let dist = relative.mag() - (this.radius + other.radius);
    if (dist < 0) {
      this.color = 255;
    } else {
      this.color = 0;
    }
  }

  surface(zoff, phase) {
    this.zoff += zoff;
    this.phase -= phase;
  }

  display(p5) {
    p5.noStroke();
    p5.stroke(100);
    p5.fill(this.r, this.g, this.b, 30);
    p5.push();
    p5.translate((this.pos.x += this.vel.x), (this.pos.y += this.vel.y));

    p5.beginShape();
    for (let a = 0; a <= p5.TWO_PI; a += this.inc) {
      let xoff = p5.map(p5.cos(a), -1, 1, 0, this.noiseMax);
      let yoff = p5.map(p5.sin(a + this.phase), -1, 1, 0, this.noiseMax);
      let r = p5.map(p5.noise(xoff, yoff, this.zoff), 0, 1, 100, this.radius);
      let x = r * p5.cos(a);
      let y = r * p5.sin(a);
      p5.vertex(x, y);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
    // p5.fill(0,40)
    // p5.ellipse(this.pos.x, this.pos.y, this.radius)
  }

  isOver(p5, ocean) {
    this.b = 255;
    let distA = p5.dist(p5.mouseX, p5.mouseY, this.pos.x, this.pos.y);

    p5.stroke(0);
    if (distA < this.radius / 2) {
      this.b = 0;

      p5.text(ocean, this.pos.x, this.pos.y);
    }
  }
}
