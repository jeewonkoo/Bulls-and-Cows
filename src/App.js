import { useEffect, useState } from 'react';
import './App.css';

const TILE_LENGTH = 4;

function App() {
  
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameover, setGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event) => {
      if (gameover) return;
      if (event.key === 'Enter') {
        if (currentGuess.length !== 4) return;

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex(val => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');

        const isCorrect = solution === currentGuess;
        if (isCorrect) setGameOver(true);
      } else if (event.key === 'Backspace') { 
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 4) return;

      setCurrentGuess(oldGuess => oldGuess + event.key);
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener('keydown', handleType);
  }, [currentGuess, gameover]);

  const generateSolution = () => {
    const random = Math.floor(Math.random() * 9000 + 1000);
    setSolution(random);
    console.log(solution);
  };

  

  return (
    <div>
      <h1>BULLS && COWS</h1>
      {solution}
      <button
        onClick={()=>generateSolution()}
        >
        GAME START
      </button>
      <div className='board'>
        {
          guesses.map((guess, idx) => {
            const isCurrentGuess = idx === guesses.findIndex(val => val == null)
            return (
              <Line 
              guess={isCurrentGuess ? currentGuess : guess ?? ''}
              isFinal={!isCurrentGuess && guess != null}
              solution={solution}
              />
            );
          })
        }
      </div>
    </div>
  );
}

function Line({guess, isFinal, solution}) {
  const tiles = [];
  for (let i=0; i<TILE_LENGTH; i++) {
    let className = "tile";
    const num = guess[i];
    if (isFinal) {
      if (num === solution[i]) {
        className += " correct";
      } else if (solution.includes(num)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }

    tiles.push(
      <div key={i} className={className}>
        {num}
      </div>
    );
  }
  return (
    <div className='line'>
      {tiles}
    </div>
  )
}


export default App;
