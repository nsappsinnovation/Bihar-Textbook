import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import VRHand from './VRHand';

const AnatomicalBrain = ({ isExploded }) => {
  const { scene } = useGLTF('/3d_models/brain/source/Brain.glb');
  const groupRef = useRef();

  useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.x += (scene.position.x - center.x);
      scene.position.y += (scene.position.y - center.y);
      scene.position.z += (scene.position.z - center.z);
      
      // Calculate explode directions
      scene.traverse((child) => {
        if (child.isMesh) {
          child.userData.originalPosition = child.position.clone();
          const meshBox = new THREE.Box3().setFromObject(child);
          const meshCenter = meshBox.getCenter(new THREE.Vector3());
          // Direction away from the center of the whole model
          child.userData.explodeDirection = meshCenter.clone().sub(center).normalize();
          // If the center is exactly at origin and mesh is too, give it a random or up direction
          if (child.userData.explodeDirection.length() === 0) {
            child.userData.explodeDirection = new THREE.Vector3(0, 1, 0);
          }
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.userData.originalPosition) {
          const target = child.userData.originalPosition.clone();
          if (isExploded) {
             // Move outwards by 2 units
             target.add(child.userData.explodeDirection.clone().multiplyScalar(2));
          }
          child.position.lerp(target, 0.05);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={1.5} 
        position={[0, 0, 0]} 
      />
    </group>
  );
};

// Error Boundary
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-2xl text-center w-80">
            <h3 className="text-white font-bold text-lg mb-2">3D Model Missing</h3>
            <p className="text-slate-300 text-sm">
              Brain model load nahi ho paya.
            </p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

const Real3DBrain = () => {
  const [isExploded, setIsExploded] = useState(false);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl bg-slate-950">
      
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-2xl font-black text-blue-400 drop-shadow-md tracking-wider">
          Human Anatomy: 3D Brain
        </h2>
        <p className="text-blue-200/70 text-sm font-bold mt-1">
          Interactive Medical Model • 360° View
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-emerald-400 font-bold tracking-widest text-sm uppercase">Loading Brain...</div>
            </div>
          </Html>
        }>
          <ModelErrorBoundary>
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ccffcc" />
            
            <AnatomicalBrain isExploded={isExploded} />
            
            <ContactShadows 
              position={[0, -3, 0]} 
              opacity={0.7} 
              scale={20} 
              blur={2} 
              far={10} 
              color="#000000"
            />
            <Environment preset="studio" />
          </ModelErrorBoundary>

          <OrbitControls 
            enablePan={false} 
            minDistance={4} 
            maxDistance={12} 
            autoRotate={!isExploded}
            autoRotateSpeed={2}
          />
          <VRHand />
        </Suspense>
      </Canvas>
      
      {/* Disassemble button removed */}

      <div className="absolute bottom-4 text-emerald-200/50 text-[10px] tracking-widest uppercase font-bold pointer-events-none w-full text-center">
         Drag mouse anywhere to rotate 360°
      </div>
    </div>
  );
};

export default Real3DBrain;
