import {Board} from './Board';
// @ts-ignore
import {expect} from '@jest/globals';
import {BoardFactory} from './BoardFactory';
import {BoardView} from '../views/BoardView';
import {BoardViewController} from '../views/BoardViewController';
import {Piece, PieceColors, PieceTypes} from './Piece';
import {BoardViewFactory} from '../views/BoardViewFactory';

describe('Board', () => {
  let board: Board;
  beforeEach(() => {
    board = BoardFactory.createBoardWithPieces();
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
    expect(firstCell.rank).toEqual(7);
    expect(firstCell.file).toEqual(0);
    const lastCell = board.cells[7][7];
    expect(lastCell.rank).toEqual(0);
    expect(lastCell.file).toEqual(7);
    expect(firstCell.name).toEqual('a8');
    expect(board.cells[7][7].name).toEqual('h1');
  });
  it.failing('should get files', () => {
    const board = new Board();
    const files = board.getFiles();
    expect(files.length).toEqual(8);
    expect(files[0].cells[0].name).toEqual('a8');
    expect(files[0].cells[7].name).toEqual('a1');
  });
  it('should get ranks', () => {
    const ranks = new Board().getRanks();
    expect(ranks.length).toEqual(8);
    const firstRank = ranks[0];
    expect(firstRank.cells[0].name).toEqual('a8');
    expect(firstRank.cells[7].name).toEqual('h8');
  });
  it('should iterate cells', () => {
    const board = new Board();
    const it = board.getRankIterator();
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
    const cell = board.getCell(0, 1);
    expect(cell.name).toEqual('a7');
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
    const cell = board.getCell(0, 1);
    expect(cell.piece).toBeDefined();
    expect(cell.piece!.isPieceMoved()).toBeFalsy();
    board.movePiece(cell, board.getByCellName('a6'));
    expect(board.getByCellName('a6').piece!.isPieceMoved()).toBeTruthy();
  });
  // highlight tests
  describe('highlight', () => {
    // highlight cell
    it('should highlight cell', () => {
      const board = BoardFactory.createBoardWithPieces();
      const cell = board.getCell(0, 1);
      board.highlightCell(cell);
      expect(cell.isHighlighted()).toBeTruthy();
    });
    // unhighlight cell
    it('should unhighlight cell', () => {
      const board = BoardFactory.createBoardWithPieces();
      const cell = board.getCell(0, 1);
      board.highlightCell(cell);
      board.unHighlightCell(cell);
      expect(cell.isHighlighted()).toBeFalsy();
    });
    // reset highlight
    it('should reset highlight', () => {
      const board = BoardFactory.createBoardWithPieces();
      const cell = board.getCell(0, 1);
      board.highlightCell(cell);
      board.resetHighlight();
      expect(cell.isHighlighted()).toBeFalsy();
    });
  });

  describe('getPossibleMoves', () => {
    // king
    describe('king', () => {
      it('should get possible moves for king', () => {
        const board = new Board();
        const king = Piece.fromName('k');
        const cell = board.getByCellName('d4');
        cell.setPiece(king);
        board.highlightPossibleMoves(cell);
        const view = BoardViewFactory.fromBoard(board).render();
        expect(view).toMatchSnapshot();
        const possibleMoves = board.getPossibleMoves(cell);

        expect(possibleMoves.length).toEqual(8);
      });
    });
  });
  // queen
  describe('queen', () => {
    it('should get possible moves for queen', () => {
      const board = new Board();
      const queen = Piece.fromName('q');
      const cell = board.getByCellName('d4');
      cell.setPiece(queen);
      board.highlightPossibleMoves(cell);
      const view = BoardViewFactory.fromBoard(board).render();
      expect(view).toMatchSnapshot();
      const possibleMoves = board.getPossibleMoves(cell);

      expect(possibleMoves.length).toEqual(27);
    });
  });
  // rook
  describe('rook', () => {
    it('should get possible moves for rook', () => {
      const board = new Board();
      const rook = Piece.fromName('r');
      const cell = board.getByCellName('d4');
      cell.setPiece(rook);
      board.highlightPossibleMoves(cell);
      const view = BoardViewFactory.fromBoard(board).render();
      expect(view).toMatchSnapshot();
      const possibleMoves = board.getPossibleMoves(cell);

      expect(possibleMoves.length).toEqual(14);
    });
  });
  // bishop
  describe('bishop', () => {
    it('should get possible moves for bishop', () => {
      const board = new Board();
      const bishop = Piece.fromName('b');
      const cell = board.getByCellName('d4');
      cell.setPiece(bishop);
      board.highlightPossibleMoves(cell);
      const view = BoardViewFactory.fromBoard(board).render();
      expect(view).toMatchSnapshot();
      const possibleMoves = board.getPossibleMoves(cell);

      expect(possibleMoves.length).toEqual(13);
    });
  });
  // knight
  describe('knight', () => {
    it('should get possible moves for knight', () => {
      const board = new Board();
      const knight = Piece.fromName('n');
      const cell = board.getByCellName('d4');
      cell.setPiece(knight);
      board.highlightPossibleMoves(cell);
      const view = BoardViewFactory.fromBoard(board).render();
      expect(view).toMatchSnapshot();
      const possibleMoves = board.getPossibleMoves(cell);

      expect(possibleMoves.length).toEqual(8);
    });
  });
  // pawn
  describe('pawn', () => {
    it('should get possible moves for pawn', () => {
      const board = new Board();
      const pawn = Piece.fromName('p');
      pawn.setPieceMoved();
      const cell = board.getByCellName('d4');
      cell.setPiece(pawn);
      board.highlightPossibleMoves(cell);
      const view = BoardViewFactory.fromBoard(board).render();
      expect(view).toMatchSnapshot();
      const possibleMoves = board.getPossibleMoves(cell);

      expect(possibleMoves.length).toEqual(1);
    });
    // pawn first move
    it('should get possible moves for pawn on first move', () => {
      const board = new Board();
      const pawn = Piece.fromName('p');
      const cell = board.getByCellName('d7');
      cell.setPiece(pawn);
      board.highlightPossibleMoves(cell);
      const view = BoardViewFactory.fromBoard(board).render();
      expect(view).toMatchSnapshot();
      const possibleMoves = board.getPossibleMoves(cell);
      expect(possibleMoves.length).toEqual(2);
    });
  });
});
