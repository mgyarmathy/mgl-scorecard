import { Course } from "../types";

const courses: Course[] = [
  {
    name: "Sherrill Park Course #1",
    holes: [
      { number: 1, par: 4, handicap: 10 },
      { number: 2, par: 5, handicap: 2 },
      { number: 3, par: 4, handicap: 18 },
      { number: 4, par: 3, handicap: 14 },
      { number: 5, par: 4, handicap: 6 },
      { number: 6, par: 4, handicap: 16 },
      { number: 7, par: 4, handicap: 8 },
      { number: 8, par: 3, handicap: 4 },
      { number: 9, par: 4, handicap: 12 },
    ],
  },
  {
    name: "Sherrill Park Course #2",
    holes: [
      { number: 1, par: 4, handicap: 8 },
      { number: 2, par: 4, handicap: 4 },
      { number: 3, par: 4, handicap: 6 },
      { number: 4, par: 3, handicap: 17 },
      { number: 5, par: 5, handicap: 2 },
      { number: 6, par: 4, handicap: 13 },
      { number: 7, par: 4, handicap: 9 },
      { number: 8, par: 3, handicap: 18 },
      { number: 9, par: 4, handicap: 7 },
    ],
  },
];

export default courses;
