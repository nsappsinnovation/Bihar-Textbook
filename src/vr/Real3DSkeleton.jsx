import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import VRHand from './VRHand';

const AnatomicalSkeleton = () => {
  const { scene } = useGLTF('/3d_models/human-skeleton/source/human_skeleton_high_detailed.glb');
  const groupRef = useRef();

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={20.0} 
        position={[0, -3, 0]} 
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
              Skeleton model load nahi ho paya.
            </p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

const Real3DSkeleton = () => {
  return (
    <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl bg-slate-900 border border-cyan-900/30">
      
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-2xl font-black text-blue-400 drop-shadow-md tracking-wider">
          Human Anatomy: 3D Skeleton
        </h2>
        <p className="text-blue-200/70 text-sm font-bold mt-1">
          Interactive Medical Model • 360° View
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-cyan-400 font-bold tracking-widest text-sm uppercase">Loading Skeleton...</div>
            </div>
          </Html>
        }>
          <ModelErrorBoundary>
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ccffff" />
            
            <AnatomicalSkeleton />
            {/* ojjj */}
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
            autoRotate={true}
            autoRotateSpeed={2}
          />
          <VRHand />
        </Suspense>
      </Canvas>

      {/* Disassemble button removed */}
      
      <div className="absolute bottom-4 text-cyan-200/50 text-[10px] tracking-widest uppercase font-bold pointer-events-none w-full text-center">
         Drag mouse anywhere to rotate 360°
      </div>
    </div>
  );
};

export default Real3DSkeleton;
