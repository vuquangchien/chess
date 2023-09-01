import {Board} from '../Board';
// @ts-ignore
import {expect} from '@jest/globals';
import {BoardFactory} from '../BoardFactory';
import {BoardView} from '../../views/BoardView';
import {BoardViewController} from '../../views/BoardViewController';
import {BoardViewFactory} from '../../views/BoardViewFactory';

describe('policies', () => {
  it('not allow to move empty piece', () => {
    const board = new Board();
    expect(() => {
      board.movePieceByCellName('a5', 'a4');
    }).toThrowError();
  });
  it('not allow to move piece to the same cell', () => {
    const board = BoardFactory.createBoardWithPieces();
    expect(() => {
      board.movePieceByCellName('a7', 'a7');
    }).toThrowError();
  });
  it('not allow to move piece to the cell with the same color', () => {
    const board = BoardFactory.createBoardWithPieces();
    console.log(new BoardView(new BoardViewController(board)).render());
    expect(() => {
      board.movePieceByCellName('a8', 'a7');
    }).toThrowError();
  });
  it('not allow to white or black to move twice in a row', () => {
    const board = BoardFactory.createBoardWithPieces();
    expect(() => {
      board.movePieceByCellName('a7', 'a6');
      board.movePieceByCellName('a6', 'a5');
    }).toThrowError();
  });
  it('should allow to take', () => {
    const board = BoardFactory.createFromFen(
      'rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq e6 0 1'
    );
    console.log(BoardViewFactory.fromBoard(board).render());
    expect(() => {
      board.movePieceByCellName('d5', 'e4');
    }).not.toThrowError();
  });
});
