import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, Environment, PresentationControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type CardCar3DProps = {
  url: string;
  scale?: number;
  position?: [number, number, number];
  className?: string;
};

function Model({ url, scale = 1, position = [0, -0.4, 0] }: { url: string; scale?: number; position?: [number, number, number] }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  return (
    <Center position={position}>
      <group ref={ref} scale={scale}>
        <primitive object={scene.clone()} />
      </group>
    </Center>
  );
}

export const CardCar3D = ({ url, scale = 0.62, position = [0, -0.25, 0], className }: CardCar3DProps) => {
  useEffect(() => {
    useGLTF.preload(url);
  }, [url]);

  return (
    <div className={cn("absolute inset-0 z-10 cursor-grab active:cursor-grabbing", className)}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4.2, 2, 4.8], fov: 32 }}
      >
        <color attach="background" args={["#00000000"]} />
        <ambientLight intensity={0.75} />
        <spotLight position={[5, 8, 5]} angle={0.34} penumbra={1} intensity={1.8} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.7} color="#ffeacc" />
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, -0.3, 0]}
            polar={[-0.14, 0.16]}
            azimuth={[-0.9, 0.9]}
            config={{ mass: 2, tension: 400 }}
            snap={true}
          >
            <Bounds fit clip observe margin={1.18}>
              <Model url={url} scale={scale} position={position} />
            </Bounds>
          </PresentationControls>
          <ContactShadows position={[0, -0.78, 0]} opacity={0.45} scale={7} blur={2.4} far={4} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};
