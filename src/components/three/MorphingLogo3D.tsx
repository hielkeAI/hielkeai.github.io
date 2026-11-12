'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Octahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Morphing ✳ star logo: a glossy green octahedron (think D8 dice / star shape
 * silhouette) that wobbles continuously, rotates, and on click explodes into
 * particles before reforming.
 */

function StarShape({ exploded, onDone }: { exploded: boolean; onDone: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const sparkleRef = useRef<THREE.Points>(null);
  const burstRef = useRef<THREE.Group>(null);
  const burstStart = useRef<number | null>(null);
  const burstParticles = useMemo(() => {
    const arr = Array.from({ length: 30 }, (_, i) => {
      const theta = (i / 30) * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 2 + Math.random() * 2;
      return {
        pos: [0, 0, 0] as [number, number, number],
        vel: [
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.cos(phi) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
        ] as [number, number, number],
      };
    });
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.6;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.3;
      if (!exploded) {
        const s = 1 + Math.sin(t * 2) * 0.06;
        meshRef.current.scale.setScalar(s);
      } else {
        // shrink the star
        const s = Math.max(0, meshRef.current.scale.x - delta * 4);
        meshRef.current.scale.setScalar(s);
      }
    }
    if (sparkleRef.current) {
      sparkleRef.current.rotation.y = -t * 0.3;
    }
    if (exploded && burstRef.current) {
      if (burstStart.current === null) burstStart.current = t;
      const elapsed = t - burstStart.current;
      burstRef.current.visible = true;
      burstRef.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        const p = burstParticles[i];
        if (!p) return;
        m.position.set(
          p.vel[0] * elapsed,
          p.vel[1] * elapsed - 1.5 * elapsed * elapsed,
          p.vel[2] * elapsed
        );
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.opacity = Math.max(0, 1 - elapsed * 0.8);
        m.scale.setScalar(Math.max(0.01, 1 - elapsed * 0.5));
      });
      if (elapsed > 1.6) {
        // reset
        burstRef.current.visible = false;
        burstStart.current = null;
        if (meshRef.current) meshRef.current.scale.setScalar(0.01);
        onDone();
      }
    } else if (burstRef.current) {
      burstRef.current.visible = false;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          // trigger via parent state; handled by onPointerDown in parent
        }}
      >
        <Octahedron args={[1.3, 0]}>
          <MeshDistortMaterial
            color="#a6ff3d"
            emissive="#5fe0a0"
            emissiveIntensity={0.4}
            metalness={0.5}
            roughness={0.15}
            distort={0.35}
            speed={3}
          />
        </Octahedron>
      </mesh>
      {/* inner glow core */}
      <mesh scale={0.6}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#c8ffb0" emissive="#a6ff3d" emissiveIntensity={1.5} />
      </mesh>
      {/* Sparkles around the star */}
      <Sparkles
        ref={sparkleRef}
        count={24}
        scale={4}
        size={4}
        speed={0.4}
        color="#a6ff3d"
      />
      {/* Burst particles group */}
      <group ref={burstRef} visible={false}>
        {burstParticles.map((_, i) => (
          <mesh key={i}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#a6ff3d' : '#c8ffb0'}
              emissive="#a6ff3d"
              emissiveIntensity={1}
              transparent
              opacity={1}
            />
          </mesh>
        ))}
      </group>
      {/* Star pulse light */}
      <pointLight color="#a6ff3d" intensity={3} distance={6} />
    </group>
  );
}

export default function MorphingLogo3D({
  className,
  height = 220,
}: {
  className?: string;
  height?: number;
}) {
  const [exploded, setExploded] = useState(false);

  return (
    <div
      className={className}
      style={{ width: '100%', height, cursor: 'pointer' }}
      onClick={() => {
        if (!exploded) setExploded(true);
      }}
      role="button"
      aria-label="Click the star to make it explode"
      title="Click me!"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.3} color="#c8ffb0" />
        <pointLight position={[-3, -2, 2]} intensity={0.7} color="#5fe0a0" />
        <StarShape exploded={exploded} onDone={() => setExploded(false)} />
      </Canvas>
    </div>
  );
}
