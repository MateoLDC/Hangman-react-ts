import "./KnotWord.css";

type KnotWordProps = {
  guessedLetters: string[];
  trumpetToGuess: string;
  reveal?: boolean;
};

function KnotWord({
  guessedLetters,
  trumpetToGuess,
  reveal = false,
}: KnotWordProps) {
  return (
    <div className="word">
      {trumpetToGuess.split("").map((letter, index) => (
        <span className="lines" key={index}>
          <span
            className="visible_letter"
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal
                  ? "#F77D77"
                  : "#52F790",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}

export default KnotWord;
