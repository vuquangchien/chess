import {MovePolicy} from './MovePolicy';
import {Move} from '../Move';
import {PieceTypes} from '../Piece';
import {Cell} from '../Cell';
import {PieceType} from '../PieceType';

export abstract class CapturePolicy implements MovePolicy {
  abstract pieceType: PieceType;
  private move: Move;
  private from: Cell;
  private to: Cell;
  constructor(move: Move) {
    this.move = move;
    this.from = move.from;
    this.to = move.to;
  }
  isMoveValid(move: Move): string | null {
    if (!move.to.piece) {
      return 'No piece to capture';
    }
    if (move.from.piece!.color === move.to.piece.color) {
      return 'Cannot capture friendly piece';
    }
    // if (move.from.piece!.type !== this.pieceType) {
    //   return null;
    // }
    return null;
  }
}
export class PawnCapturePolicy extends CapturePolicy {
  pieceType = PieceTypes.PAWN;
  isMoveValid(move: Move): string | null {
    if (super.isMoveValid(move)) {
      return super.isMoveValid(move);
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
