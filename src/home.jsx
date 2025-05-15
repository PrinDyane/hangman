import React from 'react';
import { useState } from 'react';
import LevelEasy from './easy';
import LevelMedium from './medium';
import LevelHard from './hard';
import Hangman from './hangman';
import mascote from './assets/win.png'


function Home() {
  const [GameStarted, setGameStarted] = useState(false); 
  const [selectWord, setSelectWord] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const goToHome = () => {
    setGameStarted(false);
    setSelectedLevel(null);
    setSelectWord(null);
  };

  const wordList = {
    easy: LevelEasy,
    medium: LevelMedium,
    hard: LevelHard,
  };

  const startGame = (level) => {
    const words = wordList[level];
    const categories = Object.keys(words);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const wordArray = words[randomCategory];
    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    setSelectedLevel(level);
    setSelectWord({
      category: randomCategory,
      word: randomWord.toUpperCase(),
    });
    setGameStarted(true);
  };
  
  const playAgain = () => {
    if (!selectedLevel) return;
    const words = wordList[selectedLevel];
    const categories = Object.keys(words);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomWordArray = words[randomCategory];
    const randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];

    setSelectWord ({
      category: randomCategory,
      word: randomWord.toUpperCase(),
    });
    setGameStarted(true);
  };
 
  return (
    <>
      {!GameStarted ? (
        <div className= "min-h-screen justify-center items-center flex flex-col text-center">
          <h1 className='text-4xl font-bold text-[#8C62A4]'>Let's play Hangman!</h1>
          <img src={mascote} alt="Welcome!" className='w-32 h-32'/>
          <h2 className='text-green-600 font-bold'>Select difficulty level</h2>
          <div className='flex space-x-4 p-4 mt-2'>
            <button onClick={() => startGame("easy")} className='cursor-pointer hover:bg-[#8C62A4] bg-[#D0B0DF] text-white font-bold py-2 px-4 rounded'>Easy</button>
            <button onClick={() => startGame("medium")} className='cursor-pointer hover:bg-[#8C62A4] bg-[#D0B0DF] text-white font-bold py-2 px-4 rounded'>Medium</button>
            <button onClick={() => startGame("hard")} className='cursor-pointer hover:bg-[#8C62A4] bg-[#D0B0DF] text-white font-bold py-2 px-4 rounded'>Hard</button>
          </div>
        </div>
      ) : (
        <Hangman word={selectWord} onPlayAgain={playAgain} onReturnHome={goToHome} />
      )}
    </>
  );
}

export default Home;