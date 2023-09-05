import {NumberIterator} from '../helpers/NumberIterator';
import {Cell} from '../Cell';
import {Move} from './Move';

export class VerticalMove extends Move {
  cellsBetween(): string[] {
    const file = this.from.colIndex;
    const ranks = [];
    const it = NumberIterator.createIterator(
      this.from.rowIndex,
      this.to.rowIndex,
      {
        excludeFrom: true,
        excludeTo: true,
      }
    );
    while (it.hasNext()) {
      ranks.push(it.next());
    }
    return ranks.map(rank => new Cell(file, rank, null).name);
  }
}
