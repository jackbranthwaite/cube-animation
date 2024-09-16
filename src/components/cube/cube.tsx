'use client';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import React, { useRef } from 'react';
import s from './cube.module.scss';
import * as THREE from 'three';

export default function index() {
  return (
    <div className={s.cubeWrapper}>
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[2, 1, 1]} />
        <Cube />
      </Canvas>
    </div>
  );
}

export function Cube() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.25;
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.z += delta * 0.25;
  });

  const texture_1 = useLoader(TextureLoader, '/assets/he-man.png');
  const texture_2 = useLoader(TextureLoader, '/assets/jamie.jpg');

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial map={texture_1} attach='material-0' />
      <meshStandardMaterial map={texture_2} attach='material-1' />
      <meshStandardMaterial map={texture_1} attach='material-2' />
      <meshStandardMaterial map={texture_2} attach='material-3' />
      <meshStandardMaterial map={texture_1} attach='material-4' />
      <meshStandardMaterial map={texture_2} attach='material-5' />
    </mesh>
  );
}
