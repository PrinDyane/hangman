import React, { useEffect } from "react";
import { useState } from "react";
import win from './assets/win.png';
import hangman0 from './assets/hangman0.png';
import hangman1 from './assets/hangman1.png';
import hangman2 from './assets/hangman2.png';
import hangman3 from './assets/hangman3.png';
import hangman4 from './assets/hangman4.png';
import hangman5 from './assets/hangman5.png';
import { motion } from "framer-motion";
import ResultScreen from "./ResultScreen";


function Won ({win}) {
  return (
    <motion.img
    src={win} alt="You won!"  className="w-40 h-40 sm:w-48 md:w-56 lg:w-64 xl:w-72"
    initial={{opacity: 0, scale:0.5, rotate: -10}}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 }}
    />
  );
}
 
function Hangman ({ word, onPlayAgain, onReturnHome }) {
  const [InputGuess, setInputGuess] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("");
  const [correctLetter, setCorrectLetter] = useState ([]);
  const [wrongLetter, setWrongLetter] = useState ([]);
  const [guessAttempts, setGuessAttempts] = useState ((5));
  const [category, setCategory] = useState(word.category);
  const [shaking, setSheking] = useState(false);

  useEffect (() => {
    if (guessAttempts < 5) {
      setSheking (true);
      const timeout = setTimeout(() => setSheking(false), 400);
      return () => clearTimeout(timeout)
    }
  }, [guessAttempts])

  const shake = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4, ease: "easeInOut" },
  }

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
  
  if (hasWon || hasLost) {
    return (
      <ResultScreen
        hasWon= {hasWon}
        word={word.word}
        onPlayAgain={onPlayAgain}
        onReturnHome={onReturnHome}
      />
    )
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-4 py-6">
        <div className="flex-shrink-0">
            <h1 className="text-4xl text-[#8C62A4] font-bold mb-10">Hangman</h1>

      {hasWon  ? (
        <Won win={win}/>
      ) : (
        <motion.img src={hangmanImages[5 - guessAttempts]}
        alt="hangman"
        className="w-40 h-40 sm:w-48 md:w-56 lg:w-64 xl:w-72"
        animate={shaking ? shake : {x: 0}} 
        />
      )}
          
      <p className="text-lg mt-4 font-semibold"> Category: 
        <span className="capitalize">{word.category}</span>
      </p>

      <p className="text-xl"> 
          {word.word.split('').map((letter, index) =>
          correctLetter.includes(letter) ? (
              <span key={index} className="mx-1">{letter}</span>
          ):(
              <span key={index} className="font-bold mx-1">_ </span>
          )
      )}
      </p>

      <input type="text" maxLength="1" 
        value={InputGuess} 
        onChange={(e) => setInputGuess(e.target.value)}    
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            HandleGuess();
          }
        }}
          className="mt-4 border-[#8C62A4] border rounded p-2 w-10 bg-white text-black focus:outline-none 
          focus:ring-2 focus:ring-[#8C62A4]"/>

      <button 
        onClick={HandleGuess} 
        className='mb-4 mt-4 cursor-pointer hover:bg-[#8C62A4] bg-[#D0B0DF]
      text-white font-bold py-2 px-4 rounded'>
        Guess
      </button>

      {result && (
        <p className={`m-4 font-bold 
          ${resultType === "EnterLetter" ? "text-red-400" : "" }
          ${resultType === "OnlyLetter" ? "text-red-400" : "" }
          ${resultType === "gessed" ? "text-red-400" : "" }
          ${resultType === "inWord" ? "text-green-400" : "" }
          ${resultType === "notInWord" ? "text-red-400" : "" }
        `}
        >{result}</p>
      )}
    
      <p>Wrong guess: 
        <span className="font-bold text-red-600">{wrongLetter.join("- ")}</span>
      </p> 
      
      <p>Attempts left: <span className="font-bold
      text-red-600">{guessAttempts}</span>
      </p>

      {hasWon && <p className="font-bold">🎉 You won! Congratulations!</p>}
      {hasLost && <p className="font-bold">🩻 You lose! The word was: <span className="text-green-400">{word.word}</span></p>}

      {(hasWon || hasLost) && (
        <button onClick={onPlayAgain} className=" mt-4 cursor-pointer
        hover:bg-[#8c62a4] bg-[#D0B0DF]
            text-white font-bold py-2 px-4 rounded">
            Play Again
        </button>
      )}
          <button onClick={onReturnHome} className="fixed top-4 left-4 cursor-pointer
          hover:bg-[#8c62a4] bg-[#D0B0DF] text-lg sm:text-xl md:text-2xl rounded py-3 px-5">
                  🏠
          </button>
        </div>
    </div> 
  )
}

export default Hangman;
