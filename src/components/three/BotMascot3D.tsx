'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Float, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Hielke Bot — a friendly pixel-ish robot built from primitive geometry.
 * Body: rounded box, head: rounded box, one big eye that blinks,
 * antenna with a glowing ball, little arms, treads for feet.
 * Reacts to mouse movement by tilting toward the cursor.
 */

function BotBody() {
  const headRef = useRef<THREE.Group>(null);
  const eyeRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const blinkRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (headRef.current) {
      const targetY = pointer.x * 0.5 + Math.sin(t * 0.6) * 0.08;
      const targetX = -pointer.y * 0.35 + Math.sin(t * 0.9) * 0.05;
      headRef.current.rotation.y += (targetY - headRef.current.rotation.y) * 0.08;
      headRef.current.rotation.x += (targetX - headRef.current.rotation.x) * 0.08;
    }
    if (antennaRef.current) {
      const s = 1 + Math.sin(t * 4) * 0.18;
      antennaRef.current.scale.setScalar(s);
      const mat = antennaRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8 + Math.sin(t * 4) * 0.4;
    }
    if (eyeRef.current) {
      eyeRef.current.rotation.y = pointer.x * 0.3;
      eyeRef.current.rotation.x = -pointer.y * 0.3;
    }
    if (blinkRef.current) {
      const blinkCycle = Math.sin(t * 1.3);
      const isBlinking = blinkCycle > 0.985;
      blinkRef.current.scale.y = isBlinking ? 6 : 0.2;
      blinkRef.current.visible = isBlinking || blinkCycle > 0.97;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      {/* Body torso */}
      <RoundedBox args={[1.6, 1.4, 1.2]} radius={0.18} smoothness={3} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#a6ff3d" metalness={0.3} roughness={0.45} />
      </RoundedBox>
      {/* Body panel detail */}
      <mesh position={[0, -0.2, 0.61]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial color="#0a1208" />
      </mesh>
      {/* little chest screen */}
      <mesh position={[0, -0.2, 0.62]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshStandardMaterial color="#1a2e12" emissive="#5fe0a0" emissiveIntensity={0.4} />
      </mesh>
      {/* chest screen text bars */}
      {[-0.25, 0, 0.25].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 0.625]}>
          <planeGeometry args={[0.15, 0.3]} />
          <meshStandardMaterial color="#a6ff3d" emissive="#a6ff3d" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Head group (tilts toward mouse) */}
      <group ref={headRef} position={[0, 1.05, 0]}>
        <RoundedBox args={[1.5, 1.2, 1.2]} radius={0.16} smoothness={3}>
          <meshStandardMaterial color="#c8ffb0" metalness={0.4} roughness={0.35} />
        </RoundedBox>
        {/* Visor */}
        <mesh position={[0, 0.05, 0.61]}>
          <planeGeometry args={[1.15, 0.7]} />
          <meshStandardMaterial color="#0a1208" emissive="#1a2e12" emissiveIntensity={0.5} />
        </mesh>
        {/* Eye (cyclops) */}
        <mesh ref={eyeRef} position={[0, 0.05, 0.62]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#a6ff3d" emissive="#a6ff3d" emissiveIntensity={1.4} />
        </mesh>
        {/* pupil */}
        <mesh position={[0, 0.05, 0.78]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#0a1208" />
        </mesh>
        {/* eyelid (for blink) */}
        <mesh ref={blinkRef} position={[0, 0.18, 0.63]} visible={false}>
          <planeGeometry args={[0.5, 0.4]} />
          <meshStandardMaterial color="#c8ffb0" />
        </mesh>
        {/* Side ears */}
        <mesh position={[-0.82, 0, 0]}>
          <boxGeometry args={[0.18, 0.5, 0.5]} />
          <meshStandardMaterial color="#2a5a18" />
        </mesh>
        <mesh position={[0.82, 0, 0]}>
          <boxGeometry args={[0.18, 0.5, 0.5]} />
          <meshStandardMaterial color="#2a5a18" />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
          <meshStandardMaterial color="#2a5a18" />
        </mesh>
        {/* Antenna ball */}
        <mesh ref={antennaRef} position={[0, 1.18, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#a6ff3d" emissive="#a6ff3d" emissiveIntensity={1.2} />
        </mesh>
        <pointLight position={[0, 1.18, 0]} color="#a6ff3d" intensity={2} distance={4} />
      </group>

      {/* Arms */}
      <group position={[-1, -0.1, 0]}>
        <mesh rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.12, 0.12, 0.9, 12]} />
          <meshStandardMaterial color="#2a5a18" />
        </mesh>
        <mesh position={[-0.18, -0.5, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#a6ff3d" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>
      <group position={[1, -0.1, 0]}>
        <mesh rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.12, 0.12, 0.9, 12]} />
          <meshStandardMaterial color="#2a5a18" />
        </mesh>
        <mesh position={[0.18, -0.5, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#a6ff3d" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>

      {/* Tread feet */}
      <mesh position={[-0.45, -1.1, 0]}>
        <boxGeometry args={[0.55, 0.35, 1.1]} />
        <meshStandardMaterial color="#0a1208" />
      </mesh>
      <mesh position={[0.45, -1.1, 0]}>
        <boxGeometry args={[0.55, 0.35, 1.1]} />
        <meshStandardMaterial color="#0a1208" />
      </mesh>
      <mesh position={[-0.45, -1.1, 0.56]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial color="#2a5a18" />
      </mesh>
      <mesh position={[0.45, -1.1, 0.56]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial color="#2a5a18" />
      </mesh>
    </group>
  );
}

function OrbitingPapers() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  const papers = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        radius: 2.6 + (i % 2) * 0.4,
        height: Math.sin(i) * 0.7,
        spin: i * 0.7,
        color: i % 2 === 0 ? '#c8ffb0' : '#a6ff3d',
      })),
    []
  );
  return (
    <group ref={groupRef}>
      {papers.map((p, i) => (
        <group
          key={i}
          position={[Math.cos(p.angle) * p.radius, p.height, Math.sin(p.angle) * p.radius]}
          rotation={[p.spin, p.angle, 0]}
        >
          <mesh>
            <boxGeometry args={[0.5, 0.65, 0.04]} />
            <meshStandardMaterial color={p.color} />
          </mesh>
          {[0.18, 0.08, -0.02, -0.12, -0.22].map((y, j) => (
            <mesh key={j} position={[0, y, 0.025]}>
              <planeGeometry args={[0.4, 0.04]} />
              <meshStandardMaterial color="#2a5a18" />
            </mesh>
          ))}
          <mesh position={[0.12, 0.28, 0.025]}>
            <planeGeometry args={[0.08, 0.08]} />
            <meshStandardMaterial color="#ff4d6d" emissive="#ff4d6d" emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const r = 3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a6ff3d" size={0.08} sizeAttenuation />
    </points>
  );
}

export default function BotMascot3D({
  className,
  height = 460,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <Canvas
        camera={{ position: [0, 0.5, 6.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 6, 4]} intensity={1.1} color="#c8ffb0" />
        <pointLight position={[-4, -2, 3]} intensity={0.6} color="#5fe0a0" />
        <Float speed={2.2} rotationIntensity={0.25} floatIntensity={1.1}>
          <BotBody />
        </Float>
        <OrbitingPapers />
        <Particles />
        <Torus args={[2.4, 0.04, 8, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
          <meshStandardMaterial color="#2a5a18" />
        </Torus>
        <Sphere args={[0.05, 8, 8]} position={[2.4, -1.6, 0]}>
          <meshStandardMaterial color="#a6ff3d" emissive="#a6ff3d" emissiveIntensity={2} />
        </Sphere>
      </Canvas>
    </div>
  );
}
