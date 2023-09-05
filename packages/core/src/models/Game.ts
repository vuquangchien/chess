import {GameMove} from './GameMove';
import {BoardFactory} from './BoardFactory';
import {Board} from './Board';
import {Cell} from './Cell';
import {MoveFactory} from './moves/MoveFactory';

export class Game {
  public initialBoard: Board;
  public moves: GameMove[] = [];

  constructor(
    board: Board = BoardFactory.createBoardWithPieces(),
    moves: GameMove[] = []
  ) {
    this.initialBoard = board;
    this.moves = moves;
  }

  get lastMove(): GameMove | null {
    return this.moves.length > 0 ? this.moves[this.moves.length - 1] : null;
  }

  public get board(): Board {
    return this.lastMove?.endBoard ?? this.initialBoard;
  }
  public movePieceByName(from: string, to: string): void {
    const fromCell = this.board.getByCellName(from);
    const toCell = this.board.getByCellName(to);
    this.movePiece(fromCell, toCell);
  }
  public movePiece(from: Cell, end: Cell): void {
    const move = MoveFactory.createMove(from, end);
    const currentBoard = this.lastMove?.endBoard ?? this.initialBoard;
    const startBoard = currentBoard.clone();
    currentBoard.movePiece(move.from, move.to);
    const endBoard = currentBoard.clone();
    this.moves.push(new GameMove(startBoard, endBoard, move));
  }
}
