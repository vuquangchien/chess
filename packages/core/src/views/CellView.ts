import {CellViewController} from './CellViewController';
import {IEngine} from './IEngine';
import {EngineFactory} from './EngineFactory';
import {AbstractView} from './AbstractView';

const Icons = {
  rook: {
    white: '♖',
    black: '♜',
  },
  knight: {
    white: '♘',
    black: '♞',
  },
  bishop: {
    white: '♗',
    black: '♝',
  },
  queen: {
    white: '♕',
    black: '♛',
  },
  king: {
    white: '♔',
    black: '♚',
  },
  pawn: {
    white: '♙',
    black: '♟',
  },
};
export class CellView extends AbstractView<CellViewController> {
  controller: CellViewController;
  engine: IEngine;

  constructor(controller: CellViewController) {
    super(controller);
    this.controller = controller;
    this.engine = EngineFactory.createEngine('ascii');
  }

  render(): string {
    const cell = this.controller.cell;
    let result = '';
    const piece = cell.getPiece();
    const background = cell.color === 'black' ? '#D18B47' : '#FFCE9E';
    const icon = piece ? Icons[piece.getType()][piece.getColor()] : ' ';
    result = this.engine.renderBox({
      column: cell.colIndex,
      row: cell.rowIndex,
      background,
      text: icon,
    });

    // if (piece === null) {
    //   if (!cell.isHighlighted()) {
    //     result = this.engine.renderBox({
    //       column: cell.file,
    //       row: cell.rank,
    //       background,
    //       text: ' ',
    //     });
    //   } else {
    //     result = '× ';
    //   }
    // } else {
    //   const icon = Icons[piece.getType()][piece.getColor()];
    //   if (cell.isHighlighted()) {
    //     result = '×' + icon;
    //   } else result = icon + ' ';
    // }
    return result;
  }
}
