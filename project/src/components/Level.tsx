import { RigidBody } from '@react-three/rapier';

const LEVEL_LAYOUT = [
  // Rooms
  { type: 'room', position: [0, 0, 0], size: [20, 5, 20] },
  { type: 'room', position: [25, 0, 0], size: [20, 5, 20] },
  { type: 'room', position: [0, 0, 25], size: [20, 5, 20] },
  
  // Corridors
  { type: 'corridor', position: [10, 0, 0], size: [5, 5, 5] },
  { type: 'corridor', position: [0, 0, 10], size: [5, 5, 5] },
  
  // Obstacles
  { type: 'obstacle', position: [5, 2.5, 5], size: [2, 5, 2] },
  { type: 'obstacle', position: [-5, 2.5, -5], size: [2, 5, 2] },
  { type: 'obstacle', position: [15, 2.5, 15], size: [2, 5, 2] },
];

export function Level() {
  return (
    <group>
      {LEVEL_LAYOUT.map((item, index) => (
        <RigidBody key={index} type="fixed" position={item.position}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={item.size} />
            <meshStandardMaterial
              color={
                item.type === 'room'
                  ? '#404040'
                  : item.type === 'corridor'
                  ? '#505050'
                  : '#606060'
              }
            />
          </mesh>
        </RigidBody>
      ))}
    </group>
  );
}