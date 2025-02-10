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

  type AlphabetItem = {
    letter: string;
    isSelected: boolean;
  };

  const initialAlphabet: AlphabetItem[] = [];

  for (let i = 65; i <= 90; i++) {
    initialAlphabet.push({ letter: String.fromCharCode(i), isSelected: false });
  }

  // setIncorrectLetters(
  const incorrectLetters = guessedLetters.filter(
    (letter) => !randomWord.includes(letter)
  );
  // );

  console.log(incorrectLetters);

  return (
    <>
      <h1>Hangman</h1>
      <div
        style={{
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <HangmanDrawing
          randomWord={randomWord}
          guessedLetters={guessedLetters}
          numberOfGuesses={incorrectLetters.length}
        />

        <DisplayWord randomWord={randomWord} guessedLetters={guessedLetters} />
        <Keyboard
          alphabet={initialAlphabet}
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
