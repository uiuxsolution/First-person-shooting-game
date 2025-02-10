import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import { Vector3, Raycaster } from 'three';

const FIRE_RATE = 0.1; // seconds between shots
const DAMAGE = 20;
const RANGE = 100;

export function Weapon() {
  const ref = useRef<THREE.Mesh>(null);
  const [lastShot, setLastShot] = useState(0);
  const { ammo, useAmmo } = useGameStore();
  const raycaster = new Raycaster();

  useFrame((state) => {
    if (!ref.current) return;

    // Position weapon in front of camera
    const cameraPosition = state.camera.position;
    const cameraDirection = new Vector3(0, 0, -1);
    cameraDirection.applyQuaternion(state.camera.quaternion);

    ref.current.position.copy(cameraPosition);
    ref.current.quaternion.copy(state.camera.quaternion);

    // Handle shooting
    if (state.mouse.buttons === 1 && ammo > 0) {
      const now = state.clock.getElapsedTime();
      if (now - lastShot >= FIRE_RATE) {
        shoot(cameraPosition, cameraDirection, state.scene);
        setLastShot(now);
      }
    }
  });

  const shoot = (position: Vector3, direction: Vector3, scene: THREE.Scene) => {
    useAmmo(1);
    raycaster.set(position, direction);
    
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    for (const hit of intersects) {
      const userData = hit.object.userData;
      if (userData.type === 'enemy' && hit.distance <= RANGE) {
        // Find the enemy component and call handleHit
        const enemyMesh = hit.object.parent?.parent;
        if (enemyMesh && typeof enemyMesh.handleHit === 'function') {
          enemyMesh.handleHit(DAMAGE);
        }
        break;
      }
    }
  };

  return (
    <mesh ref={ref} scale={[0.3, 0.3, 1]} position={[0.3, -0.3, -0.5]}>
      <boxGeometry />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}