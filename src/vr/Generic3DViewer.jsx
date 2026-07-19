import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import VRHand from './VRHand';

// Reusable Interactive Label Component
const InteractiveLabel = ({ position, title, description, colorClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-600 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all cursor-pointer overflow-hidden ${isOpen ? 'p-4 w-64' : 'px-4 py-2'}`}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex items-center gap-3">
          <span className={`${colorClass} text-xl drop-shadow-[0_0_8px_currentColor] animate-pulse`}>●</span>
          <span className="text-white text-sm font-extrabold tracking-wide whitespace-nowrap">{title}</span>
        </div>
        {isOpen && (
          <div className="mt-3 text-slate-300 text-xs font-medium leading-relaxed border-t border-slate-700 pt-3 text-left">
            {description}
          </div>
        )}
      </div>
    </Html>
  );
};

// 1. DNA Double Helix Model
const DnaModel = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.5;
    }
  });

  const numPairs = 30;
  const radius = 2.5;
  const height = 15;
  const pairs = [];

  for (let i = 0; i < numPairs; i++) {
    const y = (i / numPairs) * height - height / 2;
    const angle = i * 0.5;
    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;

    const isAT = i % 2 === 0;
    const colorLeft = isAT ? "#ef4444" : "#10b981";
    const colorRight = isAT ? "#3b82f6" : "#f59e0b";

    pairs.push(
      <group key={i}>
        <mesh position={[x1, y, z1]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial color={colorLeft} metalness={0.4} roughness={0.2} clearcoat={1.0} />
        </mesh>
        <mesh position={[x2, y, z2]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial color={colorRight} metalness={0.4} roughness={0.2} clearcoat={1.0} />
        </mesh>
        <mesh position={[0, y, 0]} rotation={[0, -angle, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, radius * 2, 16]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.8} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      {pairs}
      <InteractiveLabel 
        position={[radius + 1.5, height / 2 - 2, 0]} 
        title="Sugar-Phosphate Backbone" 
        description="The structural framework of nucleic acids, including DNA and RNA. It is composed of alternating sugar and phosphate groups, protecting the genetic code inside."
        colorClass="text-emerald-400"
      />
      <InteractiveLabel 
        position={[0, 0, radius + 1.5]} 
        title="Hydrogen Bond (Base Pair)" 
        description="Adenine always pairs with Thymine (A-T), and Cytosine pairs with Guanine (C-G). These chemical bonds hold the two DNA strands together like rungs on a ladder."
        colorClass="text-blue-400"
      />
      <InteractiveLabel 
        position={[-radius - 1.5, 3, 0]} 
        title="Adenine Base (Red)" 
        description="Adenine is one of the four nucleobases in the nucleic acid of DNA. It always pairs with Thymine (Blue) via two hydrogen bonds."
        colorClass="text-red-500"
      />
      <InteractiveLabel 
        position={[-radius - 1.5, -3, 0]} 
        title="Guanine Base (Yellow)" 
        description="Guanine is a nucleobase that always pairs with Cytosine (Green) via three hydrogen bonds, making this pair slightly stronger than A-T."
        colorClass="text-yellow-400"
      />
    </group>
  );
};

// 2. Bacteriophage Virus Model
const VirusModel = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(t * 2) * 0.5;
    }
  });

  const legs = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    legs.push(
      <group key={i} position={[0, -1.5, 0]} rotation={[0, angle, 0]}>
        <mesh position={[1, -1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
          <meshPhysicalMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} scale={[1.5, 1.5, 1.5]}>
      <mesh position={[0, 2, 0]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial color="#3b82f6" metalness={0.2} roughness={0.1} clearcoat={1.0} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshPhysicalMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 2.5, 16]} />
        <meshPhysicalMaterial color="#e2e8f0" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 6]} />
        <meshPhysicalMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>
      {legs}

      <InteractiveLabel 
        position={[2.5, 2, 0]} 
        title="Icosahedral Head (Capsid)" 
        description="The protein shell of the virus. It acts as a protective container that stores the viral DNA or RNA, keeping it safe until it infects a host cell."
        colorClass="text-blue-500"
      />
      <InteractiveLabel 
        position={[-2.5, -0.25, 0]} 
        title="Contractile Sheath" 
        description="Like a microscopic syringe, this sheath contracts during infection, driving a central tube through the bacteria's cell wall to inject the viral DNA."
        colorClass="text-slate-400"
      />
      <InteractiveLabel 
        position={[2.5, -2.5, 0]} 
        title="Tail Fibers" 
        description="These 'legs' are used by the bacteriophage to recognize and attach to specific receptors on the surface of a target bacterial cell."
        colorClass="text-indigo-400"
      />
    </group>
  );
};

// 3. Atomic Structure Model
const AtomicModel = () => {
  const groupRef = useRef();
  const electron1 = useRef();
  const electron2 = useRef();
  const electron3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = t * 0.1;
    }
    if (electron1.current) {
      electron1.current.position.x = Math.cos(t * 3) * 6;
      electron1.current.position.y = Math.sin(t * 3) * 6;
    }
    if (electron2.current) {
      electron2.current.position.y = Math.cos(t * 3 + 2) * 6;
      electron2.current.position.z = Math.sin(t * 3 + 2) * 6;
    }
    if (electron3.current) {
      electron3.current.position.x = Math.cos(t * 3 + 4) * 6;
      electron3.current.position.z = Math.sin(t * 3 + 4) * 6;
    }
  });

  return (
    <group ref={groupRef}>
      <group>
        <mesh position={[0.5, 0.5, 0]}><sphereGeometry args={[0.8, 32, 32]} /><meshPhysicalMaterial color="#ef4444" /></mesh>
        <mesh position={[-0.5, -0.5, 0.5]}><sphereGeometry args={[0.8, 32, 32]} /><meshPhysicalMaterial color="#ef4444" /></mesh>
        <mesh position={[0, 0.5, -0.5]}><sphereGeometry args={[0.8, 32, 32]} /><meshPhysicalMaterial color="#3b82f6" /></mesh>
        <mesh position={[0.5, -0.5, -0.5]}><sphereGeometry args={[0.8, 32, 32]} /><meshPhysicalMaterial color="#3b82f6" /></mesh>
      </group>
      
      <mesh rotation={[0, 0, 0]}><torusGeometry args={[6, 0.02, 16, 100]} /><meshBasicMaterial color="#4ade80" transparent opacity={0.5} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[6, 0.02, 16, 100]} /><meshBasicMaterial color="#4ade80" transparent opacity={0.5} /></mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[6, 0.02, 16, 100]} /><meshBasicMaterial color="#4ade80" transparent opacity={0.5} /></mesh>

      <mesh ref={electron1}><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color="#4ade80" /></mesh>
      <mesh ref={electron2}><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color="#4ade80" /></mesh>
      <mesh ref={electron3}><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color="#4ade80" /></mesh>

      <InteractiveLabel 
        position={[0, 2.5, 0]} 
        title="Nucleus (Protons & Neutrons)" 
        description="The dense center of the atom containing positively charged protons and neutral neutrons. It contains nearly all the mass of the atom."
        colorClass="text-red-500"
      />
      <InteractiveLabel 
        position={[7, 3, 0]} 
        title="Electron Orbit" 
        description="Negatively charged electrons travel around the nucleus at incredible speeds in specific energy levels or orbitals, bound by electromagnetic forces."
        colorClass="text-green-400"
      />
    </group>
  );
};

const Generic3DViewer = ({ activeModel = 'dna' }) => {
  const getHeaderInfo = () => {
    switch(activeModel) {
      case 'virus': return { 
        title: 'Microbiology: Bacteriophage', 
        sub: 'Virus Structure • Icosahedral Capsid',
        vrText: 'Viruses are too tiny to see with our eyes. VR makes them huge so you can spin them around, see their robot-like legs, and easily understand how they are built!'
      };
      case 'atom': return { 
        title: 'Physics: Atomic Structure', 
        sub: 'Quantum Mechanics • Electron Orbits',
        vrText: 'Atoms build everything in the world, but they are invisible! With VR, we can step inside an atom, watch electrons zoom around, and see science in action.'
      };
      default: return { 
        title: 'Genetics: 3D DNA Strand', 
        sub: 'Molecular Biology • Interactive Double Helix',
        vrText: 'DNA is a complex twisted ladder inside our bodies. By exploring it in 3D VR, you can rotate it and see exactly how the colorful puzzle pieces (bases) connect!'
      };
    }
  };

  const info = getHeaderInfo();

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl bg-[#020617] border border-blue-900/30">
      
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-2xl font-black text-blue-400 drop-shadow-md tracking-wider">
          {info.title}
        </h2>
        <p className="text-blue-200/70 text-sm font-bold mt-1">
          {info.sub}
        </p>
        <div className="mt-4 bg-blue-900/40 border border-blue-500/30 p-3 rounded-xl max-w-sm backdrop-blur-sm shadow-xl">
          <p className="text-blue-100 text-[13px] leading-relaxed font-medium">
            <span className="font-bold text-blue-300">Why in VR? </span> {info.vrText}
          </p>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <spotLight position={[20, 20, 20]} angle={0.2} penumbra={1} intensity={2} castShadow />
          <spotLight position={[-20, -20, -20]} angle={0.2} penumbra={1} intensity={1} color="#3b82f6" />
          
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
          <Environment preset="city" />

          {activeModel === 'dna' && <DnaModel />}
          {activeModel === 'virus' && <VirusModel />}
          {activeModel === 'atom' && <AtomicModel />}

          <VRHand />

          <OrbitControls 
            enablePan={true} 
            autoRotate={false} 
            minDistance={5} 
            maxDistance={40} 
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 text-blue-200/50 text-[10px] tracking-widest uppercase font-bold pointer-events-none w-full text-center">
         Drag to rotate 3D structure • Click labels to read details
      </div>
    </div>
  );
};

export default Generic3DViewer;
