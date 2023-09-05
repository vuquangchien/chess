import {NumberIterator} from '../helpers/NumberIterator';
import {Cell} from '../Cell';
import {Move} from './Move';

export class HorizontalMove extends Move {
  cellsBetween(): string[] {
    const rank = this.from.rowIndex;
    const files = [];
    const it = NumberIterator.createIterator(
      this.from.colIndex,
      this.to.colIndex,
      {
        excludeFrom: true,
        excludeTo: true,
      }
    );
    while (it.hasNext()) {
      files.push(it.next());
    }
    return files.map(file => new Cell(file, rank, null).name);
  }
}
