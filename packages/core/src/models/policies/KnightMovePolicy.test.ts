import {BoardFactory} from '../BoardFactory';
import {Board} from '../Board';
import {Piece} from '../Piece';

describe('KnightMovePolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createEmptyBoard();
    board.getByCellName('e1').setPiece(Piece.fromName('N'));
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
  it('should allow knight to capture', () => {
    const board = BoardFactory.createFromFen(
      'r1b1kbnr/1ppp1ppp/8/1n2p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1'
    );
    expect(() => {
      board.movePieceByCellName('b5', 'c2');
    }).toThrowError();
    expect(() => {
      board.movePieceByCellName('b5', 'd4');
    }).not.toThrowError();
  });
});
