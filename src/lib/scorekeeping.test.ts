import { calculateAllStrokesReceived } from './scorekeeping';

describe('calculateAllStrokesReceived example', () => {
  // Hole handicaps (stroke index) over the first 9 holes
  const holeHandicaps = [10, 2, 18, 14, 6, 16, 8, 4, 12];
  // Teams with handicaps: A=6, B=10; C=20, D=30
  const teams = [
    { name: 'Team1', players: [{ name: 'A', handicap: 6 }, { name: 'B', handicap: 10 }] },
    { name: 'Team2', players: [{ name: 'C', handicap: 20 }, { name: 'D', handicap: 30 }] },
  ];
  it('should compute strokes received matching the example', () => {
    const strokes = calculateAllStrokesReceived(teams, holeHandicaps);
    // Team1: Player A strokes at holes 2,5,8 (1-based), i.e., indices 1,4,7
    expect(strokes[0][0]).toEqual([0, 1, 0, 0, 1, 0, 0, 1, 0]);
    // Team1: Player B strokes at holes 1,2,5,7,8 => indices 0,1,4,6,7
    expect(strokes[0][1]).toEqual([1, 1, 0, 0, 1, 0, 1, 1, 0]);
    // Team2: Player C strokes: two strokes on hole 2, one on others
    expect(strokes[1][0]).toEqual([1, 2, 1, 1, 1, 1, 1, 1, 1]);
    // Team2: Player D strokes: two strokes on holes 2,5,8, one on others
    expect(strokes[1][1]).toEqual([1, 2, 1, 1, 2, 1, 1, 2, 1]);
  });
});