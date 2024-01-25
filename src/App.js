import "./App.css";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Museum } from "./gltfFiles/Museum_new";
import TWEEN from "@tweenjs/tween.js";
import { Model_Museum } from "./gltfFiles/Museum_woTextures";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const marks = [
  {
    title: "Home",
    description: "Alcher-related display image!",
    camPos: {
      x: 0,
      y: 2,
      z: -25,
    },
    lookAt: {
      x: 0,
      y: 2,
      z: 0,
    },
  },
  {
    title: "First-Room",
    description: "Alcher-related display image!",
    camPos: {
      x: 0,
      y: 2,
      z: -5,
    },
    lookAt: {
      x: 0,
      y: 2,
      z: 0,
    },
  },
  {
    title: "Second-Room",
    description: "Alcher-related display image!",
    camPos: {
      x: 0,
      y: 2,
      z: 10,
    },
    lookAt: {
      x: 0,
      y: 2,
      z: 15,
    },
  },
  {
    title: "Third-Room",
    description: "Alcher-related display image!",
    camPos: {
      x: 0,
      y: 2,
      z: 25,
    },
    lookAt: {
      x: 0,
      y: 2,
      z: 30,
    },
  },
];

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class CircularDoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      newNode.next = this.head;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
}

const list = new CircularDoublyLinkedList();

marks.forEach((obj) => {
  list.append(obj);
});
list.head.prev = list.tail;
list.tail.next = list.head;

function Tween() {
  useFrame(() => {
    TWEEN.update();
  });
}

function App() {
  const controls = useRef();
  const camera = useRef();

  let [now, setNow] = useState(list.head);

  const forward = () => {
    setNow((prevNow) => {
      return prevNow.next;
    });
  };

  const backward = () => {
    setNow(now.prev);
  };

  useEffect(() => {
    console.log("where is my node->", now);
    if (controls.current) {
      new TWEEN.Tween(controls.current.target)
        .to(
          {
            x: now.data.lookAt.x,
            y: now.data.lookAt.y,
            z: now.data.lookAt.z,
          },
          3000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();

      new TWEEN.Tween(camera.current.position)
        .to(
          {
            z: now.data.camPos.z,
          },
          3000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    }
  }, [now]);

  const buttons = (
    <React.Fragment>
      <button
        onClick={() => {
          forward();
        }}
      >
        forward
      </button>
      <button
        onClick={() => {
          backward();
        }}
      >
        backward
      </button>
    </React.Fragment>
  );
  return (
    <div className="wrapper">
      <Canvas>
        <PerspectiveCamera ref={camera} makeDefault position={[0, 2, -25]} />
        <Suspense fallback={null}>
          <OrbitControls
            ref={controls}
            enableZoom={!false}
            target={[0, 0, 0]}
          />
          <ambientLight intensity={0.3} castShadow />
          <Model_Museum rotation={[0, 0, 0]} />
          <axesHelper args={[10]} />
          <Tween />
        </Suspense>
      </Canvas>
      <div id="ui">{buttons}</div>
    </div>
  );
}

export default App;
