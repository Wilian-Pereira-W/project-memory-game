import { useEffect, useState } from 'react';
import './styles.css';

export interface Results {
  lessMoves: number;
  currentMoves: number;
}
function ScreenVictory() {
  const [moves, setMoves] = useState<Results | null>(null);
  useEffect(() => {
    const coresStorage: string | null = localStorage.getItem('record');
    if (coresStorage) {
      const movesLocalStorage = JSON.parse(coresStorage);
      setMoves(movesLocalStorage);
    }
  }, []);
  return (
    <div className="container">
      <h1>🚀 Parabéns 🚀</h1>
      <h3>{`Menor quantidade de movimentos: ${
        moves !== null && moves.lessMoves
      }`}</h3>
      <h3>{`Quantidade de movimentos atual: ${
        moves !== null && moves.currentMoves
      }`}</h3>
    </div>
  );
}

export default ScreenVictory;
