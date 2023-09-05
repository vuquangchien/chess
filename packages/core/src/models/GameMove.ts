import {Move} from './moves/Move';
import {Board} from './Board';

export class GameMove {
  public startBoard: Board;
  public endBoard: Board;
  public move: Move;

  constructor(startBoard: Board, endBoard: Board, move: Move) {
    this.startBoard = startBoard;
    this.endBoard = endBoard;
    this.move = move;
  }
}
