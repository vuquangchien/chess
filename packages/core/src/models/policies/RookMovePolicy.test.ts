// @ts-ignore
import {describe, expect} from '@jest/globals';
import {RookMovePolicy} from './RookMovePolicy';
import {Cell} from '../Cell';
import {MoveFactory} from '../moves/MoveFactory';
import {BoardFactory} from '../BoardFactory';

describe('RookMovePolicy', () => {
  it('should allow to move horizontally', () => {
    const error = new RookMovePolicy().isMoveValid(
      MoveFactory.createMove(Cell.fromName('a8', 'r'), Cell.fromName('a1'))
    );
    expect(error).toBeNull();
  });
  it('should allow to move vertically', () => {
    const error = new RookMovePolicy().isMoveValid(
      MoveFactory.createMove(Cell.fromName('a8', 'r'), Cell.fromName('h8'))
    );
    expect(error).toBeNull();
  });
  // block diagonal move
  it('should not allow to move diagonally', () => {
    const error = new RookMovePolicy().isMoveValid(
      MoveFactory.createMove(Cell.fromName('a8', 'r'), Cell.fromName('h1'))
    );
    expect(error).toEqual('Rook cannot move diagonally');
  });
  it('should allow rook to capture', () => {
    expect(() => {
      const board = BoardFactory.createFromFen(
        'rnb1kbnr/1ppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1'
      );
      board.movePieceByCellName('a8', 'a2');
    }).not.toThrowError();
    expect(() => {
      const board = BoardFactory.createFromFen(
        'rnb1kbnr/1ppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1'
      );
      board.movePieceByCellName('a8', 'b2');
    }).toThrowError();
  });
});
