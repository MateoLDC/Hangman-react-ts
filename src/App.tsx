import { useCallback, useEffect, useState } from "react";
import "./App.css";
import trumpets from "./trumpetList.json";
import KnotmanDrawing from "./components/KnotmanDrawing";
import KnotWord from "./components/KnotWord";
import Keyboard from "./components/Keyboard";

function getTrumpet() {
  return trumpets[Math.floor(Math.random() * trumpets.length)];
}

function App() {
  const [trumpetToGuess, setTrumpetToGuess] = useState(() => {
    return trumpets[Math.floor(Math.random() * trumpets.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !trumpetToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = trumpetToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setTrumpetToGuess(getTrumpet());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  });

  return (
    <div className="jsp">
      <div className="toptext">
        {isWinner && "🤘🎺 Tu as gagné ! 🎺🤘"}
        {isLoser && "🫵 Honte à toi ! 🫵"}
      </div>
      <KnotmanDrawing numberOfGuesses={incorrectLetters.length} />
      <KnotWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        trumpetToGuess={trumpetToGuess}
      />
      <div className="keyboard-box">
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            trumpetToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
