'use client';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import React, { useEffect, useRef } from 'react';
import s from './cube.module.scss';
import * as THREE from 'three';
import { OrbitControls, ScrollControls } from '@react-three/drei';
import {
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { MeshProps } from '@react-three/fiber';

export const Cube = () => {
  const container = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const smoothProgress = useSpring(progress, { damping: 20 });

  return (
    <div className={s.cubeWrapper} ref={container}>
      <div className={s.cube}>
        <Canvas>
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={2} />
          <directionalLight position={[2, 1, 1]} />
          <Cubed progress={smoothProgress} />
        </Canvas>
      </div>
    </div>
  );
};

export function Cubed({ progress }: { progress: MotionValue<number> }) {
  const mesh = useRef<MeshProps>(null!);

  //   Animation to make cube continuously rotate
  //   useFrame((state, delta) => {
  //     mesh.current.rotation.x += delta * 0.25;
  //     mesh.current.rotation.y += delta * 0.25;
  //     mesh.current.rotation.z += delta * 0.25;
  //   });

  //   Animation to make cube follow the mouse tracking
  //   const options = {
  //     damping: 20,
  //   };

  //   const mouse = {
  //     x: useSpring(useMotionValue(0), options),
  //     y: useSpring(useMotionValue(0), options),
  //   };

  //   const manageMouseMove = (e: MouseEvent) => {
  //     const { clientX, clientY } = e;
  //     const { innerWidth, innerHeight } = window;
  //     const x = -0.5 + clientX / innerWidth;
  //     const y = -0.5 + clientY / innerHeight;

  //     mouse.x.set(x);
  //     mouse.y.set(y);
  //   };

  //   useEffect(() => {
  //     window.addEventListener('mousemove', manageMouseMove);

  //     return () => {
  //       window.removeEventListener('mousemove', manageMouseMove);
  //     };
  //   }, []);
  const texture_1 = useLoader(TextureLoader, '/assets/he-man.png');
  const texture_2 = useLoader(TextureLoader, '/assets/jamie.jpg');

  return (
    <motion.mesh ref={mesh} rotation-y={progress} rotation-x={progress}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial map={texture_1} attach='material-0' />
      <meshStandardMaterial map={texture_2} attach='material-1' />
      <meshStandardMaterial map={texture_1} attach='material-2' />
      <meshStandardMaterial map={texture_2} attach='material-3' />
      <meshStandardMaterial map={texture_1} attach='material-4' />
      <meshStandardMaterial map={texture_2} attach='material-5' />
    </motion.mesh>
  );
}
