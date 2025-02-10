import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Target, Trophy } from 'lucide-react';

export function GameUI() {
  const { health, ammo, score } = useGameStore();

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Crosshair */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>

      {/* HUD */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white">
          <Heart className="w-6 h-6" />
          <span className="text-2xl font-bold">{health}</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Target className="w-6 h-6" />
          <span className="text-2xl font-bold">{ammo}</span>
        </div>
      </div>

      {/* Score */}
      <div className="absolute top-8 right-8 flex items-center gap-2 text-white">
        <Trophy className="w-6 h-6" />
        <span className="text-2xl font-bold">{score}</span>
      </div>

      {/* Controls help */}
      <div className="absolute bottom-4 left-4 text-white text-sm">
        <p>WASD - Move</p>
        <p>Mouse - Look around</p>
        <p>Click - Shoot</p>
        <p>R - Reload</p>
      </div>
    </div>
  );
}