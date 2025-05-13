"use client";

import React, { useState, useEffect } from "react";
import GolfScorecard from "../components/Scorecard";
import courses from "../lib/courses";
import { keys } from "../lib/cache";
import { Team } from "@/types";

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([
    {
      name: "#d9534f", // red
      players: [
        { name: "Player 1", handicap: 0 },
        { name: "Player 2", handicap: 0 },
      ],
    },
    {
      name: "#3b5998", // blue
      players: [
        { name: "Player 3", handicap: 0 },
        { name: "Player 4", handicap: 0 },
      ],
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const holeHandicaps = selectedCourse.holes.map((hole) => hole.handicap);
  const holePars = selectedCourse.holes.map((hole) => hole.par);

  // Load initial state from localStorage
  useEffect(() => {
    const storedTeams = localStorage.getItem(keys.TEAMS);
    const storedCourse = localStorage.getItem(keys.SELECTED_COURSE);
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
    if (storedCourse) {
      setSelectedCourse(JSON.parse(storedCourse));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(keys.TEAMS, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(keys.SELECTED_COURSE, JSON.stringify(selectedCourse));
  }, [selectedCourse]);

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(courses.find((c) => c.name === event.target.value)!);
  };

  const handlePlayerChange = (
    teamIndex: number,
    playerIndex: number,
    field: "name" | "handicap",
    value: string | number,
  ) => {
    const newTeams = [...teams];
    if (field === "name") {
      newTeams[teamIndex].players[playerIndex].name = value as string;
    } else {
      newTeams[teamIndex].players[playerIndex].handicap = value as number;
    }
    setTeams(newTeams);
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">MGL</h1>

        <GolfScorecard
          teams={teams}
          holeHandicaps={holeHandicaps}
          holePars={holePars}
        />

        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Course</h2>
            <select
              value={selectedCourse.name}
              onChange={handleCourseChange}
              className="px-3 py-2 border rounded"
            >
              {courses.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {teams.map((team, teamIndex) => (
            <div key={team.name} className="mb-4">
              <div
                className={`mb-2 h-8 w-72`}
                style={{ backgroundColor: team.name }}
              />
              {team.players.map((player, playerIndex) => (
                <div key={playerIndex} className="flex gap-4 mb-2">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) =>
                      handlePlayerChange(
                        teamIndex,
                        playerIndex,
                        "name",
                        e.target.value,
                      )
                    }
                    className="px-3 py-2 border rounded"
                    placeholder="Player name"
                  />
                  <select
                    value={player.handicap}
                    onChange={(e) =>
                      handlePlayerChange(
                        teamIndex,
                        playerIndex,
                        "handicap",
                        parseInt(e.target.value),
                      )
                    }
                    className="px-3 py-2 border rounded w-24"
                  >
                    {Array.from({ length: 29 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 pb-8 text-center text-sm text-gray-600">
          <h2 className="text-xl font-bold mb-4">Add to Home Screen</h2>
          <div className="space-y-2">
            <p>
              <strong>iOS (Safari/Chrome):</strong>
            </p>
            <p>1. Tap the Share button (rectangle with arrow)</p>
            <p>2. Scroll down and tap &ldquo;Add to Home Screen&rdquo;</p>
            <p>3. Tap &ldquo;Add&rdquo; to confirm</p>

            <p className="mt-4">
              <strong>Android (Chrome):</strong>
            </p>
            <p>1. Tap the menu (three dots)</p>
            <p>2. Tap &ldquo;Add to Home screen&rdquo;</p>
            <p>3. Tap &ldquo;Add&rdquo; to confirm</p>
          </div>
        </div>
      </main>
    </div>
  );
}
