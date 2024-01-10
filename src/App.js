
import './App.css';
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stats, Html, Text } from "@react-three/drei";
import { Museum } from './gltfFiles/Museum_new';

function App() {
  const ref=useRef();
  return (
    <div className='wrapper'>
      <Canvas camera={{ fov: 60, position: [0, 2, -25] }}>
        <OrbitControls />
        <ambientLight intensity={0.3} castShadow />
        <Museum/>
        <axesHelper args={[10]} />
      </Canvas>
    </div>

   
    
  );
}

export default App;
