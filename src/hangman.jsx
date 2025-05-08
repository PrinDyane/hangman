import { useState } from "react";
import win from './assets/win.png';
import hangman0 from './assets/hangman0.png';
import hangman1 from './assets/hangman1.png';
import hangman2 from './assets/hangman2.png';
import hangman3 from './assets/hangman3.png';
import hangman4 from './assets/hangman4.png';
import hangman5 from './assets/hangman5.png';



function App() {
  const word = "CAPIBARA";
  const [InputGuess, setInputGuess] = useState("");
  const [result, setResult] = useState("");
  const [correctLetter, setCorrectLetter] = useState ([]);
  const [wrogLetter, setWrogLetter] = useState ([]);
  const [guessAttempts, setGuessAttempts] = useState ((5));

  const HandleGuess = () => {
    const guess = InputGuess.toUpperCase(); 

    if (guess.trim() === "") {
      setResult ("Please enter a letter 😬");
      return;
    }

    if (!/^[a-zA-Z]$/.test (guess)) {
      setResult ("Allowed only letters from A-Z 🫨");
      return;
    }
    
    if (correctLetter.includes(guess) || wrogLetter.includes(guess)) {
        setResult(`You already guessed "${guess}" 🤔`);
        return;
    }

    if (word.includes(guess)) {
            setCorrectLetter([...correctLetter, guess]);
            setResult(`This letter "${guess}" is in the word 😊`);
    } else {
            setWrogLetter([...wrogLetter, guess]);
            setGuessAttempts (guessAttempts - 1);
            setResult(`This letter "${guess}" is not in the word 😢`)
        }
    setInputGuess("");
  };

  const hasWon = word.split("").every(letter => correctLetter.includes(letter));
  const hasLost = guessAttempts <= 0;
  const hangmanImages = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5];

  return (
    <>
    <h1>Hangman</h1>
    {hasWon ? (
        <img src={win} alt="You won!" width="200" />
    ) : (
      <img src={hangmanImages [5 - guessAttempts]} alt="Hangman" width="200" />
    )}

    <p> 
        {word.split('').map((letter, index) =>
        correctLetter.includes(letter) ? (
            <span key={index}>{letter}</span>
        ):(
            <span key={index}>_ </span>
        )
    )}
    </p>
    <p>
    </p>
  
    <input type="text" maxLength="1" value={InputGuess} onChange={(e) => setInputGuess(e.target.value)}/>
    <button onClick={HandleGuess}>Guess</button>
    <p>{result}</p>
    <p>Wrong guess:{wrogLetter.join("- ")}</p>
    <p>Attempts left: {guessAttempts}</p>
    {hasWon && <p>🎉 You won! Congratulations!</p>}
    {hasLost && <p>💀 You lose! The word was: {word}</p>}
    
    </> 
  )
}

export default App
