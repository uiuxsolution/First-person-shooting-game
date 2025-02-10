import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { Vector3 } from 'three';
import { useGameStore } from '../store/gameStore';

interface EnemyProps {
  position: [number, number, number];
  id: string;
}

const ENEMY_SPEED = 2;
const ATTACK_RANGE = 2;
const ATTACK_DAMAGE = 10;
const ATTACK_COOLDOWN = 1;

export function Enemy({ position, id }: EnemyProps) {
  const rigidBodyRef = useRef(null);
  const [health, setHealth] = useState(100);
  const [lastAttack, setLastAttack] = useState(0);
  const { takeDamage, addScore } = useGameStore();

  useFrame((state) => {
    if (!rigidBodyRef.current || health <= 0) return;

    // Get direction to player
    const playerPosition = state.camera.position;
    const enemyPosition = rigidBodyRef.current.translation();
    const direction = new Vector3(
      playerPosition.x - enemyPosition.x,
      0,
      playerPosition.z - enemyPosition.z
    ).normalize();

    // Move towards player
    rigidBodyRef.current.setLinvel({
      x: direction.x * ENEMY_SPEED,
      y: rigidBodyRef.current.linvel().y,
      z: direction.z * ENEMY_SPEED,
    });

    // Check for attack
    const distance = new Vector3(
      enemyPosition.x,
      enemyPosition.y,
      enemyPosition.z
    ).distanceTo(playerPosition);

    if (distance < ATTACK_RANGE) {
      const now = state.clock.getElapsedTime();
      if (now - lastAttack >= ATTACK_COOLDOWN) {
        takeDamage(ATTACK_DAMAGE);
        setLastAttack(now);
      }
    }
  });

  const handleHit = (damage: number) => {
    setHealth((prev) => {
      const newHealth = prev - damage;
      if (newHealth <= 0) {
        addScore(100);
      }
      return newHealth;
    });
  };

  if (health <= 0) return null;

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      enabledRotations={[false, false, false]}
      colliders={false}
      type="dynamic"
    >
      <CapsuleCollider args={[1, 0.5]} />
      <group>
        <mesh castShadow userData={{ type: 'enemy', id }}>
          <capsuleGeometry args={[0.5, 1, 4, 8]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </RigidBody>
  );
}