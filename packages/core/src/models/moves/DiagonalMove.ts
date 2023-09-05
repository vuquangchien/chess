import {NumberIterator} from '../helpers/NumberIterator';
import {Cell} from '../Cell';
import {Move} from './Move';

export class DiagonalMove extends Move {
  cellsBetween(): string[] {
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
    const ranks: number[] = [];
    const it2 = NumberIterator.createIterator(
      this.from.rowIndex,
      this.to.rowIndex,
      {
        excludeFrom: true,
        excludeTo: true,
      }
    );
    while (it2.hasNext()) {
      ranks.push(it2.next());
    }
    return files.map((file, index) => {
      return new Cell(file, ranks[index], null).name;
    });
  }
}
