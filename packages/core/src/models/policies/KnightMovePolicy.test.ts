import {BoardFactory} from '../BoardFactory';
import {Board} from '../Board';
import {Piece} from '../Piece';

describe('KnightMovePolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createEmptyBoard();
    board.getByCellName('e1').setPiece(Piece.fromName('n'));
  });
  it('should allow knight to move like knight', () => {
    expect(() => {
      board.movePieceByCellName('e1', 'f3');
    }).not.toThrowError();
  });
  // not allow to move horizontally
  it('should not allow knight to move horizontally', () => {
    expect(() => {
      board.movePieceByCellName('e1', 'e2');
    }).toThrowError();
  });
});
