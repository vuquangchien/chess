import {
  convertNumberToSpaces,
  denormalizeRankNotation,
  FenRecord,
  PiecePlacementRank,
} from './FenRecord';
// @ts-ignore
import {expect} from '@jest/globals';

describe('FenNotation', () => {
  it('should parse fen notation', () => {
    const fen = new FenRecord(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    expect(fen.halfMoveClock).toBe(0);
    expect(fen.fullMoveNumber).toBe(1);
    expect(fen.activeColor).toBe('white');
    expect(fen.castlingAvailability.whiteKingSide).toBe(true);
    expect(fen.castlingAvailability.whiteQueenSide).toBe(true);
    expect(fen.castlingAvailability.blackKingSide).toBe(true);
    expect(fen.castlingAvailability.blackQueenSide).toBe(true);
    const firstCell = fen.piecePlacement.getCells()[0];
    expect(firstCell.name).toBe('a8');
    expect(firstCell.getPiece()?.type).toBe('rook');
    expect(firstCell.getPiece()?.getColor()).toBe('black');
    const lastCell = fen.piecePlacement.getCells()[63];
    expect(lastCell.name).toBe('h1');
    expect(lastCell.getPiece()?.type).toBe('rook');
    expect(lastCell.getPiece()?.getColor()).toBe('white');
  });
  it('should parse rank', () => {
    const rankNotation = 'rnbqkbnr';
    const rank = new PiecePlacementRank(rankNotation, 0);
    const cells = rank.getCells();
    expect(cells[0].name).toBe('a8');
    expect(cells[0].getPiece()?.type).toBe('rook');
    expect(cells[0].getPiece()?.getColor()).toBe('black');
  });
  // test convertNumberToSpaces
  it('should convert number to spaces', () => {
    expect(convertNumberToSpaces(4)).toBe('    ');
  });
  // test denormalizeRankNotation
  it('should denormalize rank notation', () => {
    expect(denormalizeRankNotation('4p3')).toBe('    p   ');
    expect(denormalizeRankNotation('8')).toBe('        ');
    expect(denormalizeRankNotation('rnbqkbnr')).toBe('rnbqkbnr');
  });
});
