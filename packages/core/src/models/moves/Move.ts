import {Cell} from '../Cell';
import {PieceColor} from '../PieceColor';
import {PieceColors} from '../Piece';

export class Move {
  public from: Cell;
  public to: Cell;
  public player: PieceColor | undefined;

  constructor(from: Cell, to: Cell) {
    this.from = from;
    this.to = to;
    this.player = from.piece?.getColor();
  }
  public fileDistance(): number {
    return Math.abs(this.from.colIndex - this.to.colIndex);
  }
  public rankDistance(): number {
    return Math.abs(this.from.rowIndex - this.to.rowIndex);
  }

  public isDiagonal(): boolean {
    return this.fileDistance() === this.rankDistance();
  }
  public isVertical(): boolean {
    return this.from.colIndex === this.to.colIndex;
  }
  public isHorizontal(): boolean {
    return this.from.rowIndex === this.to.rowIndex;
  }
  public isKnightMove(): boolean {
    return (
      (this.fileDistance() === 2 && this.rankDistance() === 1) ||
      (this.fileDistance() === 1 && this.rankDistance() === 2)
    );
  }
  public isForward(): boolean {
    return (
      (this.player === PieceColors.WHITE &&
        this.from.rowIndex > this.to.rowIndex) ||
      (this.player === PieceColors.BLACK &&
        this.from.rowIndex < this.to.rowIndex)
    );
  }
  public isStraight(): boolean {
    return this.isVertical() || this.isHorizontal();
  }
  public isSimpleMove(): boolean {
    return this.to.piece === null;
  }
  public isCaptureMove(): boolean {
    return this.to.piece !== null;
  }
  cellsBetween(): string[] {
    if (this.isKnightMove()) {
      return [];
    }
    return [];
  }
  toString(): string {
    return `${this.from.piece?.color}:${this.from.name} -> ${this.to.name}`;
  }
}
