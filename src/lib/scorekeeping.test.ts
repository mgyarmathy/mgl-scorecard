// // src/lib/scorekeeping.test.ts
// import { calculateStrokesReceived, calculateNetScore, calculateHoleResults } from './scorekeeping';

// describe('scorekeeping logic', () => {
//   describe('calculateStrokesReceived', () => {
//     it('should calculate strokes received correctly for a 9-hole match', () => {
//       const holeHandicaps = [10, 2, 18, 14, 6, 16, 8, 4, 12]; // Example hole handicaps
//       expect(calculateStrokesReceived(6, holeHandicaps)).toEqual([0, 1, 0, 0, 1, 0, 1, 0, 0]);
//       expect(calculateStrokesReceived(10, holeHandicaps)).toEqual([1, 1, 0, 1, 1, 0, 1, 0, 1]);
//       expect(calculateStrokesReceived(20, holeHandicaps)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1]);
//       expect(calculateStrokesReceived(30, holeHandicaps)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1]);
//     });

//     it('should handle cases with zero handicap', () => {
//       const holeHandicaps = [10, 2, 18, 14, 6, 16, 8, 4, 12];
//       expect(calculateStrokesReceived(0, holeHandicaps)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
//     });

//     it('should handle cases with handicaps greater than the number of holes', () => {
//       const holeHandicaps = [10, 2, 18, 14, 6, 16, 8, 4, 12];
//       expect(calculateStrokesReceived(18, holeHandicaps)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1]);
//     });
//   });

//   describe('calculateNetScore', () => {
//     it('should calculate net score correctly', () => {
//       expect(calculateNetScore(5, 1)).toBe(4);
//       expect(calculateNetScore(4, 0)).toBe(4);
//       expect(calculateNetScore(null, 1)).toBeNull();
//     });
//   });

//   describe('calculateHoleResults', () => {
//     it('should calculate hole results correctly', () => {
//       const teams = [{ id: 1, players: [{ id: 1, name: 'Player A', handicap: 6 }, { id: 2, name: 'Player B', handicap: 10 }] }, { id: 2, players: [{ id: 3, name: 'Player C', handicap: 20 }, { id: 4, name: 'Player D', handicap: 30 }] },];
//       const holeHandicaps = [10, 2, 18, 14, 6, 16, 8, 4, 12];
//       const scores = [
//         [[5, 4, 5, 3, 4, 5, 4, 3, 4], [4, 5, 4, 3, 5, 4, 3, 4, 5]],[[6, 4, 4, 4, 5, 4, 4, 5, 4], [5, 5, 5, 4, 4, 3, 4, 4, 4]],
//       ];
//       expect(calculateHoleResults(teams, scores as any, holeHandicaps)).toEqual([0, 1, 0, -1, -1, 1, 1, 0, 0]);
//     });

//     it('should handle tie scenarios', () => {
//       const teams = [{ id: 1, players: [{ id: 1, name: 'Player A', handicap: 6 }, { id: 2, name: 'Player B', handicap: 10 }] }, { id: 2, players: [{ id: 3, name: 'Player C', handicap: 20 }, { id: 4, name: 'Player D', handicap: 30 }] },];
//             const holeHandicaps = [10, 2, 18, 14, 6, 16, 8, 4, 12];
//       const scores = [
//         [[4, 4, 4, 4, 4, 4, 4, 4, 4], [5, 3, 5, 5, 3, 4, 5, 3, 4]],[[6, 4, 4, 5, 5, 4, 4, 4, 4], [5, 5, 5, 4, 4, 3, 4, 4, 4]],
//             ];
//             expect(calculateHoleResults(teams, scores as any, holeHandicaps)).toEqual([0, 0, 0, -1, -1, 1, 1, 0, 0]);
//         });

//     it('should handle null scores correctly', () => {
//             const teams = [{ id: 1, players: [{ id: 1, name: 'Player A', handicap: 6 }, { id: 2, name: 'Player B', handicap: 10 }] }, { id: 2, players: [{ id: 3, name: 'Player C', handicap: 20 }, { id: 4, name: 'Player D', handicap: 30 }] },];
//             const holeHandicaps = [10, 2, 18, 14, 6, 16, 8, 4, 12];
//             const scores = [
//                 [[4, null, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4, 4]],[[5, 5, 5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5]],
//             ];
//             expect(calculateHoleResults(teams, scores as any, holeHandicaps)).toEqual([0, -1, 0, -1, -1, 1, 1, 0, 0]);
//         });
//     });
// });
