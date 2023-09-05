import {BoardFactory} from '../BoardFactory';
import {Board} from '../Board';
import {PieceColors} from '../Piece';

describe('WhiteMoveFirstPolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createBoardWithPieces();
    board.setCurrentPlayer(PieceColors.BLACK);
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
