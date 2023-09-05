import {MovePolicy} from './MovePolicy';
import {Move} from '../moves/Move';
import {PieceTypes} from '../Piece';
import {CapturePolicy} from './CapturePolicy';
import {PieceType} from '../PieceType';

export class BishopMovePolicy implements MovePolicy {
  isMoveValid(move: Move): string | null {
    const piece = move.from.piece;
    if (piece!.type !== PieceTypes.BISHOP) {
      return null;
    }
    if (!move.isDiagonal()) {
      return 'Bishop cannot move vertically or horizontally';
    }
    return null;
  }
}
export class BishopCapturePolicy extends CapturePolicy {
  pieceType: PieceType = PieceTypes.BISHOP;

  isMoveValid(move: Move): string | null {
    if (super.isMoveValid(move)) {
      return super.isMoveValid(move);
    }
    if (!this.isValidPieceType()) {
      return null;
    }
    if (!move.isDiagonal()) {
      return 'Bishop cannot capture vertically or horizontally';
    }
    return null;
  }
}
