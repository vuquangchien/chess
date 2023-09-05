// @ts-ignore
import {expect} from '@jest/globals';
import {PgnMove} from './PgnMove';
import {PieceTypes} from '../Piece';

describe('PgnMove', () => {
  it('should parse pawn move', () => {
    const move = PgnMove.fromPgn('e4');
    expect(move.piece).toEqual(PieceTypes.PAWN);
    expect(move.toCellName).toEqual('e4');
  });
  it('should parse pawn move with capture', () => {
    const move = PgnMove.fromPgn('exd4');
    expect(move.piece).toEqual(PieceTypes.PAWN);
    expect(move.toCellName).toEqual('d4');
    expect(move.isCapture).toBeTruthy();
  });
  it('should parse pawn move with check', () => {
    const move = PgnMove.fromPgn('e4+');
    expect(move.piece).toEqual(PieceTypes.PAWN);
    expect(move.toCellName).toEqual('e4');
    expect(move.isCheck).toBeTruthy();
  });
  it('should parse pawn move with checkmate', () => {
    const move = PgnMove.fromPgn('e4#');
    expect(move.piece).toEqual(PieceTypes.PAWN);
    expect(move.toCellName).toEqual('e4');
    expect(move.isCheckmate).toBeTruthy();
  });
  it('should parse Rook move', () => {
    const move = PgnMove.fromPgn('Re1');
    expect(move.piece).toEqual(PieceTypes.ROOK);
    expect(move.toCellName).toEqual('e1');
  });
  it('should parse Rook move with capture', () => {
    const move = PgnMove.fromPgn('Rxe1');
    expect(move.piece).toEqual(PieceTypes.ROOK);
    expect(move.toCellName).toEqual('e1');
    expect(move.isCapture).toBeTruthy();
  });
  it('should parse castle', () => {
    const move = PgnMove.fromPgn('O-O');
    expect(move.isCastleKingSide).toBeTruthy();
  });
  it('should parse castle queen side', () => {
    const move = PgnMove.fromPgn('O-O-O');
    expect(move.isCastleQueenSide).toBeTruthy();
  });
  it('should parse pawn capture', () => {
    const move = PgnMove.fromPgn('exd4');
    expect(move.piece).toEqual(PieceTypes.PAWN);
    expect(move.toCellName).toEqual('d4');
    expect(move.isCapture).toBeTruthy();
    expect(move.fromFileName).toEqual('e');
  });
  it('should parse pawn promotion', () => {
    const move = PgnMove.fromPgn('e8=Q');
    expect(move.piece).toEqual(PieceTypes.PAWN);
    expect(move.toCellName).toEqual('e8');
    expect(move.isPromotion).toBeTruthy();
    expect(move.promotionPiece).toEqual(PieceTypes.QUEEN);
  });
  it('should parse pawn promotion with capture', () => {
    const move = PgnMove.fromPgn('exd8=Q');
    expect(move.piece).toEqual(PieceTypes.PAWN);
    expect(move.toCellName).toEqual('d8');
    expect(move.isPromotion).toBeTruthy();
    expect(move.promotionPiece).toEqual(PieceTypes.QUEEN);
    expect(move.isCapture).toBeTruthy();
    expect(move.fromFileName).toEqual('e');
  });
  it('should parse pawn promotion with capture and check', () => {
    const move = PgnMove.fromPgn('exd8=Q+');
    expect(move.piece).toEqual(PieceTypes.PAWN);
    expect(move.toCellName).toEqual('d8');
    expect(move.isPromotion).toBeTruthy();
    expect(move.promotionPiece).toEqual(PieceTypes.QUEEN);
    expect(move.isCapture).toBeTruthy();
    expect(move.isCheck).toBeTruthy();
    expect(move.fromFileName).toEqual('e');
  });
});
