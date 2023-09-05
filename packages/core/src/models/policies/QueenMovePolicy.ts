import {MovePolicy} from './MovePolicy';
import {Move} from '../moves/Move';
import {PieceTypes} from '../Piece';

export class QueenMovePolicy implements MovePolicy {
  isMoveValid(move: Move): string | null {
    const piece = move.from.piece;
    if (piece!.type !== PieceTypes.QUEEN) {
      return null;
    }
    if (!move.isDiagonal() && !move.isVertical() && !move.isHorizontal()) {
      return 'Queen cannot move like this';
    }
    return null;
  }
}
