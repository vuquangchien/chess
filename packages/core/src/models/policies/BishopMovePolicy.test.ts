import {BoardFactory} from '../BoardFactory';
import {BoardView} from '../../views/BoardView';
import {BoardViewController} from '../../views/BoardViewController';
import {Piece} from '../Piece';
// @ts-ignore
import {expect} from '@jest/globals';

describe('BishopMovePolicy', () => {
  it('should allow to move diagonally', () => {
    const board = BoardFactory.createFromFen('2B5/8/8/8/8/8/8/5k1K w - - 0 1');
    console.log(new BoardView(new BoardViewController(board)).render());
    expect(() => {
      board.movePieceByCellName('c8', 'f5');
    }).not.toThrowError();
  });
  // not allow to move horizontally
  it('should not allow to move horizontally', () => {
    const board = BoardFactory.createEmptyBoard();
    board.getByCellName('c8').setPiece(Piece.fromName('b'));
    expect(() => {
      board.movePieceByCellName('c8', 'c4');
    }).toThrowError();
  });
  it('should allow bishop to capture', () => {
    const board = BoardFactory.createFromFen(
      'rn2kbnr/1ppp1ppp/1b6/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1\n'
    );
    expect(() => {
      board.movePieceByCellName('b6', 'c2');
    }).toThrowError();
    expect(() => {
      board.movePieceByCellName('b6', 'd4');
    }).not.toThrowError();
  });
});
