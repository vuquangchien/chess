import {BoardFactory} from '../BoardFactory';
import {Piece} from '../Piece';
import {Board} from '../Board';

describe('KingMovePolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createEmptyBoard();
    board.getByCellName('e1').setPiece(Piece.fromName('k'));
  });
  it('should not allow king to move more than one cell', () => {
    expect(() => {
      board.movePieceByCellName('e1', 'e3');
    }).toThrowError();
  });
  it('should allow king to move one cell', () => {
    expect(() => {
      board.movePieceByCellName('e1', 'e2');
    }).not.toThrowError();
  });
});
