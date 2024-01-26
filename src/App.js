import "./App.css";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
//import { Museum } from "./gltfFiles/Museum_new";
import TWEEN from "@tweenjs/tween.js";
//import { Model_Museum } from "./gltfFiles/Museum_woTextures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Museum } from "./gltfFiles/Museum_FinalExport1";
import './FadeInComponent.css';

const marks = [
  {
    title2: "last-room",
    title1: "room-1",
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
    title2: "room-1",
    title1: "room-2",
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
    title2: "room-2",
    title1: "room-3",
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
    title2: "room-3",
    title1: "Home",
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

  const [isAnimating, setIsAnimating] = useState(false);
  const [title1, setTitle1] = useState(list.head.data.title1);
  const [title2, setTitle2] = useState(list.head.data.title2);
  const controls = useRef();
  const camera = useRef();
  let [now, setNow] = useState(list.head);




  const forward = () => {
    setIsAnimating(true);

    // Reset the animation after a delay (duration of your animation)
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    setNow((prevNow) => {
      const updateDelay = 500;
      setTimeout(() => {
        setTitle1(prevNow.next.data.title1);
        setTitle2(prevNow.next.data.title2);
      }, updateDelay)
      return prevNow.next;
    });
  };

  const backward = () => {
    setIsAnimating(true);

    // Reset the animation after a delay (duration of your animation)
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    const updateDelay = 500;
    setTimeout(() => {
      setTitle1(now.prev.data.title1);
      setTitle2(now.prev.data.title2);
    }, updateDelay)
    setNow(now.prev);
  };

  const backToHome = () => {
    setIsAnimating(true);

    // Reset the animation after a delay (duration of your animation)
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    const updateDelay = 500;
    setTimeout(() => {
      setTitle1(list.head.data.title1);
      setTitle2(list.head.data.title2);
    }, updateDelay);

    setNow(list.head);
  }

  useEffect(() => {
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
      <span className="forward-container">
        <button className="btn btn-forward"
          onClick={() => {
            forward();
          }}
        >
          <span className={`fade-in ${isAnimating ? 'animating' : ''}`} >{title1}
          </span>
        </button>


        <FontAwesomeIcon icon={faArrowRight} className="forward-svg" />
      </span>

      <span className="backward-container">
        <FontAwesomeIcon icon={faArrowLeft} className="backward-svg" />
        <button className="btn btn-backward"
          onClick={() => {
            backward();
          }}
        >
          <span className={`fade-in ${isAnimating ? 'animating' : ''}`} >{title2}
          </span>
        </button>
      </span>

      <button className="back-to-home" onClick={() => {
        backToHome();
      }}>
        Back to home
      </button>


    </React.Fragment>
  );
  return (
    <div className="wrapper">
      <Canvas>
        <ambientLight intensity={1}></ambientLight>
        <PerspectiveCamera ref={camera} makeDefault position={[0, 2, -25]} />

        <OrbitControls
          ref={controls}
          enableZoom={false}
          target={[0, 0, 0]}
        />
        <ambientLight intensity={1} castShadow />
        <Museum rotation={[0, 0, 0]} />
        <axesHelper args={[10]} />
        <Tween />

      </Canvas>
      <div id="ui">{buttons}</div>
    </div>
  );
}

export default App;
