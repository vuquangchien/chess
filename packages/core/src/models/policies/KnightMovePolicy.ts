import {MovePolicy} from './MovePolicy';
import {Move} from '../moves/Move';
import {PieceTypes} from '../Piece';

export class KnightMovePolicy implements MovePolicy {
  isMoveValid(move: Move): string | null {
    const piece = move.from.piece;
    if (piece!.type !== PieceTypes.KNIGHT) {
      return null;
    }
    if (!move.isKnightMove()) {
      return 'Knight cannot move like this';
    }
    return null;
  }
}
