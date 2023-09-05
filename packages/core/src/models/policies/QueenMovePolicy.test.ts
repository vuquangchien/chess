import {Board} from '../Board';
import {Piece} from '../Piece';
import {BoardFactory} from '../BoardFactory';

describe('QueenMovePolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createEmptyBoard();
    board.getByCellName('e1').setPiece(Piece.fromName('Q'));
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
  it('should allow queen to capture', () => {
    const board = BoardFactory.createFromFen(
      'rnb1kbnr/pppp1ppp/1q6/4p3/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1'
    );
    expect(() => {
      board.movePieceByCellName('b6', 'd4');
    }).not.toThrowError();
  });
  it('should not allow queen to capture friend piece', () => {
    const board = BoardFactory.createFromFen(
      'rnb1kbnr/pppp1ppp/1q6/4p3/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1'
    );
    expect(() => {
      board.movePieceByCellName('b6', 'c2');
    }).toThrowError();
  });
});
