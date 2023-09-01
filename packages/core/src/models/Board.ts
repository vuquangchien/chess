import {Cell} from './Cell';
import {CellIterator, RankIterator} from './CellIterator';

import {File} from './File';
import {Rank} from './Rank';
import * as _ from 'lodash';
import {Move, MoveFactory} from './Move';
import {SamePlayerNotMoveTwicePolicy} from './policies/SamePlayerNotMoveTwicePolicy';
import {PieceNotEmptyPolicy} from './policies/PieceNotEmptyPolicy';
import {PawnMovePolicy} from './policies/PawnMovePolicy';
import {RookCapturePolicy, RookMovePolicy} from './policies/RookMovePolicy';
import {NotBlockedByFriendPiecePolicy} from './policies/NotBlockedByFriendPiecePolicy';
import {
  BishopMovePolicy,
  WhiteMoveFirstPolicy,
} from './policies/BishopMovePolicy';
import {KingMovePolicy} from './policies/KingMovePolicy';
import {KnightMovePolicy, QueenMovePolicy} from './policies/QueenMovePolicy';
import {PawnCapturePolicy} from './policies/PawnCapturePolicy';

export class Board {
  public cells: Cell[][];
  public moves: Move[] = [];
  constructor() {
    const files: Cell[][] = [];
    for (let rowIndex = 7; rowIndex >= 0; rowIndex--) {
      const file: Cell[] = [];
      for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
        const cell = new Cell(fileIndex, rowIndex, null);
        file.push(cell);
      }
      files.push(file);
    }
    this.cells = files;
  }

  public getRankIterator(): RankIterator {
    return new RankIterator(this);
  }
  public getCell(file: number, rank: number): Cell {
    return this.cells[rank][file];
  }
  public getByCellName(name: string): Cell {
    const file = name.charCodeAt(0) - 97;
    const rank = 8 - parseInt(name.charAt(1), 10);
    return this.getCell(file, rank);
  }
  public getRanks(): Rank[] {
    return this.cells.map(cells => new Rank(cells));
  }

  public getFiles(): File[] {
    const ranks = [];
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      const cells = _.filter(
        _.flatten(this.cells),
        (cell: Cell) => cell.rank === rankIndex
      );
      ranks.push(new File(cells));
    }
    return ranks;
  }

  public validateMove(move: Move): void {
    const movePolicies = [
      new PieceNotEmptyPolicy(),
      new WhiteMoveFirstPolicy(this),
      new SamePlayerNotMoveTwicePolicy(this),
      new NotBlockedByFriendPiecePolicy(this),
      new PawnMovePolicy(),
      new RookMovePolicy(),
      new BishopMovePolicy(),
      new KingMovePolicy(),
      new QueenMovePolicy(),
      new KnightMovePolicy(),
    ];
    const capturePolicies = [
      new PawnCapturePolicy(move),
      new RookCapturePolicy(move),
    ];
    if (move.isSimpleMove())
      movePolicies.forEach(policy => {
        const error = policy.isMoveValid(move);
        if (error) {
          throw new Error(error);
        }
      });
    if (move.isCaptureMove())
      capturePolicies.forEach(policy => {
        const error = policy.isMoveValid(move);
        if (error) {
          throw new Error(error);
        }
      });
  }

  public movePiece(from: Cell, to: Cell): void {
    const move = MoveFactory.createMove(from, to);
    this.validateMove(move);

    this.moves.push(move);
    to.setPiece(from.piece);
    from.piece!.setPieceMoved();
    from.setPiece(null);
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
  public getPossibleMoves(cell: Cell): Cell[] {
    const possibleMoves: Cell[] = [];
    const it = this.getCellIterator();
    while (it.hasNext()) {
      const toCell = it.next();
      try {
        const move = MoveFactory.createMove(cell, toCell);
        this.validateMove(move);
        possibleMoves.push(toCell);
      } catch (e) {
        console.log(e);
      }
    }
    return possibleMoves;
  }

  highlightCell(cell: Cell) {
    cell.highlight();
  }

  unHighlightCell(cell: Cell) {
    cell.unHighlight();
  }

  resetHighlight() {
    const it = this.getCellIterator();

    while (it.hasNext()) {
      const cell = it.next();
      cell.unHighlight();
    }
  }
}
