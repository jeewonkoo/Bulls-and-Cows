import { useEffect, useState } from 'react';
import './App.css';

const TILE_LENGTH = 4;

function App() {
  
  const [solution, setSolution] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameover, setGameOver] = useState(false);
  const [out, setOut] = useState(true);
  const [strike, setStrike] = useState(0);
  const [ball, setBall] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [result, setResult] = useState([""]);
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
  }, [ball, strike]);


  const generateSolution = () => {
    const random = Math.floor(Math.random() * 9000 + 1000);
    setSolution(random);
  };

  const handleGuess = () => {
    var solutionArray = String(solution).split("").map((num)=>{
      return Number(num)
    })
    var guessArray = String(currentGuess).split("").map((num)=>{
      return Number(num)
    })
    var strikeCount = 0;
    var ballCount = 0;
    for (var i=0; i<4; i++) {
      if (solutionArray[i] === guessArray[i]) {
        strikeCount++;
      } else if (solutionArray.includes(guessArray[i])) {
        ballCount++;
      }
    }
    setBall(ballCount);
    setStrike(strikeCount);
    console.log(ball, strike);
    if (ball === 0 && strike === 0) setOut(true);
  }

  const displayGuesses = () => {
    // NEED TO FIX
    // guesses.push(currentGuess);
    return (
      <div>
        {guesses}
      </div>
    )
  }

  const displayResults = () => {
    return (
      <div>
        <div>BALL {ball} {"\n"}</div>
        <div>STRIKE {strike} {"\n"}</div>
      </div>
    )
  }

  return (
    <div>
      <h1>&&</h1>
      <button
        onClick={()=>generateSolution()}
        >
        GAME START
      </button>
      <div>
        {solution}
      </div>
      <div>
        <input
          type={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
      </div>
      <button
        onClick={() => handleGuess()}
        >
        SUBMIT
      </button>
      <div>
        {currentGuess}
      </div>
      <div>
        {displayGuesses()}
        {displayResults()}
      </div>
    </div>
  );
}



export default App;
