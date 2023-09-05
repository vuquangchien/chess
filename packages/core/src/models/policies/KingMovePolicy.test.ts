import {BoardFactory} from '../BoardFactory';
import {Piece} from '../Piece';
import {Board} from '../Board';

describe('KingMovePolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createEmptyBoard();
    board.getByCellName('e1').setPiece(Piece.fromName('K'));
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
  it('should allow king to capture', () => {
    const board = BoardFactory.createFromFen(
      '8/8/2K5/3n4/8/1n2k3/8/8 b - - 0 1'
    );
    expect(() => {
      board.movePieceByCellName('c6', 'b3');
    }).toThrowError();
    expect(() => {
      board.movePieceByCellName('c6', 'd5');
    }).not.toThrowError();
  });
});
