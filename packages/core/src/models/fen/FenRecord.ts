import {FenName, Piece, PieceColors} from '../Piece';
import {Cell} from '../Cell';
import {PieceColor} from '../PieceColor';
import {CastlingAvailabilitySegment} from './CastlingAvailabilitySegment';
export function convertNumberToSpaces(number: number): string {
  return new Array(number).fill(' ').join('');
}
export function denormalizeRankNotation(fenRankNotation: string): string {
  let result = '';
  for (let i = 0; i < fenRankNotation.length; i++) {
    const char = fenRankNotation.charAt(i);
    if (isNaN(parseInt(char, 10))) {
      result += char;
    } else {
      const spaces = convertNumberToSpaces(parseInt(char, 10));
      result += spaces;
    }
  }
  return result;
}
export class PiecePlacementRank {
  public rankNotation: string;
  private rankIndex: number;
  constructor(rankNotation: string, rankIndex: number) {
    this.rankNotation = rankNotation;
    this.rankIndex = rankIndex;
  }

  getCells(): Cell[] {
    const denormalizedNotation = denormalizeRankNotation(
      this.rankNotation
    ).split('');
    const cells: Cell[] = [];
    for (
      let fileIndex = 0;
      fileIndex < denormalizedNotation.length;
      fileIndex++
    ) {
      const pieceName = <FenName>denormalizedNotation[fileIndex];
      const validPieceName = 'rnbqkpRNBQKP'.split('').includes(pieceName);
      const cell = new Cell(
        fileIndex,
        this.rankIndex,
        validPieceName ? Piece.fromName(pieceName) : null
      );
      cells.push(cell);
    }
    return cells;
  }
}
class PiecePlacementSegment {
  public piecePlacement: string;
  private ranks: PiecePlacementRank[];
  constructor(piecePlacement: string) {
    this.piecePlacement = piecePlacement;
    this.ranks = piecePlacement
      .split('/')
      .map(
        (rankNotation, rankIndex) =>
          new PiecePlacementRank(rankNotation, rankIndex)
      );
  }
  getCells(): Cell[] {
    return this.ranks.map(rank => rank.getCells()).flat();
  }
}

export class FenRecord {
  public notation: string;
  public piecePlacement: PiecePlacementSegment;
  public activeColor: PieceColor;
  public castlingAvailability: CastlingAvailabilitySegment;
  public enPassantTarget: Cell | null;
  public halfMoveClock: number;
  public fullMoveNumber: number;

  constructor(notation: string) {
    this.notation = notation;
    const [
      piecePlacement,
      activeColor,
      castlingAvailability,
      enPassantTarget,
      halfMoveClock,
      fullMoveNumber,
    ] = notation.split(' ');
    this.piecePlacement = new PiecePlacementSegment(piecePlacement);
    this.castlingAvailability = new CastlingAvailabilitySegment(
      castlingAvailability
    );
    this.activeColor =
      activeColor === 'w' ? PieceColors.WHITE : PieceColors.BLACK;
    this.enPassantTarget =
      enPassantTarget === '-' ? null : Cell.fromName(enPassantTarget);
    this.halfMoveClock = parseInt(halfMoveClock, 10);
    this.fullMoveNumber = parseInt(fullMoveNumber, 10);
  }
}
