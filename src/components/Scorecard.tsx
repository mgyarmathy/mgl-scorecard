"use client";

import React, { useState, useEffect } from "react";
import { Team } from "../types";
import {
  calculateAllStrokesReceived,
  calculateHoleResults,
} from "@/lib/scorekeeping";

interface ScorecardProps {
  teams: Team[];
  holeHandicaps: number[];
  holePars: number[];
}

const GolfScorecard: React.FC<ScorecardProps> = ({
  teams,
  holeHandicaps,
  holePars,
}) => {
  const [scores, setScores] = useState<(number | null)[][][]>(
    Array(teams.length)
      .fill(null)
      .map(() =>
        Array(2)
          .fill(null)
          .map(() => Array(9).fill(null)),
      ),
  );

  // Load initial scores from localStorage
  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  const handleScoreChange = (
    teamIndex: number,
    playerIndex: number,
    holeIndex: number,
    score: number | null,
  ) => {
    const newScores = [...scores];
    newScores[teamIndex][playerIndex][holeIndex] = score;
    setScores(newScores);
  };

  const handleNewScorecard = () => {
    if (window.confirm("Are you sure you want to clear all scores?")) {
      setScores(
        Array(teams.length)
          .fill(null)
          .map(() =>
            Array(2)
              .fill(null)
              .map(() => Array(9).fill(null)),
          ),
      );
    }
  };

  const holeResults = calculateHoleResults(teams, scores, holeHandicaps);
  // Compute capped strokes received per player per hole
  const strokesReceivedMatrix = calculateAllStrokesReceived(
    teams,
    holeHandicaps,
  );
  const matchScore = holeResults.reduce(
    (acc, result) => {
      if (result != null && result !== "TIE") {
        acc[result] += 1;
      } else if (result == "TIE") {
        Object.keys(acc).forEach((key) => (acc[key] += 0.5));
      }
      return acc;
    },
    { [teams[0].name]: 0, [teams[1].name]: 0 },
  );
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-center items-center mb-8 p-6 rounded-lg">
        <div className="flex mb-2">
          <div className="text-6xl font-bold tracking-wider flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="mb-2">{teams[0].name}</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">
                {matchScore[teams[0].name]}
              </span>
            </div>
            <div className="text-4xl">VS</div>
            <div className="flex flex-col items-center">
              <span className="mb-2">{teams[1].name}</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">
                {matchScore[teams[1].name]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <button
          onClick={handleNewScorecard}
          className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100"
        >
          New Scorecard
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="py-2 px-4 border-b"></th>
            <th className="py-2 px-4 border-b">Player (Handicap)</th>
            <th className="py-2 px-4 border-b">
              <table>
                <tbody>
                  <tr>
                    <td>HOLE</td>
                  </tr>
                  <tr>
                    <td>PAR</td>
                  </tr>
                  <tr>
                    <td>HDCP</td>
                  </tr>
                </tbody>
              </table>
            </th>
            {holeHandicaps.map((_, i) => (
              <th key={i} className="py-2 px-4 border-b text-center">
                <table className="min-w-full">
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                    </tr>
                    <tr>
                      <td>{holePars[i]}</td>
                    </tr>
                    <tr>
                      <td>{holeHandicaps[i]}</td>
                    </tr>
                  </tbody>
                </table>
              </th>
            ))}
            <th key="total" className="py-2 px-4 border-b">
              <table className="min-w-full">
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>TOTAL</td>
                  </tr>
                </tbody>
              </table>
            </th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, teamIndex) =>
            team.players.map((player, playerIndex) => {
              const strokesReceived =
                strokesReceivedMatrix[teamIndex][playerIndex];
              const rowClass = playerIndex === 0 ? "bg-gray-50" : "";
              return (
                <tr
                  key={`${teamIndex}-${playerIndex}`}
                  className={`${rowClass} hover:bg-gray-100`}
                >
                  {playerIndex === 0 && (
                    <td rowSpan={2} className="py-2 px-4 border-b">
                      {team.name}
                    </td>
                  )}
                  <td className="py-2 px-4 border-b" colSpan={2}>
                    {player.name} ({player.handicap})
                  </td>
                  {scores[teamIndex][playerIndex].map((score, holeIndex) => (
                    <td key={holeIndex} className="border">
                      <div className="flex flex-col">
                        <select
                          value={score === null ? 0 : score}
                          onChange={(e) =>
                            handleScoreChange(
                              teamIndex,
                              playerIndex,
                              holeIndex,
                              e.target.value === "0"
                                ? null
                                : parseInt(e.target.value),
                            )
                          }
                          className="w-20 h-10 pt-1 text-center text-xl focus:outline-none appearance-none"
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                            <option key={value} value={value}>
                              {value === 0 ? "" : value}
                            </option>
                          ))}
                        </select>
                        <div className="text-[8px] text-center h-3">
                          {Array(strokesReceived[holeIndex])
                            .fill("●")
                            .join(" ")}
                        </div>
                      </div>
                    </td>
                  ))}
                  <td
                    key="total"
                    className="border w-20 h-10 text-lg text-center"
                  >
                    {scores[teamIndex][playerIndex].reduce(
                      (acc, score) => acc! + (score ?? 0),
                      0,
                    )}
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
        <tfoot className="text-center">
          <tr>
            <td />
            <td />
            <td />
            {holeResults.map((result, i) => (
              <td key={i} className="w-20 h-10 text-lg text-gray-300">
                {result != null ? result : "-"}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GolfScorecard;
