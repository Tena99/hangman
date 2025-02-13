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

  useEffect(() => {
    const wordIndex: number = Math.floor(Math.random() * words.length);
    setRandomWord(words[wordIndex]);
  }, []);

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter)) return;

      setGuessedLetters((prev) => [...prev, letter]);
    },
    [guessedLetters]
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

  const incorrectLetters = guessedLetters.filter(
    (letter) => !randomWord.includes(letter)
  );

  return (
    <>
      <h1>Hangman</h1>
      <div className="hangman_container">
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

        <DisplayWord randomWord={randomWord} guessedLetters={guessedLetters} />
        <Keyboard
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
