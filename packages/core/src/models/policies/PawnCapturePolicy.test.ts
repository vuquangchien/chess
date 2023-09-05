import {BoardFactory} from '../BoardFactory';
import {BoardViewFactory} from '../../views/BoardViewFactory';

describe('PawnCapturePolicy', () => {
  it('should allow capture pawn diagonally', () => {
    const fen = '7k/p7/1P6/7K/8/8/8/8 w - - 0 1';
    const board = BoardFactory.createFromFen(fen);
    console.log(BoardViewFactory.fromBoard(board).render());
    expect(() => {
      board.movePieceByCellName('b6', 'a7');
    }).not.toThrowError();
  });
});
