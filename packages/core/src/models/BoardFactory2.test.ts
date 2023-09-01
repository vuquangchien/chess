// @ts-ignore
import {expect} from '@jest/globals';
import {BoardFactory} from './BoardFactory';
import {BoardView} from '../views/BoardView';
import {BoardViewController} from '../views/BoardViewController';

describe('BoardFactory', () => {
  it('should create empty board', () => {
    const board = BoardFactory.createEmptyBoard();
    expect(board).toBeDefined();
    const controller = new BoardViewController(board);
    const view = new BoardView(controller);
    const content = view.render();
    expect(content).toMatchSnapshot();
  });
  it('should create board with pieces', () => {
    const board = BoardFactory.createBoardWithPieces();
    expect(board).toBeDefined();
    const controller = new BoardViewController(board);
    const view = new BoardView(controller);
    const content = view.render();
    expect(content).toMatchSnapshot();
  });
});
