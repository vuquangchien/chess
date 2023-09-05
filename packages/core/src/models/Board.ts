import {Cell} from './Cell';
import {CellIterator} from './CellIterator';
import * as _ from 'lodash';
import {Move} from './moves/Move';
import {MoveFactory} from './moves/MoveFactory';
import {PieceColors} from './Piece';
import {PieceColor} from './PieceColor';
import {PolicyFactory} from './policies/PolicyFactory';

export class Board {
  public cells: Cell[][];
  public moves: Move[] = [];
  private player = PieceColors.WHITE;
  constructor() {
    // const cellIndex = 0;
    const files: Cell[][] = [];
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
      const file: Cell[] = [];
      for (let colIndex = 0; colIndex < 8; colIndex++) {
        const cell = new Cell(colIndex, rowIndex, null);
        file.push(cell);
      }
      files.push(file);
    }
    this.cells = files;
  }

  public getByCellName(name: string): Cell {
    try {
      const file = name.charCodeAt(0) - 97;
      const rank = 8 - parseInt(name.charAt(1), 10);
      return this.cells[rank][file];
    } catch (e) {
      throw new Error(`Invalid cell name ${name}`);
    }
  }

  public assertMove(move: Move): void {
    const movePolicies = PolicyFactory.getPolicies(this, move);
    movePolicies.forEach(policy => {
      const error = policy.isMoveValid(move);
      if (error) {
        throw new Error(error);
      }
    });
  }

  public movePiece(from: Cell, to: Cell): void {
    const move = MoveFactory.createMove(from, to);
    this.assertMove(move);
    this.moves.push(move);
    to.setPiece(from.piece);
    from.piece!.setPieceMoved();
    from.setPiece(null);
    this.player =
      this.player === PieceColors.WHITE ? PieceColors.BLACK : PieceColors.WHITE;
  }
  public movePieceByCellName(from: string, to: string): void {
    const fromCell = this.getByCellName(from);
    const toCell = this.getByCellName(to);
    this.movePiece(fromCell, toCell);
  }
  public getCellIterator(): CellIterator {
    return new CellIterator(_.flatten(this.cells));
  }
  public highlightPossibleMoves(cell: Cell) {
    const possibleMoves = this.getPossibleMoves(cell);
    possibleMoves.forEach(possibleMove => {
      possibleMove.highlight();
    });
  }
  public getPossibleMoves(fromCell: Cell): Cell[] {
    const possibleMoves: Cell[] = [];
    const it = this.getCellIterator();
    while (it.hasNext()) {
      const toCell = it.next();
      try {
        const move = MoveFactory.createMove(fromCell, toCell);
        this.assertMove(move);
        possibleMoves.push(toCell);
      } catch (e) {
        // console.log(e);
      }
    }
    return possibleMoves;
  }
  public getAllPossibleMoves(): Move[] {
    const possibleMoves: Move[] = [];
    const it = this.getCellIterator();
    while (it.hasNext()) {
      const fromCell = it.next();
      if (!fromCell.piece) {
        continue;
      }
      const moves = this.getPossibleMoves(fromCell);
      moves.forEach(toCell => {
        possibleMoves.push(MoveFactory.createMove(fromCell, toCell));
      });
    }
    return possibleMoves;
  }
  resetHighlight() {
    const it = this.getCellIterator();
    while (it.hasNext()) {
      it.next().unHighlight();
    }
  }

  getCurrentPlayer() {
    return this.player;
  }

  setCurrentPlayer(player: PieceColor) {
    this.player = player;
  }

  clone() {
    return _.cloneDeep(this);
  }
}
