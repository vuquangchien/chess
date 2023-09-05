import {MovePolicy} from './MovePolicy';
import {Move} from '../moves/Move';
import {PieceTypes} from '../Piece';

export class RookMovePolicy implements MovePolicy {
  isMoveValid(move: Move): string | null {
    const piece = move.from.piece;
    if (piece!.type !== PieceTypes.ROOK) {
      return null;
    }
    if (!move.isVertical() && !move.isHorizontal()) {
      return 'Rook cannot move diagonally';
    }
    return null;
  }
}
