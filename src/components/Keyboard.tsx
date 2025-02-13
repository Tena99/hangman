import { JSX } from "react";
import "./Keyboard.css";

type KeyboardProps = {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetters: (letter: string) => void;
};

function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetters,
}: KeyboardProps): JSX.Element {
  const alphabet: string[] = [];

  for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
  }

  return (
    <section className="alphabet-container">
      {alphabet.map((letter) => {
        const isActive = activeLetters.includes(letter.toLowerCase());
        const isInactive = inactiveLetters.includes(letter.toLowerCase());

        return (
          <button
            className={isActive ? "active" : ""}
            onClick={() => addGuessedLetters(letter.toLowerCase())}
            disabled={isActive || isInactive}
          >
            {letter}
          </button>
        );
      })}
    </section>
  );
}

export default Keyboard;
