import {BoardFactory} from './BoardFactory';
import {BoardViewFactory} from '../views/BoardViewFactory';
// @ts-ignore
import {expect} from '@jest/globals';
import {BoardViewController} from '../views/BoardViewController';
import {BoardView} from '../views/BoardView';
import {PieceColors} from './Piece';

describe('BoardFactory', () => {
  it('should create board from fen', () => {
    const board = BoardFactory.createFromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'
    );
    const render = BoardViewFactory.fromBoard(board).render();
    expect(render).toMatchSnapshot();
    expect(board.getCurrentPlayer()).toBe(PieceColors.WHITE);
    expect(board.getByCellName('a1').piece?.type).toBe('rook');
    expect(board.getByCellName('a1').piece?.color).toBe('white');
    expect(board.getByCellName('a8').piece?.type).toBe('rook');
  });
  it('should create board from fen', () => {
    const board = BoardFactory.createFromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b - - 0 1'
    );
    expect(board.getCurrentPlayer()).toBe(PieceColors.BLACK);
  });
  it('should create board with pieces', () => {
    const board = BoardFactory.createBoardWithPieces();
    const render = BoardViewFactory.fromBoard(board).render();
    expect(render).toMatchSnapshot();
  });
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
