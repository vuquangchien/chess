import {Cell} from './Cell';
import {CellIterator} from './CellIterator';

export class File {
  cells: Cell[];

  constructor(cells: Cell[]) {
    this.cells = cells;
  }

  public getCellIterator(): CellIterator {
    return new CellIterator(this.cells);
  }
}
