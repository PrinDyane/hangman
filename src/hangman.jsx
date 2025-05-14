import React, { useEffect } from "react";
import { useState } from "react";
import win from './assets/win.png';
import hangman0 from './assets/hangman0.png';
import hangman1 from './assets/hangman1.png';
import hangman2 from './assets/hangman2.png';
import hangman3 from './assets/hangman3.png';
import hangman4 from './assets/hangman4.png';
import hangman5 from './assets/hangman5.png';



function Hangman ({ word, onPlayAgain, onReturnHome }) {
  const [InputGuess, setInputGuess] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("");
  const [correctLetter, setCorrectLetter] = useState ([]);
  const [wrongLetter, setWrongLetter] = useState ([]);
  const [guessAttempts, setGuessAttempts] = useState ((5));
  const [category, setCategory] = useState(word.category);

  useEffect (() => {
    setInputGuess("");
    setResult("");
    setCorrectLetter([]);
    setWrongLetter([]);
    setGuessAttempts(5);
    setCategory(category);
  },[word.word]);
  

  const HandleGuess = () => {
    const guess = InputGuess.toUpperCase(); 

    if (guess.trim() === "") {
      setResult ("Please enter a letter 😬");
      setResultType("EnterLetter");
      return;
    }

    if (!/^[a-zA-Z]$/.test (guess)) {
      setResult ("Allowed only letters from A-Z 🫨");
      setResultType("OnlyLetter");
      return;
    }
    
    if (correctLetter.includes(guess) || wrongLetter.includes(guess)) {
        setResult(`You already guessed "${guess}" 🤔`);
        setResultType("gessed");
        return;
    }

    if (word.word.includes(guess)) {
            setCorrectLetter([...correctLetter, guess]);
            setResult(`This letter "${guess}" is in the word 😊`);
            setResultType("inWord")
    } else {
            setWrongLetter([...wrongLetter, guess]);
            setGuessAttempts (guessAttempts - 1);
            setResult(`This letter "${guess}" is not in the word 😢`)
            setResultType("notInWord")
        }
    setInputGuess("");
  };

  const hasWon = word.word.split("").every(letter => correctLetter.includes(letter));
  const hasLost = guessAttempts <= 0;
  const hangmanImages = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5];

   
  return (
    <div className="min-h-screen justify-center items-center flex flex-col text-center">
    <h1 className="text-4xl text-[#8C62A4] font-bold mb-10">Hangman</h1>
    {hasWon ? (
        <img src={win} alt="You won!" className="w-32 h-32"/>
    ) : (
      <img src={hangmanImages [5 - guessAttempts]} alt="Hangman" className="w-32 h-32" />
    )}
    <p className="text-lg mt-4 font-semibold"> Category: <span className="capitalize">{word.category}</span></p>
    <p className="text-xl"> 
        {word.word.split('').map((letter, index) =>
        correctLetter.includes(letter) ? (
            <span key={index} className="mx-1">{letter}</span>
        ):(
            <span key={index} className="font-bold mx-1">_ </span>
        )
    )}
    </p>

    <input type="text" maxLength="1" value={InputGuess} onChange={(e) => setInputGuess(e.target.value)}       className="mt-4 border-[#8C62A4] border rounded p-2 w-10 bg-white text-black focus:outline-none 
      focus:ring-2 focus:ring-[#8C62A4]"/>
    <button onClick={HandleGuess} className='mb-4 mt-4 cursor-pointer hover:bg-[#8C62A4] bg-[#D0B0DF]
     text-white font-bold py-2 px-4 rounded'>
      Guess
    </button>
    {result && (
       <p className={`m-4 font-bold fixed top-80 right-10
        ${resultType === "EnterLetter" ? "text-red-400" : "" }
        ${resultType === "OnlyLetter" ? "text-red-400" : "" }
        ${resultType === "gessed" ? "text-red-400" : "" }
        ${resultType === "inWord" ? "text-red-400" : "" }
        ${resultType === "notInWord" ? "text-red-400" : "" }
       `}
      >{result}</p>
    )}
   
    <p className="fixed top-80 left-5">Wrong guess: 
      <span className="font-bold text-red-600">{wrongLetter.join("- ")}</span>
    </p> 
    <p className="fixed top-85 left-5">Attempts left: <span className="font-bold text-red-600">{guessAttempts}</span></p>

    {hasWon && <p className="font-bold">🎉 You won! <p>Congratulations!</p></p>}
    {hasLost && <p className="font-bold">🩻 You lose! The word was: {word.word}</p>}

    {(hasWon || hasLost) && (
      <button onClick={onPlayAgain} className=" mt-4 cursor-pointer hover:bg-[#8c62a4] bg-[#D0B0DF]
          text-white font-bold py-2 px-4 rounded">
          Play Again
      </button>
    )}
        <button onClick={onReturnHome} className="fixed top-4 left-4 cursor-pointer hover:bg-[#8c62a4] bg-[#D0B0DF] rounded py-3 px-5">
                🏠
        </button>
    </div> 
  )
}

export default Hangman;
