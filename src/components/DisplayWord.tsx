import "./DisplayWord.css";

type WordProps = {
  randomWord: string;
  guessedLetters: string[];
};

function DisplayWord({ randomWord, guessedLetters }: WordProps) {
  return (
    <div className="word_container">
      {randomWord.split("").map((letter, index) => {
        return (
          <span className="word_item" key={index}>
            <span
              style={{
                visibility: guessedLetters.includes(letter)
                  ? "visible"
                  : "hidden",
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default DisplayWord;
