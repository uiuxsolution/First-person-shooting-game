import React from 'react';
import { Game } from './components/Game';

function App() {
  return (
    <div className="w-full h-screen">
      <Game />
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>
      <div className="fixed bottom-4 left-4 text-white text-sm">
        <p>WASD - Move</p>
        <p>Mouse - Look around</p>
        <p>Click to start</p>
      </div>
    </div>
  );
}

export default App;