import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const VRHand = () => {
  const rightHandGroup = useRef();
  const leftHandGroup = useRef();
  const { pointer, camera } = useThree();

  const gloveMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.3,
    metalness: 0.1,
    clearcoat: 0.3,
  }), []);

  const whiteGlowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.9,
  }), []);

  const blueGlowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#3b82f6",
    transparent: true,
    opacity: 0.9,
  }), []);

  useFrame((state) => {
    if (rightHandGroup.current && leftHandGroup.current) {
      // Hover animation + Mouse Drag Up/Down
      const hoverY = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      const dragY = pointer.y * 1.5;

      // 1. Right Hand (Swapped: now on LEFT side of screen)
      const rOffset = new THREE.Vector3(-5.0, -1.2 + hoverY + dragY, -4);
      rOffset.applyQuaternion(camera.quaternion);
      const rPos = camera.position.clone().add(rOffset);
      rightHandGroup.current.position.lerp(rPos, 0.2);

      const center = new THREE.Vector3(0, 0, 0);
      rightHandGroup.current.lookAt(center);

      // 2. Left Hand (Swapped: now on RIGHT side of screen)
      const lOffset = new THREE.Vector3(5.0, -1.2 - hoverY + dragY, -4);
      lOffset.applyQuaternion(camera.quaternion);
      const lPos = camera.position.clone().add(lOffset);
      leftHandGroup.current.position.lerp(lPos, 0.2);

      leftHandGroup.current.lookAt(center);
    }
  });

  return (
    <group scale={[0.65, 0.65, 0.65]}>
      {/* ==================== RIGHT HAND ==================== */}
      {/* Finger Order (Left to Right): Thumb (-0.45) -> Index (-0.22) -> Middle (-0.03) -> Ring (0.16) -> Little (0.34) */}
      <group ref={rightHandGroup}>
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
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* 1. THUMB (Extended forward, extra gap from index, slightly down) */}
          <mesh position={[-0.55, 0.15, -0.05]} rotation={[-Math.PI / 6, Math.PI / 6, -Math.PI / 6]}>
            <capsuleGeometry args={[0.12, 0.5, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* 2. INDEX FINGER (Pointing straight out: -0.22, no laser ray) */}
          <group position={[-0.22, 0.4, 0]}>
            <mesh position={[0, 0.4, 0]}>
              <capsuleGeometry args={[0.1, 0.6, 16, 16]} />
              <primitive object={gloveMaterial} />
            </mesh>
          </group>

          {/* 3. MIDDLE FINGER (-0.03) */}
          <mesh position={[-0.03, 0.35, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.11, 0.5, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* 4. RING FINGER (+0.16) */}
          <mesh position={[0.16, 0.3, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.45, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* 5. LITTLE / PINKY FINGER (Rightmost, outer side: +0.34) */}
          <mesh position={[0.34, 0.2, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.09, 0.35, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>
        </group>
      </group>

      {/* ==================== LEFT HAND ==================== */}
      {/* Finger Order (Right to Left): Thumb (+0.45) -> Index (+0.22) -> Middle (+0.03) -> Ring (-0.16) -> Little (-0.34) */}
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
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* 1. THUMB (Extended forward, extra gap from index, slightly down) */}
          <mesh position={[0.55, 0.15, -0.05]} rotation={[-Math.PI / 6, -Math.PI / 6, Math.PI / 6]}>
            <capsuleGeometry args={[0.12, 0.5, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* 2. INDEX FINGER (Pointing straight out: +0.22 with BLUE Laser Ray) */}
          <group position={[0.22, 0.4, 0]}>
            <mesh position={[0, 0.4, 0]}>
              <capsuleGeometry args={[0.1, 0.6, 16, 16]} />
              <primitive object={gloveMaterial} />
            </mesh>
            {/* Glowing Blue Dot on Fingertip */}
            <mesh position={[0, 0.8, 0.05]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <primitive object={blueGlowMaterial} />
              <pointLight color="#3b82f6" intensity={4} distance={6} />
            </mesh>
            {/* Blue Laser Ray pointing at the model */}
            <mesh position={[0, 2.8, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 4, 8]} />
              <meshBasicMaterial color="#3b82f6" transparent opacity={0.75} />
            </mesh>
          </group>

          {/* 3. MIDDLE FINGER (+0.03) */}
          <mesh position={[0.03, 0.35, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.11, 0.5, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* 4. RING FINGER (-0.16) */}
          <mesh position={[-0.16, 0.3, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.45, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>

          {/* 5. LITTLE / PINKY FINGER (Leftmost, outer side: -0.34) */}
          <mesh position={[-0.34, 0.2, 0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
            <capsuleGeometry args={[0.09, 0.35, 16, 16]} />
            <primitive object={gloveMaterial} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default VRHand;
