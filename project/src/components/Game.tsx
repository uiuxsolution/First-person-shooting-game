import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Sky, PointerLockControls } from '@react-three/drei';
import { Player } from './Player';
import { Level } from './Level';
import { Enemy } from './Enemy';
import { Weapon } from './Weapon';
import { GameUI } from './GameUI';

const ENEMY_POSITIONS = [
  [5, 2, 5],
  [-5, 2, -5],
  [15, 2, 15],
  [-15, 2, -15],
] as const;

export function Game() {
  return (
    <>
      <Canvas shadows camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
        </directionalLight>
        <Physics>
          <Player />
          <Weapon />
          <Level />
          {ENEMY_POSITIONS.map((position, index) => (
            <Enemy
              key={index}
              position={position}
              id={`enemy-${index}`}
            />
          ))}
        </Physics>
        <PointerLockControls />
      </Canvas>
      <GameUI />
    </>
  );
}