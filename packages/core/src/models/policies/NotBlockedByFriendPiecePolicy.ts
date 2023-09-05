import {Board} from '../Board';
import {MovePolicy} from './MovePolicy';
import {Move} from '../moves/Move';
import {PieceTypes} from '../Piece';

export class NotBlockedByFriendPiecePolicy implements MovePolicy {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }
  isMoveValid(move: Move) {
    const piece = move.from.piece;
    if (piece?.type === PieceTypes.KNIGHT) {
      return null;
    }
    const cellsBetween = move.cellsBetween();
    let errorMessage = null;
    for (const cellName of cellsBetween) {
      const cell = this.board.getByCellName(cellName);
      if (cell.piece) {
        errorMessage = 'Piece is blocked by other piece';
      }
    }
    if (errorMessage !== null) {
      return errorMessage;
    }
    if (move.to.piece?.getColor() === move.from.piece?.getColor()) {
      return 'Piece is blocked by friend piece';
    }
    return null;
  }
}
