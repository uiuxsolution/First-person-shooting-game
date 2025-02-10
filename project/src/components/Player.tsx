import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { Vector3 } from 'three';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useGameStore } from '../store/gameStore';

const MOVE_SPEED = 5;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();

export function Player() {
  const ref = useRef(null);
  const { forward, backward, left, right } = useKeyboardControls();
  const { health } = useGameStore();

  useFrame((state) => {
    if (!ref.current || health <= 0) return;

    // Movement
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED);

    // Apply movement
    ref.current.setLinvel({
      x: direction.x,
      y: ref.current.linvel().y,
      z: direction.z,
    });

    // Update camera
    state.camera.position.set(
      ref.current.translation().x,
      ref.current.translation().y + 1.5,
      ref.current.translation().z
    );
  });

  // Reset game state when health reaches 0
  useEffect(() => {
    if (health <= 0) {
      // Handle player death
      console.log('Game Over');
    }
  }, [health]);

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 2, 0]}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[0.75, 0.5]} />
    </RigidBody>
  );
}