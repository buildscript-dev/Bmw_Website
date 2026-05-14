import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, Environment, Float, PresentationControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/models/1990_bmw_e30_m3_sport_evolution.glb");
  const ref = useRef<THREE.Group>(null);

  return (
    <Center position={[0, -0.45, 0]}>
      <group ref={ref} scale={1.8}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

useGLTF.preload("/models/1990_bmw_e30_m3_sport_evolution.glb");

export const AuthCar3D = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [5, 2.5, 6], fov: 35 }}
      className="!absolute inset-0 !bg-transparent z-0"
    >
      <ambientLight intensity={0.8} />
      <spotLight position={[5, 8, 5]} angle={0.32} penumbra={1} intensity={2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.9} color="#fff1d6" />
      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0.1, -0.4, 0]}
          polar={[-0.1, 0.2]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
          config={{ mass: 2, tension: 420 }}
          snap={{ mass: 2, tension: 260 }}
        >
          <Float rotationIntensity={0.15} floatIntensity={0.4} speed={1.2}>
            <Bounds fit clip observe margin={1.2}>
              <Model />
            </Bounds>
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -0.84, 0]} opacity={0.58} scale={11} blur={2.2} far={4.5} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
};
