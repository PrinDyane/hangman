import React from 'react';
import winImg from './assets/win.png';
import loseImg from './assets/hangman5.png'; 

function ResultScreen({ hasWon, word, onPlayAgain, onReturnHome }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 text-center">
      <button 
        onClick={onReturnHome}
        className="absolute top-4 left-4 bg-[#D0B0DF] 
        hover:bg-[#8c62a4] text-white text-xl py-2 px-4 rounded"
      >
        🏠
      </button>

      <img
        src={hasWon ? winImg : loseImg}
        alt={hasWon ? "You won!" : "You lost!"}
        className="w-40 h-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 mb-6"
      />

      {hasWon ? (
        <p className="font-bold text-2xl text-green-500 mb-4">🎉 You won! Congratulations!</p>
      ) : (
        <p className="font-bold text-2xl text-red-500 mb-4">🩻 You lost! The word was: 
        <span className="text-green-400">{word}</span></p>
      )}

      <button 
        onClick={onPlayAgain}
        className="mt-2 bg-[#D0B0DF] hover:bg-[#8c62a4] text-white font-bold py-2 px-6 rounded"
      >
        Try Again
      </button>
    </div>
  );
}

export default ResultScreen;
