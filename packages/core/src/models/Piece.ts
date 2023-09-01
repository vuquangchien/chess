import {PieceColor} from './PieceColor';
import {PieceType} from './PieceType';
export type FenName =
  | 'p'
  | 'r'
  | 'n'
  | 'b'
  | 'q'
  | 'k'
  | 'P'
  | 'R'
  | 'N'
  | 'B'
  | 'Q'
  | 'K';
export const PieceTypes: {[key: string]: PieceType} = {
  PAWN: 'pawn',
  ROOK: 'rook',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  QUEEN: 'queen',
  KING: 'king',
};
export const PieceColors: {[key: string]: PieceColor} = {
  WHITE: 'white',
  BLACK: 'black',
};
export class Piece {
  public color: PieceColor;
  public type: PieceType;
  private isMoved = false;

  constructor(type: PieceType, color: PieceColor) {
    this.color = color;
    this.type = type;
  }

  static fromName(name: FenName): Piece {
    const color =
      name === name.toUpperCase() ? PieceColors.WHITE : PieceColors.BLACK;
    const type = name.toLowerCase();
    const pieceType = {
      p: PieceTypes.PAWN,
      r: PieceTypes.ROOK,
      n: PieceTypes.KNIGHT,
      b: PieceTypes.BISHOP,
      q: PieceTypes.QUEEN,
      k: PieceTypes.KING,
    }[type];
    if (!pieceType) throw new Error(`Unknown piece type: ${type}`);
    return new Piece(pieceType, color);
  }

  public getColor(): PieceColor {
    return this.color;
  }

  public isPieceMoved(): boolean {
    return this.isMoved;
  }
  public setPieceMoved(): void {
    this.isMoved = true;
  }
  public getType(): PieceType {
    return this.type;
  }
  public getIcon(): string {
    const icons = {
      rook: {
        white: '♖',
        black: '♜',
      },
      knight: {
        white: '♘',
        black: '♞',
      },
      bishop: {
        white: '♗',
        black: '♝',
      },
      queen: {
        white: '♕',
        black: '♛',
      },
      king: {
        white: '♔',
        black: '♚',
      },
      pawn: {
        white: '♙',
        black: '♟',
      },
    };
    return icons[this.type][this.color];
  }
}
