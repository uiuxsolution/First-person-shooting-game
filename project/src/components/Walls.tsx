import { RigidBody } from '@react-three/rapier';

export function Walls() {
  return (
    <group>
      {/* Outer walls */}
      {[
        [-25, 2.5, 0, 0.5, 5, 50], // Left
        [25, 2.5, 0, 0.5, 5, 50], // Right
        [0, 2.5, -25, 50, 5, 0.5], // Front
        [0, 2.5, 25, 50, 5, 0.5], // Back
      ].map(([x, y, z, w, h, d], i) => (
        <RigidBody key={i} type="fixed" position={[x, y, z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color="#404040" />
          </mesh>
        </RigidBody>
      ))}
      
      {/* Some obstacles */}
      {[
        [-5, 2.5, -5],
        [5, 2.5, 5],
        [0, 2.5, 0],
      ].map(([x, y, z], i) => (
        <RigidBody key={i + 4} type="fixed" position={[x, y, z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 5, 2]} />
            <meshStandardMaterial color="#505050" />
          </mesh>
        </RigidBody>
      ))}
    </group>
  );
}