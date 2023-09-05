import {Cell} from '../Cell';
import {VerticalMove} from './VerticalMove';
import {HorizontalMove} from './HorizontalMove';
import {DiagonalMove} from './DiagonalMove';
import {Move} from './Move';
import {Board} from '../Board';
import {PieceColor} from '../PieceColor';

export class MoveFactory {
  static fromCellNames(board: Board, from: string, to: string): Move {
    const fromCell = board.getByCellName(from);
    const toCell = board.getByCellName(to);
    return MoveFactory.createMove(fromCell, toCell);
  }
  static createMove(from: Cell, to: Cell): Move {
    if (from.colIndex === to.colIndex) {
      return new VerticalMove(from, to);
    }
    if (from.rowIndex === to.rowIndex) {
      return new HorizontalMove(from, to);
    }
    if (
      Math.abs(from.colIndex - to.colIndex) ===
      Math.abs(from.rowIndex - to.rowIndex)
    ) {
      return new DiagonalMove(from, to);
    }
    return new Move(from, to);
  }
  static fromPgn(board: Board, pgn: string, color: PieceColor): Move {
    const to = pgn;
    const toCell = board.getByCellName(to);
    const allPossibleMoves = board.getAllPossibleMoves();
    const possibleMoves = allPossibleMoves.filter(move => {
      return move.to.name === toCell.name && move.player === color;
    });
    if (possibleMoves.length === 0) {
      throw new Error(`No possible moves for ${to}, player ${color}`);
    }
    if (possibleMoves.length === 1) {
      return possibleMoves[0];
    }
    throw new Error(`Ambiguous move ${to}`);
  }
}
