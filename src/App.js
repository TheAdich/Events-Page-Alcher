
import './App.css';
import React, { useRef, useState , useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stats, Html, Text } from "@react-three/drei";
import { Museum } from './gltfFiles/Museum_new';
import TWEEN from '@tweenjs/tween.js'


const marks = [
 {
    title: 'Computer Screen',
    description: 'Alcher-related display image!',
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
    buttonAt:{
      x:-15,
      y:2,
      z:0
    }

  },
  {
    title: 'Computer Screen',
    description: 'Alcher-related display image!',
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
    buttonAt:{
      x:-15,
      y:2,
      z:15
    }

  },
  {
    title: 'Computer Screen',
    description: 'Alcher-related display image!',
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
    buttonAt:{
      x:-8,
      y:2,
      z:30
    }

  }
]






//a component creating a button as of now!
function Annotations({ controls }) {
  const { camera } = useThree()
  let [a,setA]=useState(0);


  const forward=()=>{
    console.log(a);
    if(a===2) setA(0)
    else setA((prev)=>(prev+1))
    
    //console.log("clicked!",a)
  }


  useEffect(()=>{
    
    console.log('rendering...')
  },[a])



  return (
    <React.Fragment>
    <Html  key={a} position={[marks[a].buttonAt.x, marks[a].buttonAt.y, marks[a].buttonAt.z]} >
    <svg
      height="34"
      width="34"
      transform="translate(-16 -16)"
      style={{ cursor: 'pointer' }}
      onClick={forward}
      onPointerUp={() => {
        
        // change target
        new TWEEN.Tween(controls.current.target)
          .to(
            {
              x: marks[a].lookAt.x,
              y: marks[a].lookAt.y,
              z: marks[a].lookAt.z
            },
            4000
          )
          .easing(TWEEN.Easing.Cubic.Out)
          .start()

        // change camera position
        new TWEEN.Tween(camera.position)
          .to(
            {
              x: marks[a].camPos.x,
              y: marks[a].camPos.y,
              z: marks[a].camPos.z
            },
            4000
          )
          .easing(TWEEN.Easing.Cubic.Out)
          .start()
      }}
      >

      {/*
    <circle
         cx="17"
         cy="17"
         r="16"
         stroke="white"
         strokeWidth="2"
         fill="rgba(0,0,0,.66)"
    
       />*/}
      <text
        x="12"
        y="22"
        fill="white"
        fontSize={17}
        fontFamily="monospace"
        style={{ pointerEvents: 'none' }}>
        {a}
      </text>
    </svg>
    
  </Html>
    </React.Fragment>
  )
}

//Tween component to update
function Tween() {
  useFrame(() => {
    TWEEN.update()
  })
}


function App() {
  const ref=useRef();
  return (

    <div className='wrapper'>
      <Canvas camera={{ fov: 60, position: [0, 2, -25] }}>
      <OrbitControls
      ref={ref}
      enableZoom={true}/>
        <ambientLight intensity={0.3} castShadow />
        <Museum/>
        <axesHelper args={[10]} />
        <Annotations controls={ref} />
        <Tween />
      </Canvas>

     
    </div>

   
    
  );
}

export default App;
