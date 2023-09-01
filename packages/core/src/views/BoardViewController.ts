import {Board} from '../models/Board';

export class BoardViewController {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  public getBoard(): Board {
    return this.board;
  }
}
