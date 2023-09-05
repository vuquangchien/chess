import {Cell} from '../Cell';
// @ts-ignore
import {expect} from '@jest/globals';
import {MoveFactory} from './MoveFactory';

describe('move', () => {
  it('should get correct distance', () => {
    const move = MoveFactory.createMove(
      Cell.fromName('a8'),
      Cell.fromName('a6')
    );
    expect(move.fileDistance()).toEqual(0);
    expect(move.rankDistance()).toEqual(2);
    expect(move.isVertical()).toBeTruthy();

    const move1 = MoveFactory.createMove(
      Cell.fromName('a8'),
      Cell.fromName('c8')
    );
    expect(move1.fileDistance()).toEqual(2);
    expect(move1.rankDistance()).toEqual(0);
    expect(move1.isHorizontal()).toBeTruthy();

    const move2 = MoveFactory.createMove(
      Cell.fromName('a8'),
      Cell.fromName('c6')
    );
    expect(move2.fileDistance()).toEqual(2);
    expect(move2.rankDistance()).toEqual(2);
    expect(move2.isDiagonal()).toBeTruthy();

    const move3 = MoveFactory.createMove(
      Cell.fromName('b8'),
      Cell.fromName('a6')
    );
    expect(move3.isKnightMove()).toBeTruthy();
  });
  it('should get correct direction', () => {
    const move = MoveFactory.createMove(
      Cell.fromName('a8', 'p'),
      Cell.fromName('a6')
    );
    expect(move.isForward()).toBeTruthy();
    const move1 = MoveFactory.createMove(
      Cell.fromName('a6', 'P'),
      Cell.fromName('a8')
    );
    expect(move1.isForward()).toBeTruthy();
    const move2 = MoveFactory.createMove(
      Cell.fromName('a6', 'P'),
      Cell.fromName('a5')
    );
    expect(move2.isForward()).toBeFalsy();

    const move3 = MoveFactory.createMove(
      Cell.fromName('a6', 'p'),
      Cell.fromName('a7')
    );
    expect(move3.isForward()).toBeFalsy();
  });
  describe('cellsBetween', () => {
    // get cell between move when move is vertical
    it('should get cell between move when move is vertical', () => {
      const move = MoveFactory.createMove(
        Cell.fromName('a4'),
        Cell.fromName('a8')
      );
      expect(move.cellsBetween()).toEqual(['a5', 'a6', 'a7']);
    });
    // should work when order is reversed
    it('should work when order is reversed', () => {
      const move = MoveFactory.createMove(
        Cell.fromName('a8'),
        Cell.fromName('a4')
      );
      expect(move.cellsBetween()).toEqual(['a7', 'a6', 'a5']);
    });
    // should work for horizontal move
    it('should work for horizontal move', () => {
      const move = MoveFactory.createMove(
        Cell.fromName('a4'),
        Cell.fromName('e4')
      );
      expect(move.cellsBetween()).toEqual(['b4', 'c4', 'd4']);
    });
    // should work for diagonal move
    it('should work for diagonal move', () => {
      const move = MoveFactory.createMove(
        Cell.fromName('a4'),
        Cell.fromName('d7')
      );
      expect(move.cellsBetween()).toEqual(['b5', 'c6']);

      const move2 = MoveFactory.createMove(
        Cell.fromName('c8'),
        Cell.fromName('f5')
      );
      expect(move2.cellsBetween()).toEqual(['d7', 'e6']);

      // diagonal up
      const move3 = MoveFactory.createMove(
        Cell.fromName('d4'),
        Cell.fromName('h8')
      );
      expect(move3.cellsBetween()).toEqual(['e5', 'f6', 'g7']);
    });
  });
});
