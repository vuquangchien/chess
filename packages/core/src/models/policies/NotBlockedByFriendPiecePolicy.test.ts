// @ts-ignore
import {describe} from '@jest/globals';
import {BoardFactory} from '../BoardFactory';

describe('NotBlockedByFriendPiecePolicy', () => {
  it('should not allow to move pass friendly piece', () => {
    const board = BoardFactory.createBoardWithPieces();
    expect(() => {
      board.movePieceByCellName('a1', 'a5');
    }).toThrowError();
  });
  // knight should be allowed to jump over other pieces
  it('should allow knight to jump over other pieces', () => {
    const board = BoardFactory.createBoardWithPieces();
    expect(() => {
      board.movePieceByCellName('b8', 'a6');
    }).not.toThrowError();
  });
});
