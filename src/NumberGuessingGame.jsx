import React, { Component, useState } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

/**
 *
 * Returns a random integer number from 1-100 inclusive
 */

function NumberGuessingGame(){
  const[numberToGuess, setNumberToGuess] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  const[numberOfGuesses, setNumberOfGuesses] = useState(0);
  const[latestGuess, setLatestGuess] = useState(null);

  const MAX_GUESSES = 5;

  const handleGuess = (guess) => {
    if (numberOfGuesses < MAX_GUESSES) {
      setNumberOfGuesses((prev) => prev + 1);
      setLatestGuess(guess);
    }
  };

  const handleReset = () => {
    setNumberToGuess(Math.floor(Math.random() * 100) + 1);
    setNumberOfGuesses(0);
    setLatestGuess(null);
  };

  const hasWon = latestGuess === numberToGuess;
  const hasLost = numberOfGuesses >= MAX_GUESSES && !hasWon;

  const gameOver = hasWon || hasLost;

  return (
    <div>
      <h1>Number Guessing Game</h1>
      {!gameOver ? (
        <>
          <GuessMessage
            guess={latestGuess}
            numberToGuess={numberToGuess}
            numberOfGuesses={numberOfGuesses}
          />
          <GuessControl 
          onGuess={handleGuess}
          disabled={numberOfGuesses >= MAX_GUESSES}
           />
          <p>Guesses left: {MAX_GUESSES - numberOfGuesses}</p>
        </>
      ) : (
        <GameOver hasWon={hasWon} onReset={handleReset} />
      )}
    </div>
  );
}

export default NumberGuessingGame;
