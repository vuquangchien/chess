import {Move} from '../moves/Move';
import {PieceTypes} from '../Piece';
import {CapturePolicy} from './CapturePolicy';

export class PawnCapturePolicy extends CapturePolicy {
  pieceType = PieceTypes.PAWN;
  isMoveValid(move: Move): string | null {
    if (super.isMoveValid(move)) {
      return super.isMoveValid(move);
    }
    if (move.from.piece?.type !== this.pieceType) {
      return null;
    }
    if (!move.isDiagonal()) {
      return 'Pawn must capture diagonally';
    }
    if (!move.isForward()) {
      return 'Pawn cannot capture backwards';
    }
    if (move.rankDistance() > 1) {
      return 'Pawn cannot capture more than 1 file';
    }
    return null;
  }
}
