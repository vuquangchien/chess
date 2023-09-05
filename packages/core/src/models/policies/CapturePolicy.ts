import {MovePolicy} from './MovePolicy';
import {PieceType} from '../PieceType';
import {Move} from '../moves/Move';
import {Cell} from '../Cell';
import {Board} from '../Board';

export abstract class CapturePolicy implements MovePolicy {
  abstract pieceType: PieceType;
  private move: Move;
  private from: Cell;
  private board: Board;
  private to: Cell;

  constructor(board: Board, move: Move) {
    this.move = move;
    this.from = move.from;
    this.to = move.to;
    this.board = board;
  }

  isMoveValid(move: Move): string | null {
    if (!move.to.piece) {
      return 'No piece to capture';
    }
    if (move.from.piece!.color === move.to.piece.color) {
      return 'Cannot capture friendly piece';
    }
    if (
      move.cellsBetween().some(cell => this.board.getByCellName(cell).piece)
    ) {
      return 'Cannot capture over other pieces';
    }
    return null;
  }
  isValidPieceType(): boolean {
    return this.from.piece!.type === this.pieceType;
  }
}
