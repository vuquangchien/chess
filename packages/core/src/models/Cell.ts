import {FenName, Piece} from './Piece';

export function getCharFromNumber(num: number): string {
  return String.fromCharCode('a'.charCodeAt(0) + num);
}

export function fileToColIndex(file: string): number {
  return file.charCodeAt(0) - 97;
}
export function rankToRowIndex(rank: string): number {
  return 8 - parseInt(rank, 10);
}
export class Cell {
  public colIndex: number;
  public rowIndex: number;
  public readonly color: string;
  public readonly name: string;
  private readonly cellIndex: number;
  private readonly rank: String;
  private readonly file: String;
  public piece: Piece | null;
  private highlighted = false;

  constructor(colIndex: number, rowIndex: number, piece: Piece | null) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.cellIndex = rowIndex * 8 + colIndex;
    this.piece = piece;
    this.color = (this.colIndex + this.rowIndex) % 2 === 1 ? 'white' : 'black';
    this.rank = (8 - this.rowIndex).toString();
    this.file = getCharFromNumber(this.colIndex);
    this.name = this.file + '' + this.rank;
  }
  static fromName(name: string, pieceName?: FenName): Cell {
    const [file, rank] = name.split('');
    const colIndex = fileToColIndex(file);
    const rowIndex = rankToRowIndex(rank);
    const piece = pieceName ? Piece.fromName(pieceName) : null;
    return new Cell(colIndex, rowIndex, piece);
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
  getCellIndex(): number {
    return this.rowIndex * 8 + this.colIndex;
  }
}
