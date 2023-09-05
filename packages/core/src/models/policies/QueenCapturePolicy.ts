import {CapturePolicy} from './CapturePolicy';
import {PieceTypes} from '../Piece';
import {Move} from '../moves/Move';

export class QueenCapturePolicy extends CapturePolicy {
  pieceType = PieceTypes.QUEEN;

  isMoveValid(move: Move): string | null {
    if (super.isMoveValid(move)) {
      return super.isMoveValid(move);
    }
    if (move.from.piece?.type !== this.pieceType) {
      return null;
    }
    if (!move.isDiagonal() && !move.isStraight()) {
      return 'Queen must move diagonally or straight';
    }
    return null;
  }
}
