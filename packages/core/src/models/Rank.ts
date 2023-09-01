import {Cell} from './Cell';
import {CellIterator} from './CellIterator';

export class Rank {
  cells: Cell[];

  constructor(cells: Cell[]) {
    this.cells = cells;
  }

  public getIterator(): CellIterator {
    return new CellIterator(this.cells);
  }
}
