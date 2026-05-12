import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, Environment, Float, PresentationControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/models/bmw_m4_f82.glb");
  const ref = useRef<THREE.Group>(null);

  return (
    <Center position={[0, -0.45, 0]}>
      <group ref={ref} scale={1.08}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

useGLTF.preload("/models/bmw_m4_f82.glb");

export const HeroCar3D = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [4.6, 2.15, 5.2], fov: 30 }}
      className="!absolute inset-0 !bg-transparent"
    >
      <ambientLight intensity={0.8} />
      <spotLight position={[5, 8, 5]} angle={0.32} penumbra={1} intensity={2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.9} color="#fff1d6" />
      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0, -0.3, 0]}
          polar={[-0.18, 0.2]}
          azimuth={[-Math.PI, Math.PI]}
          config={{ mass: 2, tension: 420 }}
          snap={{ mass: 2, tension: 260 }}
        >
          <Float rotationIntensity={0.15} floatIntensity={0.4} speed={1.2}>
            <Bounds fit clip observe margin={0.82}>
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
