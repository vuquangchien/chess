import {Board} from './Board';
// @ts-ignore
import {beforeEach, expect} from '@jest/globals';
import {BoardFactory} from './BoardFactory';
import {BoardView} from '../views/BoardView';
import {BoardViewController} from '../views/BoardViewController';
import {Piece, PieceColors, PieceTypes} from './Piece';
import {RankIterator} from './CellIterator';
import {BoardViewFactory} from '../views/BoardViewFactory';

describe('Board', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createBoardWithPieces();
  });
  it('should create empty board correctly', () => {
    const board = BoardFactory.createEmptyBoard();
    const cells = board.cells;
    expect(cells[0][0].name).toEqual('a8');
    expect(cells[0][7].name).toEqual('h8');
    expect(cells[7][0].name).toEqual('a1');
    expect(cells[7][7].name).toEqual('h1');
    expect(cells[0][0].getCellIndex()).toEqual(0);
    expect(cells[0][7].getCellIndex()).toEqual(7);
    expect(cells[7][0].getCellIndex()).toEqual(56);
    expect(cells[7][7].getCellIndex()).toEqual(63);
  });
  it('should set piece', () => {
    const board = new Board();
    const piece = new Piece(PieceTypes.ROOK, PieceColors.WHITE);
    board.cells[0][0].setPiece(piece);
    const cell = board.cells[0][0];
    expect(cell.piece).toEqual(piece);
  });

  it('should create new board', () => {
    const board = new Board();
    expect(board).toBeDefined();
    expect(board.cells.length).toEqual(8);
    const firstCell = board.cells[0][0];
    const lastCell = board.cells[7][7];
    expect(firstCell.name).toEqual('a8');
    expect(lastCell.name).toEqual('h1');
  });
  it('should get ranks', () => {
    const ranks = new RankIterator(new Board()).ranks;
    expect(ranks.length).toEqual(8);
    const firstRank = ranks[0];
    expect(firstRank.cells[0].name).toEqual('a8');
    expect(firstRank.cells[7].name).toEqual('h8');
  });
  it('should iterate cells', () => {
    const board = new Board();
    const it = new RankIterator(board);
    while (it.hasNext()) {
      const rank = it.next();
      const cellIterator = rank.getIterator();
      while (cellIterator.hasNext()) {
        const cell = cellIterator.next();
        expect(cell).toBeDefined();
      }
    }
  });
  it('should allow get by cell name', () => {
    const board = new Board();
    const cell = board.getByCellName('a8');
    expect(cell.name).toEqual('a8');
  });
  it('should allow to move piece', () => {
    const board = BoardFactory.createBoardWithPieces();
    board.setCurrentPlayer(PieceColors.BLACK);
    const cell = board.getByCellName('a7');
    board.movePiece(cell, board.getByCellName('a6'));
    expect(cell.piece).toBeNull();
    expect(board.getByCellName('a6').piece).toBeDefined();
    expect(board.moves.length).toEqual(1);
    expect(board.moves[0].from.name).toEqual('a7');
    expect(board.moves[0].to.name).toEqual('a6');
    expect(board.moves[0].player).toEqual(PieceColors.BLACK);

    expect(
      new BoardView(new BoardViewController(board)).render()
    ).toMatchSnapshot();
  });
  it('should mark piece as moved', () => {
    const board = BoardFactory.createBoardWithPieces();
    const cell = board.getByCellName('a2');
    expect(cell.piece).toBeDefined();
    expect(cell.piece!.isPieceMoved()).toBeFalsy();
    board.movePiece(cell, board.getByCellName('a3'));
    expect(board.getByCellName('a3').piece!.isPieceMoved()).toBeTruthy();
  });
  it('should flip current player after move', () => {
    const board = BoardFactory.createBoardWithPieces();
    expect(board.getCurrentPlayer()).toEqual(PieceColors.WHITE);
    board.movePieceByCellName('a2', 'a3');
    expect(board.getCurrentPlayer()).toEqual(PieceColors.BLACK);
  });
  it('should clone board', () => {
    const board = BoardFactory.createBoardWithPieces();
    const clone = board.clone();
    board.movePieceByCellName('b1', 'c3');
    expect(clone.getByCellName('b1').piece).toBeDefined();
    expect(BoardViewFactory.fromBoard(clone).render()).not.toEqual(
      BoardViewFactory.fromBoard(board).render()
    );
  });
});
