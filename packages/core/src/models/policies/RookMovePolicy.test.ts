// @ts-ignore
import {describe} from '@jest/globals';
import {RookMovePolicy} from './RookMovePolicy';
import {MoveFactory} from '../Move';
import {Cell} from '../Cell';

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
});
