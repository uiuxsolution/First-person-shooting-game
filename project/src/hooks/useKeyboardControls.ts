import { useState, useEffect } from 'react';

const keys = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'jump',
} as const;

type KeyState = {
  [K in (typeof keys)[keyof typeof keys]]: boolean;
};

export function useKeyboardControls() {
  const [movement, setMovement] = useState<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = keys[e.code as keyof typeof keys];
      if (key) {
        setMovement((state) => ({ ...state, [key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = keys[e.code as keyof typeof keys];
      if (key) {
        setMovement((state) => ({ ...state, [key]: false }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
}