/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from "react";
import { words } from "./assets/data/words";
import DisplayWord from "./components/DisplayWord";
import HangmanDrawing from "./components/HangmanDrawing";
import Keyboard from "./components/Keyboard";

import "./App.css";

function App() {
  const [randomWord, setRandomWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  console.log(randomWord);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !randomWord.includes(letter)
  );

  const isLoser: boolean = incorrectLetters.length >= 6;
  const isWinner: boolean = randomWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  useEffect(() => {
    const wordIndex: number = Math.floor(Math.random() * words.length);
    setRandomWord(words[wordIndex]);
  }, []);

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((prev) => [...prev, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetters(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  return (
    <>
      <h1>Hangman</h1>
      <div className="hangman_container">
        {isLoser && <h3 className="isLoser">It was close. Keep trying!</h3>}
        {isWinner && <h3 className="isWinner">Congratulations! You won 🎉</h3>}

        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

        <DisplayWord
          reveal={isLoser}
          randomWord={randomWord}
          guessedLetters={guessedLetters}
        />

        <Keyboard
          isDisabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            randomWord.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetters={addGuessedLetters}
        ></Keyboard>
      </div>
    </>
  );
}

export default App;
