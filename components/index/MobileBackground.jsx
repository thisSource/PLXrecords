import React, { useState } from "react";
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
  let moverA;
  let moverB;



  const setup = (p5, canvasParentRef) => {
 
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    moverA = new Mover(70, 200, 0.5, p5);
    moverB = new Mover(200, 200, 1, p5);

  };


  const draw = (p5) => {
    p5.background(255, 235, 204);
    let gravity = p5.createVector(0, 0.02);
    let wind = p5.createVector(0.01, 0);
    let weightA = window.p5.Vector.mult(gravity, moverA.mass);
    let weightB = window.p5.Vector.mult(gravity, moverB.mass);

    moverA.applyForce(weightA);
    moverA.applyForce(wind);
    moverA.edges(p5);
    moverA.update();
    moverA.collide(moverB, p5);
    moverA.show(p5, 255);

    moverB.applyForce(weightB);
    moverB.applyForce(wind);
    moverB.edges(p5);
    moverB.update();
    moverB.collide(moverA, p5);
    moverB.show(p5, 20);
  };

  return (
    <div>
      <Sketch
        setup={setup}
        draw={draw}
      />
    </div>
  );
};

class Mover {
  constructor(x, y, m, p5) {
    this.pos = p5.createVector(x, y);
    this.vel = p5.createVector(0, 0);
    this.acc = p5.createVector(0, 0);
    this.mass = m;
    this.r = p5.sqrt(this.mass) * 70;
  }

  applyForce(force) {
    force = window.p5.Vector.div(force, this.mass);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  collide(other, p5, reverb, delay) {
    if (other == this) {
      return;
    }
    let relative = window.p5.Vector.sub(other.pos, this.pos);
    let dist = relative.mag() - (this.r + other.r);
    if (dist < 0) {
      let movement = relative.copy().setMag(Math.abs(dist / 2));
      this.pos.sub(movement);
      other.pos.add(movement);

      let thisToOtherNormal = relative.copy().normalize();
      let approachSpeed =
        this.vel.dot(thisToOtherNormal) + -other.vel.dot(thisToOtherNormal);
      let approachVector = thisToOtherNormal.copy().setMag(approachSpeed);
      this.vel.sub(approachVector);
      other.vel.add(approachVector);
    }
  }

  edges(p5) {
    if (this.pos.x > p5.width - this.r) {
      this.pos.x = p5.width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x < 0 + this.r) {
      this.pos.x = 0 + this.r;
      this.vel.x *= -1;
    }
    if (this.pos.y > p5.height - this.r) {
      this.pos.y = p5.height - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y < +this.r) {
      this.vel.y *= -1;
    }
  }

  show(p5, color) {
    p5.noStroke();
    p5.fill(color);
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
