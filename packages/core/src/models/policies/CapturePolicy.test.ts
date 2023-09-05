import {BoardFactory} from '../BoardFactory';

describe('CapturePolicy', () => {
  it('should not allow to capture over head of other pieces', () => {
    const board = BoardFactory.createFromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    expect(() => {
      board.movePieceByCellName('d8', 'd2');
    }).toThrowError();
  });
});
