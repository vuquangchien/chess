import {CellView} from './CellView';
import {CellViewController} from './CellViewController';

import {BoardViewController} from './BoardViewController';
import {RowEl, TextEl} from './RowEl';
import {AbstractView} from './AbstractView';

export class BoardView extends AbstractView<BoardViewController> {
  public init(): void {
    this.addChild(new RowEl());
    const headerRow = new RowEl();
    headerRow.addChildren(
      '   a b c d e f g h'
        .split(' ')
        .map(el => new TextEl({text: el + '', row: 0, column: 0}))
    );
    this.addChild(headerRow);
    const board = this.controller.getBoard();
    const iterator = board.getRankIterator();
    while (iterator.hasNext()) {
      const row = new RowEl();
      row.addChild(new TextEl({text: `${7 - iterator.currentIndex()} `}));
      const rank = iterator.next();
      const it = rank.getIterator();
      while (it.hasNext()) {
        const cell = it.next();
        const vc = new CellViewController(cell);
        const cellView = new CellView(vc);
        row.addChild(cellView);
      }
      this.addChild(row);
    }
  }

  public render(): string {
    return this.renderChildren();
  }
}
