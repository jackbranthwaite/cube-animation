'use client';
import { Canvas } from '@react-three/fiber';
import React from 'react';

export const Cube = () => {
  return (
    <div>
      <Canvas>
        <mesh>
          <boxGeometry />
        </mesh>
      </Canvas>
    </div>
  );
};
