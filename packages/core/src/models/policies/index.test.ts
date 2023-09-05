import {Board} from '../Board';
// @ts-ignore
import {expect} from '@jest/globals';
import {BoardFactory} from '../BoardFactory';
import {BoardView} from '../../views/BoardView';
import {BoardViewController} from '../../views/BoardViewController';
import {BoardViewFactory} from '../../views/BoardViewFactory';
import {Piece} from '../Piece';

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
      'rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR b KQkq e6 0 1'
    );
    console.log(BoardViewFactory.fromBoard(board).render());
    expect(() => {
      board.movePieceByCellName('e5', 'd4');
    }).not.toThrowError();
  });
  // highlight tests
  describe('highlight', () => {
    // highlight cell
    it('should highlight cell', () => {
      const board = BoardFactory.createBoardWithPieces();
      const cell = board.getByCellName('a8');
      cell.highlight();
      expect(cell.isHighlighted()).toBeTruthy();
    });
    // unhighlight cell
    it('should unhighlight cell', () => {
      const board = BoardFactory.createBoardWithPieces();
      const cell = board.getByCellName('a8');
      cell.highlight();
      cell.unHighlight();
      expect(cell.isHighlighted()).toBeFalsy();
    });
    // reset highlight
    it('should reset highlight', () => {
      const board = BoardFactory.createBoardWithPieces();
      const cell = board.getByCellName('a8');
      cell.highlight();
      board.resetHighlight();
      expect(cell.isHighlighted()).toBeFalsy();
    });
  });

  describe('getPossibleMoves', () => {
    // king
    describe('king', () => {
      it('should get possible moves for king', () => {
        const board = new Board();
        const king = Piece.fromName('K');
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
      const queen = Piece.fromName('Q');
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
      const rook = Piece.fromName('R');
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
      const bishop = Piece.fromName('B');
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
      const knight = Piece.fromName('N');
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
      const pawn = Piece.fromName('P');
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
      const pawn = Piece.fromName('P');
      const cell = board.getByCellName('d2');
      cell.setPiece(pawn);
      board.highlightPossibleMoves(cell);
      const view = BoardViewFactory.fromBoard(board).render();
      expect(view).toMatchSnapshot();
      const possibleMoves = board.getPossibleMoves(cell);
      expect(possibleMoves.length).toEqual(2);
    });
  });
});
