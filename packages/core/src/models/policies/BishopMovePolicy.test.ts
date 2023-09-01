import {BoardFactory} from '../BoardFactory';
import {BoardView} from '../../views/BoardView';
import {BoardViewController} from '../../views/BoardViewController';
import {Piece} from '../Piece';

describe('BishopMovePolicy', () => {
  it('should allow to move diagonally', () => {
    const board = BoardFactory.createBoardWithPieces();
    board.movePieceByCellName('d7', 'd5');
    board.movePieceByCellName('a2', 'a4');
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
});
