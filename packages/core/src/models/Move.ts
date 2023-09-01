import {Cell} from './Cell';
import {PieceColor} from './PieceColor';
import {PieceColors} from './Piece';
import {NumberIterator} from './NumberIterator';

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
    return Math.abs(this.from.file - this.to.file);
  }
  public rankDistance(): number {
    return Math.abs(this.from.rank - this.to.rank);
  }

  public isDiagonal(): boolean {
    return this.fileDistance() === this.rankDistance();
  }
  public isVertical(): boolean {
    return this.from.file === this.to.file;
  }
  public isHorizontal(): boolean {
    return this.from.rank === this.to.rank;
  }
  public isKnightMove(): boolean {
    return (
      (this.fileDistance() === 2 && this.rankDistance() === 1) ||
      (this.fileDistance() === 1 && this.rankDistance() === 2)
    );
  }
  public isForward(): boolean {
    return (
      (this.player === PieceColors.WHITE && this.from.rank > this.to.rank) ||
      (this.player === PieceColors.BLACK && this.from.rank < this.to.rank)
    );
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
}

class VerticalMove extends Move {
  cellsBetween(): string[] {
    const file = this.from.file;
    const ranks = [];
    const it = NumberIterator.createIterator(this.from.rank, this.to.rank, {
      excludeFrom: true,
      excludeTo: true,
    });
    while (it.hasNext()) {
      ranks.push(it.next());
    }
    return ranks.map(rank => new Cell(file, rank, null).name);
  }
}

class HorizontalMove extends Move {
  cellsBetween(): string[] {
    const rank = this.from.rank;
    const files = [];
    const it = NumberIterator.createIterator(this.from.file, this.to.file, {
      excludeFrom: true,
      excludeTo: true,
    });
    while (it.hasNext()) {
      files.push(it.next());
    }
    return files.map(file => new Cell(file, rank, null).name);
  }
}
class DiagonalMove extends Move {
  cellsBetween(): string[] {
    const files = [];
    const it = NumberIterator.createIterator(this.from.file, this.to.file, {
      excludeFrom: true,
      excludeTo: true,
    });
    while (it.hasNext()) {
      files.push(it.next());
    }
    const ranks: number[] = [];
    const it2 = NumberIterator.createIterator(this.from.rank, this.to.rank, {
      excludeFrom: true,
      excludeTo: true,
    });
    while (it2.hasNext()) {
      ranks.push(it2.next());
    }
    return files.map((file, index) => {
      return new Cell(file, ranks[index], null).name;
    });
  }
}

export class MoveFactory {
  static createMove(from: Cell, to: Cell): Move {
    if (from.file === to.file) {
      return new VerticalMove(from, to);
    }
    if (from.rank === to.rank) {
      return new HorizontalMove(from, to);
    }
    if (Math.abs(from.file - to.file) === Math.abs(from.rank - to.rank)) {
      return new DiagonalMove(from, to);
    }
    return new Move(from, to);
  }
}
