import {BoardFactory} from './BoardFactory';
import {BoardViewFactory} from '../views/BoardViewFactory';
// @ts-ignore
import {expect} from '@jest/globals';

describe('BoardFactory', () => {
  it('should create empty board', () => {
    const board = BoardFactory.createEmptyBoard();
    const render = BoardViewFactory.fromBoard(board).render();
    expect(render).toMatchSnapshot();
  });
  it('should create board from fen', () => {
    const board = BoardFactory.createFromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'
    );
    const render = BoardViewFactory.fromBoard(board).render();
    expect(render).toMatchSnapshot();
  });
  it('should create board with pieces', () => {
    const board = BoardFactory.createBoardWithPieces();
    const render = BoardViewFactory.fromBoard(board).render();
    expect(render).toMatchSnapshot();
  });
});
