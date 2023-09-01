import {MovePolicy} from './MovePolicy';
import {Move} from '../Move';
import {PieceTypes} from '../Piece';

export class KingMovePolicy implements MovePolicy {
  isMoveValid(move: Move): string | null {
    const piece = move.from.piece;
    if (piece!.type !== PieceTypes.KING) {
      return null;
    }
    if (move.fileDistance() > 1 || move.rankDistance() > 1) {
      return 'King cannot move more than one cell';
    }
    return null;
  }
}
