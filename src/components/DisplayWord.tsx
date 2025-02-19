import "./DisplayWord.css";

type WordProps = {
  randomWord: string;
  guessedLetters: string[];
  reveal?: boolean;
};

function DisplayWord({
  reveal = false,
  randomWord,
  guessedLetters,
}: WordProps) {
  return (
    <div className="word_container">
      {randomWord.split("").map((letter, index) => {
        return (
          <span className="word_item" key={index}>
            <span
              style={{
                visibility:
                  guessedLetters.includes(letter) || reveal
                    ? "visible"
                    : "hidden",
                color:
                  !guessedLetters.includes(letter) && reveal ? "red" : "black",
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
