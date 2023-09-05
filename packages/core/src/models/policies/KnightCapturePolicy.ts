import {CapturePolicy} from './CapturePolicy';
import {PieceType} from '../PieceType';
import {PieceTypes} from '../Piece';
import {Move} from '../moves/Move';

export class KnightCapturePolicy extends CapturePolicy {
  pieceType: PieceType = PieceTypes.KNIGHT;

  isMoveValid(move: Move): string | null {
    if (super.isMoveValid(move)) {
      return super.isMoveValid(move);
    }
    if (!this.isValidPieceType()) {
      return null;
    }
    if (!move.isKnightMove()) {
      return 'Knight cannot capture like this';
    }
    return null;
  }
}
