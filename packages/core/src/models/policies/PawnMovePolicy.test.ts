// @ts-ignore
import {expect} from '@jest/globals';
import {BoardView} from '../../views/BoardView';
import {BoardViewController} from '../../views/BoardViewController';
import {BoardFactory} from '../BoardFactory';
import {Board} from '../Board';

describe('pawn', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createBoardWithPieces();
  });
  it('should not allow pawn to move diagonal', () => {
    expect(() => {
      board.movePieceByCellName('a7', 'b6');
    }).toThrowError();
  });
  it('should not allow pawn to move more than 1 square on other ranks', () => {
    expect(() => {
      board.movePieceByCellName('a6', 'a4');
    }).toThrowError();
  });
  it('should allow pawn to move more than 1 square on first rank', () => {
    console.log(new BoardView(new BoardViewController(board)).render());

    expect(() => {
      board.movePieceByCellName('a7', 'a5');
    }).not.toThrowError();
  });
  it('should allow pawn to move 1 square on first rank', () => {
    expect(() => {
      board.movePieceByCellName('a7', 'a6');
    }).not.toThrowError();
  });
  it('should not allow pawn to move 2 square on other ranks', () => {
    board.movePieceByCellName('a7', 'a5');
    expect(() => {
      board.movePieceByCellName('a5', 'a3');
    }).toThrowError();
  });
});
