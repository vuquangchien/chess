import {MovePolicy} from './MovePolicy';
import {Move} from '../Move';
import {PieceTypes} from '../Piece';
import {CapturePolicy} from './PawnCapturePolicy';

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
export class RookCapturePolicy extends CapturePolicy {
  pieceType = PieceTypes.ROOK;
  isMoveValid(move: Move): string | null {
    if (super.isMoveValid(move)) {
      return super.isMoveValid(move);
    }
    if (move.from.piece!.type !== this.pieceType) {
      return null;
    }

    if (!move.isVertical() || !move.isHorizontal()) {
      return 'Rook must capture vertically or horizontally';
    }
    return null;
  }
}
