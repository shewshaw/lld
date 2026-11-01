
import { useState, type FormEvent } from "react";

interface GameSetupProps {
  onStart: (playerXName: string, playerOName: string) => void;
  isSubmitting?: boolean;
}

export function GameSetup({
  onStart,
  isSubmitting = false,
}: GameSetupProps) {
  const [playerXName, setPlayerXName] = useState("");
  const [playerOName, setPlayerOName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const xName = playerXName.trim();
    const oName = playerOName.trim();

    if (!xName || !oName || isSubmitting) {
      return;
    }

    onStart(xName, oName);
  }

  return (
    <section className="game-setup">
      <h1>Tic-Tac-Toe</h1>
      <p className="game-setup__subtitle">
        Challenge a friend to a game!
      </p>

      <form onSubmit={handleSubmit} className="game-setup__form">
        <div className="game-setup__field">
          <label htmlFor="player-x">Player X</label>
          <input
            id="player-x"
            type="text"
            placeholder="Enter Player X name"
            value={playerXName}
            onChange={(event) => setPlayerXName(event.target.value)}
            required
            maxLength={30}
            disabled={isSubmitting}
          />
        </div>

        <div className="game-setup__field">
          <label htmlFor="player-o">Player O</label>
          <input
            id="player-o"
            type="text"
            placeholder="Enter Player O name"
            value={playerOName}
            onChange={(event) => setPlayerOName(event.target.value)}
            required
            maxLength={30}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="game-setup__button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating game..." : "Start Game"}
        </button>
      </form>
    </section>
  );
}
