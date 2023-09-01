import {MovePolicy} from './MovePolicy';
import {Move} from '../Move';
import * as _ from 'lodash';
import {Board} from '../Board';

export class SamePlayerNotMoveTwicePolicy implements MovePolicy {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  public isMoveValid(move: Move): string | null {
    const lastMove = _.last(this.board.moves);
    if (lastMove) {
      if (lastMove.player === move.player) {
        return 'Same player cannot move twice';
      }
    }
    return null;
  }
}
