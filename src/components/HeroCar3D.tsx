import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Stylized 3D BMW silhouette built from primitives — runs everywhere
 * without external GLB assets. Wraps in PresentationControls for drag-to-rotate.
 */
function CarBody() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
  });

  const bodyMat = <meshPhysicalMaterial color="#e8e2cc" metalness={0.6} roughness={0.25} clearcoat={1} clearcoatRoughness={0.1} />;
  const glassMat = <meshPhysicalMaterial color="#1a2030" metalness={0.2} roughness={0.05} transmission={0.6} thickness={0.5} />;
  const trimMat = <meshStandardMaterial color="#0a0d14" metalness={0.8} roughness={0.3} />;
  const chromeMat = <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.15} />;

  return (
    <group ref={ref} position={[0, -0.2, 0]}>
      {/* Lower body */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[3.6, 0.55, 1.4]} />
        {bodyMat}
      </mesh>
      {/* Hood */}
      <mesh position={[1.3, 0.78, 0]} castShadow>
        <boxGeometry args={[1.0, 0.18, 1.35]} />
        {bodyMat}
      </mesh>
      {/* Trunk */}
      <mesh position={[-1.3, 0.82, 0]} castShadow>
        <boxGeometry args={[1.0, 0.22, 1.35]} />
        {bodyMat}
      </mesh>
      {/* Cabin / roof */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[1.7, 0.5, 1.3]} />
        {bodyMat}
      </mesh>
      {/* Greenhouse / windows */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[1.65, 0.42, 1.32]} />
        {glassMat}
      </mesh>
      {/* Front grille */}
      <mesh position={[1.82, 0.55, 0]}>
        <boxGeometry args={[0.04, 0.25, 0.6]} />
        {trimMat}
      </mesh>
      {/* Headlights */}
      <mesh position={[1.83, 0.6, 0.45]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#ffffcc" emissive="#fff8b0" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[1.83, 0.6, -0.45]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#ffffcc" emissive="#fff8b0" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[1.83, 0.6, 0.25]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#ffffcc" emissive="#fff8b0" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[1.83, 0.6, -0.25]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#ffffcc" emissive="#fff8b0" emissiveIntensity={0.6} />
      </mesh>
      {/* Bumper trim */}
      <mesh position={[1.85, 0.32, 0]}>
        <boxGeometry args={[0.06, 0.12, 1.4]} />
        {trimMat}
      </mesh>
      {/* Wheels */}
      {[
        [1.15, 0.78],
        [1.15, -0.78],
        [-1.15, 0.78],
        [-1.15, -0.78],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0.25, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 28]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 28]} />
            {chromeMat}
          </mesh>
        </group>
      ))}
      {/* Side mirrors */}
      <mesh position={[0.6, 0.95, 0.72]}>
        <boxGeometry args={[0.14, 0.08, 0.1]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.6, 0.95, -0.72]}>
        <boxGeometry args={[0.14, 0.08, 0.1]} />
        {bodyMat}
      </mesh>
    </group>
  );
}

export const HeroCar3D = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [4.5, 2.2, 5], fov: 35 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#ffeacc" />
      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0, -0.3, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.6, 0.6]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 300 }}
        >
          <Float rotationIntensity={0.15} floatIntensity={0.4} speed={1.2}>
            <CarBody />
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -0.05, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
};
