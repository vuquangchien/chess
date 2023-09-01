import {Board} from '../Board';
import {Piece} from '../Piece';
import {BoardFactory} from '../BoardFactory';

describe('QueenMovePolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createEmptyBoard();
    board.getByCellName('e1').setPiece(Piece.fromName('q'));
  });
  it('should allow queen to move horizontally', () => {
    expect(() => {
      board.movePieceByCellName('e1', 'a1');
    }).not.toThrowError();
  });
  it('should allow queen to move vertically', () => {
    expect(() => {
      board.movePieceByCellName('e1', 'e8');
    }).not.toThrowError();
  });
  it('should allow queen to move diagonally', () => {
    expect(() => {
      board.movePieceByCellName('e1', 'a5');
    }).not.toThrowError();
  });
  it('should not allow queen to move like knight', () => {
    expect(() => {
      board.movePieceByCellName('e1', 'd3');
    }).toThrowError();
  });
});
