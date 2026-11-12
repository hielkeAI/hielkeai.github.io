'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Pixel-ish desk diorama: a chunky monitor showing a Discord chat,
 * a stack of books, a coffee mug steaming, a pencil, and an orbiting
 * homework paper. Slowly auto-rotates so all sides are visible.
 */

function Desk() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* Desk top */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.2, 3.5]} />
        <meshStandardMaterial color="#2a5a18" />
      </mesh>
      {/* Desk edge highlight */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[6, 0.04, 3.5]} />
        <meshStandardMaterial color="#a6ff3d" emissive="#a6ff3d" emissiveIntensity={0.15} />
      </mesh>
      {/* legs */}
      <mesh position={[-2.7, -0.7, -1.4]}>
        <boxGeometry args={[0.3, 1.4, 0.3]} />
        <meshStandardMaterial color="#1a2e12" />
      </mesh>
      <mesh position={[2.7, -0.7, -1.4]}>
        <boxGeometry args={[0.3, 1.4, 0.3]} />
        <meshStandardMaterial color="#1a2e12" />
      </mesh>
    </group>
  );
}

function Monitor() {
  const screenRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (screenRef.current) {
      // gentle screen flicker
      screenRef.current.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 8) * 0.05;
    }
  });
  return (
    <group position={[0, 0.2, -0.4]}>
      {/* Monitor stand */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#1a2e12" />
      </mesh>
      <mesh position={[0, -0.95, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial color="#1a2e12" />
      </mesh>
      {/* Monitor body */}
      <RoundedBox args={[3, 1.8, 0.2]} radius={0.05} smoothness={2}>
        <meshStandardMaterial color="#0a1208" />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[2.8, 1.6]} />
        <meshStandardMaterial
          ref={screenRef}
          color="#11200c"
          emissive="#a6ff3d"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Discord-ish chat bubbles on screen */}
      <group position={[0, 0, 0.12]}>
        {/* sidebar */}
        <mesh position={[-1.25, 0, 0]}>
          <planeGeometry args={[0.3, 1.5]} />
          <meshStandardMaterial color="#1a2e12" />
        </mesh>
        {/* chat lines */}
        {[
          { y: 0.5, w: 1.8, c: '#5fe0a0' },
          { y: 0.2, w: 1.5, c: '#c8ffb0' },
          { y: -0.1, w: 1.9, c: '#a6ff3d' },
          { y: -0.4, w: 1.2, c: '#5fe0a0' },
          { y: -0.65, w: 1.7, c: '#c8ffb0' },
        ].map((l, i) => (
          <mesh key={i} position={[-0.1, l.y, 0]}>
            <planeGeometry args={[l.w, 0.16]} />
            <meshStandardMaterial color={l.c} />
          </mesh>
        ))}
      </group>
      {/* Hielke label on monitor frame */}
      <Text
        position={[1.2, -0.78, 0.13]}
        fontSize={0.08}
        color="#a6ff3d"
        anchorX="right"
      >
        ✳ hielke ai
      </Text>
    </group>
  );
}

function Books() {
  return (
    <group position={[1.9, -0.95, 0.5]} rotation={[0, -0.3, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 0.25, 0.8]} />
        <meshStandardMaterial color="#a6ff3d" />
      </mesh>
      <mesh position={[0.05, 0.28, 0.02]} rotation={[0, 0, 0.04]}>
        <boxGeometry args={[1.0, 0.22, 0.75]} />
        <meshStandardMaterial color="#ff8c42" />
      </mesh>
      <mesh position={[-0.04, 0.52, -0.02]} rotation={[0, 0, -0.04]}>
        <boxGeometry args={[1.15, 0.2, 0.78]} />
        <meshStandardMaterial color="#5fe0a0" />
      </mesh>
      {/* book pages peeking */}
      <mesh position={[0, 0.12, 0.41]}>
        <planeGeometry args={[1.0, 0.18]} />
        <meshStandardMaterial color="#c8ffb0" />
      </mesh>
    </group>
  );
}

function CoffeeMug() {
  const steamRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (steamRef.current) {
      const t = state.clock.elapsedTime;
      steamRef.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        m.position.y = 0.3 + ((t * 0.3 + i * 0.4) % 1) * 0.8;
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.opacity = 0.5 - ((t * 0.3 + i * 0.4) % 1) * 0.5;
        m.scale.setScalar(0.1 + ((t * 0.3 + i * 0.4) % 1) * 0.18);
      });
    }
  });
  return (
    <group position={[-2, -0.95, 0.6]}>
      {/* mug body */}
      <mesh>
        <cylinderGeometry args={[0.28, 0.24, 0.5, 16]} />
        <meshStandardMaterial color="#a6ff3d" />
      </mesh>
      {/* coffee */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 16]} />
        <meshStandardMaterial color="#0a1208" />
      </mesh>
      {/* handle */}
      <mesh position={[0.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.04, 8, 24]} />
        <meshStandardMaterial color="#2a5a18" />
      </mesh>
      {/* steam */}
      <group ref={steamRef} position={[0, 0.3, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[i * 0.08 - 0.08, 0, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#c8ffb0" transparent opacity={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Pencil() {
  return (
    <group position={[1.4, -1.05, 1.1]} rotation={[0, 0.4, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 6]} />
        <meshStandardMaterial color="#ffd23f" />
      </mesh>
      {/* tip */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.05, 0.18, 6]} />
        <meshStandardMaterial color="#0a1208" />
      </mesh>
      {/* eraser */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.12, 6]} />
        <meshStandardMaterial color="#ff4d6d" />
      </mesh>
    </group>
  );
}

function FloatingPaper() {
  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <group position={[0, 0.8, 1.2]} rotation={[0.3, 0.5, 0.1]}>
        <mesh>
          <boxGeometry args={[0.7, 0.95, 0.03]} />
          <meshStandardMaterial color="#c8ffb0" />
        </mesh>
        {[-0.1, -0.25, -0.4, -0.55].map((y, i) => (
          <mesh key={i} position={[0, y, 0.02]}>
            <planeGeometry args={[0.55, 0.05]} />
            <meshStandardMaterial color="#2a5a18" />
          </mesh>
        ))}
        {/* big red checkmark box */}
        <mesh position={[0.2, 0.3, 0.02]}>
          <planeGeometry args={[0.12, 0.12]} />
          <meshStandardMaterial color="#a6ff3d" emissive="#a6ff3d" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.5;
    }
  });
  return (
    <group ref={ref}>
      <Desk />
      <Monitor />
      <Books />
      <CoffeeMug />
      <Pencil />
      <FloatingPaper />
    </group>
  );
}

export default function HomeworkScene3D({
  className,
  height = 360,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <Canvas
        camera={{ position: [3.5, 1.5, 4.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} color="#c8ffb0" />
        <pointLight position={[-3, 2, -2]} intensity={0.6} color="#5fe0a0" />
        <Scene />
      </Canvas>
    </div>
  );
}
