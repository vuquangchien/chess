// @ts-ignore
import {beforeEach, describe} from '@jest/globals';
import {BoardFactory} from '../BoardFactory';
import {PieceColors} from '../Piece';
import {Board} from '../Board';

describe('NotBlockedByFriendPiecePolicy', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createBoardWithPieces();
    board.setCurrentPlayer(PieceColors.BLACK);
  });
  it('should not allow to move pass friendly piece', () => {
    expect(() => {
      board.movePieceByCellName('a1', 'a5');
    }).toThrowError();
  });
  // knight should be allowed to jump over other pieces
  it('should allow knight to jump over other pieces', () => {
    expect(() => {
      board.movePieceByCellName('b8', 'a6');
    }).not.toThrowError();
  });
});
