import {MovePolicy} from './MovePolicy';
import {Move} from '../Move';
import {PieceColors, PieceTypes} from '../Piece';
import {Board} from '../Board';

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

export class WhiteMoveFirstPolicy implements MovePolicy {
  private board: Board;
  constructor(board: Board) {
    this.board = board;
  }
  isMoveValid(move: Move): string | null {
    if (
      this.board.moves.length === 0 &&
      move.from.piece!.getColor() === PieceColors.BLACK
    ) {
      return 'White must move first';
    }
    return null;
  }
}
