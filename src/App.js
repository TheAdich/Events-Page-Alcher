
import './App.css';
import React, { useRef, useState } from "react";
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
      z: 0,
    },
    lookAt: {
      x: 0,
      y: 2,
      z: 0,
    }

  }
]

//a component creating a button as of now!
function Annotations({ controls }) {
  const { camera } = useThree()
  
 
  return (
    <React.Fragment>
      {marks.map((a, i) => {
        return (
          <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg
              height="34"
              width="34"
              transform="translate(-16 -16)"
              style={{ cursor: 'pointer' }}>
              <circle
                cx="17"
                cy="17"
                r="16"
                stroke="white"
                strokeWidth="2"
                className="circle-btn"
                fill="rgba(0,0,0,.66)"
                onPointerUp={() => {
                  
                 
                  
                  const targetX=a.lookAt.x;
                  const targetY=a.lookAt.y;
                  const targetZ=a.lookAt.z;

                  const camPosX=a.camPos.x;
                  const camPosY=a.camPos.y;
                  const camPosZ=a.camPos.z;
                  
                  // change target
                  
                  new TWEEN.Tween(controls.current.target)
                    .to(
                      {
                        x: targetX,
                        y: targetY,
                        z: targetZ,
                      },
                      1000
                    )
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start()

                  // change camera position
                  new TWEEN.Tween(camera.position)
                    .to(
                      {
                        x: camPosX,
                        y: camPosY,
                        z: camPosZ,
                      },
                      1000
                    )
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start()
                    
                }}
              />
              <text
                x="12"
                y="22"
                fill="white"
                fontSize={17}
                fontFamily="monospace"
                style={{ pointerEvents: 'none' }}>
                {i + 1}
              </text>
            </svg>
            
          </Html>
        )
      })}
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
