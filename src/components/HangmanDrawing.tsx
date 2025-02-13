import "./HangmanDrawing.css";

type WordProps = {
  numberOfGuesses: number;
};

function HangmanDrawing({ numberOfGuesses }: WordProps) {
  const body_parts = [
    <div className="head"></div>,
    <div className="body"></div>,
    <div className="rightArm"></div>,
    <div className="leftArm"></div>,
    <div className="rightLeg"></div>,
    <div className="leftLeg"></div>,
  ];

  return (
    <div style={{ position: "relative" }}>
      <article className="body_parts">
        {body_parts.slice(0, numberOfGuesses)}
      </article>

      <div className="gallows" />
      <div className="gallows" />
      <div className="gallows" />
      <div className="gallows" />
    </div>
  );
}

export default HangmanDrawing;
