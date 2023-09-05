import {CapturePolicy} from './CapturePolicy';
import {PieceTypes} from '../Piece';
import {Move} from '../moves/Move';

export class RookCapturePolicy extends CapturePolicy {
  pieceType = PieceTypes.ROOK;

  isMoveValid(move: Move): string | null {
    if (super.isMoveValid(move)) {
      return super.isMoveValid(move);
    }
    if (move.from.piece!.type !== this.pieceType) {
      return null;
    }

    if (!move.isStraight()) {
      return 'Rook must capture vertically or horizontally';
    }
    return null;
  }
}
