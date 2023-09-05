// @ts-ignore
import {expect} from '@jest/globals';
import {PgnFactory} from './Pgn';
import {TurnFactory} from './TurnFactory';

describe('Pgn record', () => {
  const pgn = `
[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6
4. Ba4 Nf6 5. O-O Be7 6. Re1 b5
7. Bb3 d6 8. c3 O-O 9. h3 Nb8
10. d4 Nbd7 11. c4 c6 12. cxb5 axb5
13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6
16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7
19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4
22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7
25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5
28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6
31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8
34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5
37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5
40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3
43. Re6 1/2-1/2`;
  it('should parse pgn record', () => {
    const pgnRecord = PgnFactory.fromString(pgn);
    expect(pgnRecord.event).toBe('F/S Return Match');
    expect(pgnRecord.site).toBe('Belgrade, Serbia JUG');
    expect(pgnRecord.date).toBe('1992.11.04');
    expect(pgnRecord.round).toBe('29');
    expect(pgnRecord.white).toBe('Fischer, Robert J.');
    expect(pgnRecord.black).toBe('Spassky, Boris V.');
    expect(pgnRecord.result).toBe('1/2-1/2');
    expect(pgnRecord.turns.length).toBe(43);
  });
  it('should parse moves', () => {
    const turnsNotation = `
1. e4 e5 2. Nf3 Nc6 3. Bb5 a6
4. Ba4 Nf6 5. O-O Be7 6. Re1 b5
7. Bb3 d6 8. c3 O-O 9. h3 Nb8
10. d4 Nbd7 11. c4 c6 12. cxb5 axb5
13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6
16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7
19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4
22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7
25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5
28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6
31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8
34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5
37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5
40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3
43. Re6 1/2-1/2`;
    const turns = TurnFactory.fromTurns(turnsNotation);
    expect(turns.length).toBe(43);
  });
  it('should parse turn', () => {
    const turn = TurnFactory.fromString('40. Rd6 Kc5');
    expect(turn.number).toBe(40);
    expect(turn.white).toBe('Rd6');
    expect(turn.black).toBe('Kc5');
    const turn2 = TurnFactory.fromString('43. Re6 1/2-1/2');
    expect(turn2.number).toBe(43);
    expect(turn2.white).toBe('Re6');
    expect(turn2.black).toBe('');
    expect(turn2.result).toBe('1/2-1/2');
  });
  it('should build game', () => {
    const pgnRecord = PgnFactory.fromString('1. e4 e5 ');
    pgnRecord.buildGame();
    expect(pgnRecord.game.moves.length).toBe(2);
  });
  it('[e2e] should works with test game 1', () => {
    const pgn = `
1. e4 e5 2. Nf3 Nc6 3. Bb5 a6
4. Ba4 Nf6 5. O-O Be7 6. Re1 b5
7. Bb3 d6 8. c3 O-O 9. h3 Nb8
10. d4 Nbd7 11. c4 c6 12. cxb5 axb5
13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6
16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7
19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4
22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7
25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5
28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6
31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8
34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5
37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5
40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3
43. Re6 1/2-1/2`;
    const turns = PgnFactory.fromString(pgn);
    turns.buildGame();
  });
});
