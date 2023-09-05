import {PieceNotEmptyPolicy} from './PieceNotEmptyPolicy';
import {SamePlayerNotMoveTwicePolicy} from './SamePlayerNotMoveTwicePolicy';
import {NotBlockedByFriendPiecePolicy} from './NotBlockedByFriendPiecePolicy';
import {PawnMovePolicy} from './PawnMovePolicy';
import {RookMovePolicy} from './RookMovePolicy';
import {BishopCapturePolicy, BishopMovePolicy} from './BishopMovePolicy';
import {KingMovePolicy} from './KingMovePolicy';
import {QueenMovePolicy} from './QueenMovePolicy';
import {PawnCapturePolicy} from './PawnCapturePolicy';
import {Board} from '../Board';
import {Move} from '../moves/Move';
import {QueenCapturePolicy} from './QueenCapturePolicy';
import {MovePolicy} from './MovePolicy';
import {RookCapturePolicy} from './RookCapturePolicy';
import {KnightMovePolicy} from './KnightMovePolicy';
import {KnightCapturePolicy} from './KnightCapturePolicy';
import {KingCapturePolicy} from './KingCapturePolicy';

export class PolicyFactory {
  public static getPolicies(board: Board, move: Move): MovePolicy[] {
    if (move.isSimpleMove())
      return [
        new PieceNotEmptyPolicy(),
        new SamePlayerNotMoveTwicePolicy(board),
        new NotBlockedByFriendPiecePolicy(board),
        new PawnMovePolicy(),
        new RookMovePolicy(),
        new BishopMovePolicy(),
        new KingMovePolicy(),
        new QueenMovePolicy(),
        new KnightMovePolicy(),
      ];
    if (move.isCaptureMove())
      return [
        new PawnCapturePolicy(board, move),
        new RookCapturePolicy(board, move),
        new BishopCapturePolicy(board, move),
        new KingCapturePolicy(board, move),
        new QueenCapturePolicy(board, move),
        new KnightCapturePolicy(board, move),
      ];
    throw new Error('Invalid move');
  }
}
