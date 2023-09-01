import {IViewController} from '../framework/IViewController';
import {Cell} from '../models/Cell';

export class CellViewController implements IViewController {
  public cell: Cell;

  constructor(cell: Cell) {
    this.cell = cell;
  }
}
