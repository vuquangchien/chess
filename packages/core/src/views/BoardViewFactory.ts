import {Board} from '../models/Board';
import {BoardViewController} from './BoardViewController';
import {BoardView} from './BoardView';

export class BoardViewFactory {
  public static fromBoard(board: Board): BoardView {
    return new BoardView(new BoardViewController(board));
  }
}
