import { create } from 'zustand';

interface GameState {
  health: number;
  ammo: number;
  score: number;
  setHealth: (health: number) => void;
  setAmmo: (ammo: number) => void;
  setScore: (score: number) => void;
  addScore: (points: number) => void;
  takeDamage: (damage: number) => void;
  useAmmo: (amount: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  health: 100,
  ammo: 30,
  score: 0,
  setHealth: (health) => set({ health }),
  setAmmo: (ammo) => set({ ammo }),
  setScore: (score) => set({ score }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  takeDamage: (damage) =>
    set((state) => ({ health: Math.max(0, state.health - damage) })),
  useAmmo: (amount) =>
    set((state) => ({ ammo: Math.max(0, state.ammo - amount) })),
}));