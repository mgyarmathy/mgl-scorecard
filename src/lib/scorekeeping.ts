import { Team } from "../types";

/**
 * Calculate raw strokes received for a single player over the given holes.
 * Distributes strokes in order of hole handicap, allowing multi-pass assignment.
 * @param playerHandicap Handicap index for the player
 * @param holeHandicaps Array of hole stroke indices (difficulty rankings)
 * @returns Array of strokes received per hole
 */
export const calculateStrokesReceived = (
  playerHandicap: number,
  holeHandicaps: number[],
): number[] => {
  const numHoles = holeHandicaps.length;
  const strokes = Array(numHoles).fill(0);
  // Total strokes for 9 holes, rounding up half handicaps
  const totalStrokes = Math.ceil(playerHandicap / 2);
  // Determine hole order by ascending handicap (hardest holes first)
  const sortedHoleIndices = holeHandicaps
    .map((handicap, index) => ({ handicap, index }))
    .sort((a, b) => a.handicap - b.handicap)
    .map((item) => item.index);
  // Distribute strokes across holes, wrapping around if strokes > numHoles
  for (let i = 0; i < totalStrokes; i++) {
    const holeIndex = sortedHoleIndices[i % numHoles];
    strokes[holeIndex] += 1;
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

  // Precompute raw strokes for all players
  const rawStrokes = teams.map((team) =>
    team.players.map((player) =>
      calculateStrokesReceived(player.handicap, holeHandicaps)
    )
  );
  // Apply opponent cap: max one stroke advantage per hole
  const strokesReceived = teams.map((team, teamIndex) =>
    team.players.map((_, playerIndex) =>
      holeHandicaps.map((_, holeIndex) => {
        const raw = rawStrokes[teamIndex][playerIndex][holeIndex];
        const oppTeam = 1 - teamIndex;
        const minOppRaw = Math.min(
          rawStrokes[oppTeam][0][holeIndex],
          rawStrokes[oppTeam][1][holeIndex]
        );
        return Math.min(raw, minOppRaw + 1);
      })
    )
  );
  for (let holeIndex = 0; holeIndex < numHoles; holeIndex++) {
    const [team1Score, team2Score] = teams.map((_team, teamIndex) => {
      const player1Net = calculateNetScore(
        scores[teamIndex][0][holeIndex],
        strokesReceived[teamIndex][0][holeIndex]
      );
      const player2Net = calculateNetScore(
        scores[teamIndex][1][holeIndex],
        strokesReceived[teamIndex][1][holeIndex]
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
/**
 * Calculate final strokes received for all players, applying opponent cap: max one stroke advantage per hole.
 * @param teams Array of two teams with two players each
 * @param holeHandicaps Array of hole stroke indices (difficulty rankings)
 * @returns Nested array [teamIndex][playerIndex][holeIndex] of strokes received
 */
export const calculateAllStrokesReceived = (
  teams: Team[],
  holeHandicaps: number[],
): number[][][] => {
  // Raw strokes for each player
  const rawStrokes = teams.map((team) =>
    team.players.map((player) =>
      calculateStrokesReceived(player.handicap, holeHandicaps)
    )
  );
  // Cap strokes per hole relative to opponents
  return teams.map((team, teamIndex) =>
    team.players.map((_, playerIndex) =>
      holeHandicaps.map((_, holeIndex) => {
        const raw = rawStrokes[teamIndex][playerIndex][holeIndex];
        const oppTeam = 1 - teamIndex;
        const minOppRaw = Math.min(
          rawStrokes[oppTeam][0][holeIndex],
          rawStrokes[oppTeam][1][holeIndex]
        );
        return Math.min(raw, minOppRaw + 1);
      })
    )
  );
};
