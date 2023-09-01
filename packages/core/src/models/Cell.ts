import {FenName, Piece} from './Piece';

function getCharFromNumber(num: number): string {
  return String.fromCharCode('a'.charCodeAt(0) + num);
}
export class Cell {
  public file: number;
  public rank: number;
  public piece: Piece | null;
  public color: string;
  public name: string;
  private highlighted = false;

  constructor(file: number, rank: number, piece: Piece | null) {
    this.file = file;
    this.rank = rank;
    this.piece = piece;
    this.color = (this.file + this.rank) % 2 === 1 ? 'white' : 'black';
    this.name = getCharFromNumber(this.file) + (this.rank + 1);
  }
  static fromName(name: string, pieceName?: FenName): Cell {
    const file = name.charCodeAt(0) - 97;
    const rank = parseInt(name.charAt(1), 10) - 1;
    return new Cell(file, rank, pieceName ? Piece.fromName(pieceName) : null);
  }
  public getPiece(): Piece | null {
    return this.piece;
  }

  setPiece(piece: Piece | null) {
    this.piece = piece;
  }

  highlight() {
    this.highlighted = true;
  }

  isHighlighted() {
    return this.highlighted;
  }

  unHighlight() {
    this.highlighted = false;
  }
}
