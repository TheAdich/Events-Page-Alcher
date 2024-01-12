import "./App.css";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stats, Html, Text } from "@react-three/drei";
import { Museum } from "./gltfFiles/Museum_new";
import TWEEN from "@tweenjs/tween.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const marks = [
  {
    title: "Computer Screen",
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
    buttonAt: {
      x: -15,
      y: 2,
      z: 0,
    },
  },
  {
    title: "Computer Screen",
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
    buttonAt: {
      x: -15,
      y: 2,
      z: 15,
    },
  },
  {
    title: "Computer Screen",
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
    buttonAt: {
      x: -8,
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

  // Add a node to the end of the list
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      // If the list is empty, set the new node as the head and tail
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Connect the new node to the tail and update the tail
      newNode.prev = this.tail;
      newNode.next = this.head; // Circular connection
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // Display the elements of the list
  display() {
    let current = this.head;

    if (!current) {
      console.log("Circular Doubly Linked List is empty");
      return;
    }

    do {
      console.log(current.data);
      current = current.next;
    } while (current !== this.head);
  }
}

// Example usage:
const list = new CircularDoublyLinkedList();

marks.forEach((obj) => {
  list.append(obj);
});
console.log(list);

//a component creating a button as of now!
function Annotations({ controls }) {
  const { camera } = useThree();
  let now = list.head;

  const forward = () => {
    now = now.next;
  };

  useEffect(() => {
    console.log("rendering...");
  }, [now]);

  return (
    <Html className="hello" fullscreen>
      <FontAwesomeIcon
        className="icon-right"
        icon={faAnglesRight}
        onClick={forward}
        onPointerUp={() => {
          // change target
          new TWEEN.Tween(controls.current.target)
            .to(
              {
                x: now.data.lookAt.x,
                y: now.data.lookAt.y,
                z: now.data.lookAt.z,
              },
              4000
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start();

          // change camera position
          new TWEEN.Tween(camera.position)
            .to(
              {
                x: now.data.camPos.x,
                y: now.data.camPos.y,
                z: now.data.camPos.z,
              },
              4000
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
        }}
      />
      <FontAwesomeIcon icon={faAnglesLeft} className="icon-left" />
    </Html>
  );
}

//Tween component to update
function Tween() {
  useFrame(() => {
    TWEEN.update();
  });
}

function App() {
  const ref = useRef();
  return (
    <div className="wrapper">
      <Canvas camera={{ fov: 60, position: [0, 2, -25] }}>
        <Suspense fallback={null}>
          <OrbitControls ref={ref} enableZoom={!false} target={[0, 0, 0]} />
          <ambientLight intensity={0.3} castShadow />
          <Museum rotation={[0, 0, 0]} />
          <axesHelper args={[10]} />
          <Annotations controls={ref} />
          <Tween />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
