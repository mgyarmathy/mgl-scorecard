import { Course } from "../types";

const courses: Course[] = [
  {
    name: "Sherrill Park Course #1",
    holes: [
      { number: 1, par: 5, handicap: 10 },
      { number: 2, par: 4, handicap: 2 },
      { number: 3, par: 3, handicap: 18 },
      { number: 4, par: 4, handicap: 14 },
      { number: 5, par: 5, handicap: 6 },
      { number: 6, par: 3, handicap: 16 },
      { number: 7, par: 4, handicap: 8 },
      { number: 8, par: 4, handicap: 4 },
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
  {
    name: "Pecan Hollow",
    holes: [
      { number: 1, par: 4, handicap: 11 },
      { number: 2, par: 4, handicap: 5 },
      { number: 3, par: 5, handicap: 1 },
      { number: 4, par: 4, handicap: 9 },
      { number: 5, par: 3, handicap: 15 },
      { number: 6, par: 4, handicap: 3 },
      { number: 7, par: 4, handicap: 13 },
      { number: 8, par: 3, handicap: 17 },
      { number: 9, par: 5, handicap: 7 },
    ],
  },
];

export default courses;
