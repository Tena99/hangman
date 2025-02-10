import "./Keyboard.css";

type KeyboardProps = {
  alphabet: { letter: string; isSelected: boolean }[];
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetters: (letter: string) => void;
};

function Keyboard({
  alphabet,
  activeLetters,
  inactiveLetters,
  addGuessedLetters,
}): KeyboardProps {
  return (
    <section className="alphabet-container">
      {alphabet.map((item) => {
        const isActive = activeLetters.includes(item.letter.toLowerCase());
        const isInactive = inactiveLetters.includes(item.letter.toLowerCase());

        return (
          <button
            className={isActive ? "active" : ""}
            onClick={() => addGuessedLetters(item.letter.toLowerCase())}
            disabled={isActive || isInactive}
          >
            {item.letter}
          </button>
        );
      })}
    </section>
  );
}

export default Keyboard;
