import {CapturePolicy} from './CapturePolicy';
import {PieceType} from '../PieceType';
import {PieceTypes} from '../Piece';
import {Move} from '../moves/Move';

export class KingCapturePolicy extends CapturePolicy {
  pieceType: PieceType = PieceTypes.KING;

  isMoveValid(move: Move): string | null {
    if (super.isMoveValid(move)) {
      return super.isMoveValid(move);
    }
    if (!this.isValidPieceType()) {
      return null;
    }
    if (move.fileDistance() > 1 || move.rankDistance() > 1) {
      return 'King cannot capture more than one cell';
    }
    return null;
  }
}
