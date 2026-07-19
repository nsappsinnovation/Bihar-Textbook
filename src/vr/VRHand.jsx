import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const VRHand = () => {
  const rightHandGroup = useRef();
  const leftHandGroup = useRef();
  const { pointer, camera } = useThree();

  const gloveMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#f8fafc",
    roughness: 0.6,
    metalness: 0.1,
    clearcoat: 0.2,
  }), []);

  const blueGlowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#3b82f6",
    transparent: true,
    opacity: 0.8,
  }), []);

  useFrame((state) => {
    if (rightHandGroup.current && leftHandGroup.current) {
      
      // Hover animation + Mouse Drag Up/Down
      const hoverY = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      const dragY = pointer.y * 1.5; // Moves hands up and down when dragging

      // 1. Right Hand (Fixed on right side, wider to clear VR lenses)
      const rOffset = new THREE.Vector3(5.0, -1.2 + hoverY + dragY, -4);
      rOffset.applyQuaternion(camera.quaternion);
      const rPos = camera.position.clone().add(rOffset);
      rightHandGroup.current.position.lerp(rPos, 0.2);

      // Point exactly at the center (Earth/Model)
      const center = new THREE.Vector3(0, 0, 0);
      rightHandGroup.current.lookAt(center);

      // 2. Left Hand (Fixed on left side, wider)
      const lOffset = new THREE.Vector3(-4.0, -1.2 - hoverY + dragY, -4);
      lOffset.applyQuaternion(camera.quaternion);
      const lPos = camera.position.clone().add(lOffset);
      leftHandGroup.current.position.lerp(lPos, 0.1);

      // Point exactly at the center
      leftHandGroup.current.lookAt(center);
    }
  });

  return (
    <group scale={[0.65, 0.65, 0.65]}>
      {/* RIGHT HAND (Pointing with Laser) */}
      <group ref={rightHandGroup}>
        {/* Hand orientation fix so Z is forward for lookAt */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          
          {/* Palm */}
          <mesh scale={[1, 1.2, 0.4]} position={[0, -0.2, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* Wrist */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.4, 0.45, 0.6, 32]} />
            <primitive object={gloveMaterial} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <torusGeometry args={[0.4, 0.05, 16, 32]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>

          {/* Index Finger (Pointing straight out) */}
          <group position={[0.25, 0.4, 0]}>
            <mesh position={[0, 0.4, 0]}>
              <capsuleGeometry args={[0.1, 0.6, 16, 16]} />
              <primitive object={gloveMaterial} />
            </mesh>
            {/* Glowing Blue Dot on Fingertip */}
            <mesh position={[0, 0.8, 0.05]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <primitive object={blueGlowMaterial} />
              <pointLight color="#3b82f6" intensity={3} distance={5} />
            </mesh>
            {/* Blue Laser Ray pointing at the model */}
            <mesh position={[0, 2.8, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 4, 8]} />
              <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
            </mesh>
          </group>

          {/* Middle Finger (Folded) */}
          <mesh position={[0.05, 0.35, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.11, 0.5, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* Ring Finger (Folded) */}
          <mesh position={[-0.15, 0.3, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.45, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* Pinky Finger (Folded) */}
          <mesh position={[0.35, 0.2, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.09, 0.35, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* Thumb (Curved in - Right hand thumb is on the LEFT side) */}
          <mesh position={[-0.5, 0, 0.2]} rotation={[0, Math.PI / 4, -Math.PI / 4]}>
            <capsuleGeometry args={[0.12, 0.4, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>
        </group>
      </group>

      {/* LEFT HAND (Open, supporting) */}
      <group ref={leftHandGroup}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          
          {/* Palm */}
          <mesh scale={[1, 1.2, 0.4]} position={[0, -0.2, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* Wrist */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.4, 0.45, 0.6, 32]} />
            <primitive object={gloveMaterial} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <torusGeometry args={[0.4, 0.05, 16, 32]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>

          {/* Fingers (Slightly curved) */}
          <mesh position={[-0.25, 0.4, 0.1]} rotation={[-Math.PI / 8, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.5, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>
          <mesh position={[-0.05, 0.45, 0.1]} rotation={[-Math.PI / 8, 0, 0]}>
            <capsuleGeometry args={[0.11, 0.6, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>
          <mesh position={[0.15, 0.4, 0.1]} rotation={[-Math.PI / 8, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.5, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>
          <mesh position={[0.35, 0.3, 0.1]} rotation={[-Math.PI / 8, 0, 0]}>
            <capsuleGeometry args={[0.09, 0.4, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* Thumb (Extended - Left hand thumb is on the RIGHT side) */}
          <mesh position={[0.5, 0, 0.1]} rotation={[0, -Math.PI / 4, Math.PI / 4]}>
            <capsuleGeometry args={[0.12, 0.4, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

        </group>
      </group>
    </group>
  );
};

export default VRHand;
