import {MovePolicy} from './MovePolicy';
import {Board} from '../Board';
import {Move} from '../moves/Move';
import {PieceColors} from '../Piece';

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
