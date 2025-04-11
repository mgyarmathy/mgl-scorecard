import { Team } from "../types";

export const calculateStrokesReceived = (
  playerHandicap: number,
  holeHandicaps: number[],
): number[] => {
  const numHoles = holeHandicaps.length;
  const strokes = Array(numHoles).fill(0);
  const playerStrokes = Math.ceil(playerHandicap / 2); // Adjust for 9 holes

  const sortedHoleIndices = holeHandicaps
    .map((handicap, index) => ({ handicap, index }))
    .sort((a, b) => a.handicap - b.handicap)
    .map((item) => item.index);

  for (let i = 0; i < Math.min(playerStrokes, numHoles); i++) {
    strokes[sortedHoleIndices[i]] = 1;
  }

  return strokes;
};

export const calculateNetScore = (
  score: number | null,
  strokesReceived: number,
): number | null => {
  return score !== null ? Math.max(score - strokesReceived, 0) : null;
};

export const calculateHoleResults = (
  teams: Team[],
  scores: (number | null)[][][],
  holeHandicaps: number[],
): (string | "TIE" | null)[] => {
  const numHoles = holeHandicaps.length;
  const holeResults: (string | "TIE" | null)[] = Array(numHoles).fill(null);

  for (let holeIndex = 0; holeIndex < numHoles; holeIndex++) {
    const [team1Score, team2Score] = teams.map((team, teamIndex) => {
      const player1Net = calculateNetScore(
        scores[teamIndex][0][holeIndex],
        calculateStrokesReceived(
          teams[teamIndex].players[0].handicap,
          holeHandicaps,
        )[holeIndex],
      );
      const player2Net = calculateNetScore(
        scores[teamIndex][1][holeIndex],
        calculateStrokesReceived(
          teams[teamIndex].players[1].handicap,
          holeHandicaps,
        )[holeIndex],
      );

      if (player1Net === null && player2Net === null) {
        return null;
      }

      return Math.min(player1Net ?? Infinity, player2Net ?? Infinity);
    });

    if (team1Score != null && team2Score != null) {
      if (team1Score < team2Score) {
        holeResults[holeIndex] = teams[0].name;
      } else if (team1Score > team2Score) {
        holeResults[holeIndex] = teams[1].name;
      } else {
        holeResults[holeIndex] = "TIE";
      }
    }
  }

  return holeResults;
};
