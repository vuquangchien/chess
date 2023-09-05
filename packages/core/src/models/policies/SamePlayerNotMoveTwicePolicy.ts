import {MovePolicy} from './MovePolicy';
import {Move} from '../moves/Move';
import {Board} from '../Board';

export class SamePlayerNotMoveTwicePolicy implements MovePolicy {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  public isMoveValid(move: Move): string | null {
    if (this.board.getCurrentPlayer() !== move.player) {
      return 'It is not your turn';
    }
    return null;
  }
}
