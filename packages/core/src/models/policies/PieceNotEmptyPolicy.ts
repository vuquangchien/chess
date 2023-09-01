import {MovePolicy} from './MovePolicy';
import {Move} from '../Move';

export class PieceNotEmptyPolicy implements MovePolicy {
  public isMoveValid(move: Move): string | null {
    const from = move.from;
    const to = move.to;
    if (from.piece === null) {
      return 'No piece to move';
    }
    if (to.piece !== null) {
      return 'Friendly piece already in destination';
    }
    return null;
  }
}
