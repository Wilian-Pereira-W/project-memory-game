import { useEffect, useRef, useState } from 'react';
import { duplicateRegenerateSortArray } from '../../utils/card-utils';
import Card, { CardProps } from '../Card';
import ScreenVictory, { Results } from '../ScreenVictory';
import './styles.css';

export interface GrindProps {
  cards: CardProps[];
}
function Grid({ cards }: GrindProps) {
  const [stateCards, setStateCards] = useState(() => {
    return duplicateRegenerateSortArray(cards);
  });

  const first = useRef<CardProps | null>(null);
  const second = useRef<CardProps | null>(null);
  const unflip = useRef(false);
  const [match, setMatch] = useState(0);
  const [moves, setMoves] = useState(0);
  const handleReset = () => {
    setStateCards(duplicateRegenerateSortArray(cards));
    first.current = null;
    second.current = null;
    unflip.current = false;
    setMatch(0);
    setMoves(0);
    setValidateVictory(true);
  };
  const [validateVictory, setValidateVictory] = useState(true);

  const recordeMoves = (currentMoves: number, movesLocalStorage: number) => {
    let data = {
      lessMoves: 0,
      currentMoves: 0,
    };
    if (currentMoves < movesLocalStorage) {
      data = {
        lessMoves: currentMoves,
        currentMoves: currentMoves,
      };
      localStorage.setItem('record', JSON.stringify(data));
    } else {
      data = {
        lessMoves: movesLocalStorage,
        currentMoves: currentMoves,
      };
      localStorage.setItem('record', JSON.stringify(data));
    }
  };
  useEffect(() => {
    if (match === cards.length) {
      setValidateVictory(false);
      const movesStorage: string | null = localStorage.getItem('record');
      let data = {
        lessMoves: 0,
        currentMoves: 0,
      };
      if (movesStorage) {
        const movesLocalStorage: Results = JSON.parse(movesStorage);
        recordeMoves(moves, movesLocalStorage.lessMoves);
      } else {
        data = {
          lessMoves: moves,
          currentMoves: moves,
        };
        localStorage.setItem('record', JSON.stringify(data));
      }
    }
  }, [cards.length, match, moves]);
  const handleClick = (id: string) => {
    const newStateCArds = stateCards.map((card) => {
      if (card.id !== id) return card;

      if (card.flipped) return card;

      if (unflip.current && first.current && second.current) {
        first.current.flipped = false;
        second.current.flipped = false;
        first.current = null;
        second.current = null;
        unflip.current = false;
      }

      card.flipped = true;

      if (first.current === null) {
        first.current = card;
      } else if (second.current === null) {
        second.current = card;
      }

      if (first.current && second.current) {
        if (first.current.name === second.current.name) {
          first.current = null;
          second.current = null;
          setMatch((state) => state + 1);
        } else {
          unflip.current = true;
        }

        setMoves((state) => state + 1);
      }

      return card;
    });
    setStateCards(newStateCArds);
  };
  return (
    <>
      <div className="header">
        <h1>Jogo da Memória</h1>
        <div className="placar">
          <p>Moves: {moves}</p>
          <p>Matches: {match}</p>
          <button type="button" onClick={() => handleReset()}>
            {validateVictory ? 'Reset' : 'Jogar Novamente'}
          </button>
        </div>
      </div>
      {validateVictory ? (
        <div className="grid">
          {stateCards.map((card) => (
            <Card {...card} key={card.id} handleClick={handleClick} />
          ))}
        </div>
      ) : (
        <ScreenVictory />
      )}
    </>
  );
}

export default Grid;
