import { useEffect, useState } from 'react';
import './App.css';

const TILE_LENGTH = 4;

function App() {
  
  const [solution, setSolution] = useState(0);
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  useEffect(() => {

  }, []);

  const generateSolution = () => {
    const random = Math.floor(Math.random() * 9000 + 1000);
    setSolution(random);
  };

  return (
    <div>
      <h1>BULLS && COWS</h1>
      <button
        onClick={()=>generateSolution()}
        >
        GAME START
      </button>
      <div className='board'>
        {
          guesses.map((guess) => {
            return (
              <Line guess={guess ?? ''}/>
            );
          })
        }
      </div>
    </div>
  );
}

function Line({guess}) {
  const tiles = [];
  for (let i=0; i<TILE_LENGTH; i++) {
    const num = guess[i]
    tiles.push(
      <div key={i} className="tile">
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
