import {BoardFactory} from '../BoardFactory';
import {Board} from '../Board';

describe('WhiteMoveFirstPolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createBoardWithPieces();
  });
  it('should allow white to move first', () => {
    expect(() => {
      board.movePieceByCellName('a2', 'a3');
    }).toThrowError();
  });
  it('should not allow black to move first', () => {
    expect(() => {
      board.movePieceByCellName('a7', 'a6');
    }).not.toThrowError();
  });
});
