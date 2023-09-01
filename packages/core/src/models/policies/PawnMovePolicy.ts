import {MovePolicy} from './MovePolicy';
import {Move} from '../Move';
import {PieceTypes} from '../Piece';

export class PawnMovePolicy implements MovePolicy {
  isMoveValid(move: Move): string | null {
    const piece = move.from.piece;
    if (piece?.type !== PieceTypes.PAWN) {
      return null;
    }
    if (!move.isVertical()) {
      return 'Pawn must move vertically';
    }
    if (!move.isForward()) {
      return 'Pawn cannot move backwards';
    }
    if (move.rankDistance() > 2) {
      return 'Pawn cannot move more than 2 files';
    }
    if (piece.isPieceMoved() && move.rankDistance() > 1) {
      return 'Pawn cannot move more than 1 file after first move';
    }
    return null;
  }
}
