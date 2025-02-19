import { JSX } from "react";
import "./Keyboard.css";

type KeyboardProps = {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetters: (letter: string) => void;
  isDisabled: boolean;
};

function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetters,
  isDisabled,
}: KeyboardProps): JSX.Element {
  const alphabet: string[] = [];

  for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
  }

  return (
    <section className="alphabet-container">
      {alphabet.map((letter, index) => {
        const isActive = activeLetters.includes(letter.toLowerCase());
        const isInactive = inactiveLetters.includes(letter.toLowerCase());

        return (
          <button
            key={index}
            className={isActive ? "active" : ""}
            onClick={() => addGuessedLetters(letter.toLowerCase())}
            disabled={isActive || isInactive || isDisabled}
          >
            {letter}
          </button>
        );
      })}
    </section>
  );
}

export default Keyboard;
