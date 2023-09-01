import {Board} from './Board';
import {Cell} from './Cell';
import {Rank} from './Rank';

export class RankIterator {
  private board: Board;
  private index: number;

  constructor(board: Board) {
    this.board = board;
    this.index = -1;
  }

  hasNext(): boolean {
    return this.index < 7;
  }

  currentIndex(): number {
    return this.index;
  }

  next(): Rank {
    this.index++;
    return this.current();
  }

  private current(): Rank {
    return this.board.getRanks()[this.index];
  }
}
export class CellIterator {
  private cells: Cell[];
  private index: number;

  constructor(cells: Cell[]) {
    this.cells = cells;
    this.index = -1;
  }

  hasNext(): boolean {
    return this.index < this.cells.length - 1;
  }

  next(): Cell {
    this.index++;
    return this.current();
  }

  private current(): Cell {
    return this.cells[this.index];
  }
}
