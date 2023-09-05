import {PgnTurn} from './PgnTurn';
import {Game} from '../Game';
import {SimpleIterator} from '../fen/SimpleIterator';
import _ from 'lodash';
import {MoveFactory} from '../moves/MoveFactory';
import {PieceColors} from '../Piece';

export class PgnRecord {
  event?: string;
  site?: string;
  date?: string;
  round?: string;
  white?: string;
  black?: string;
  result?: string;
  turns: PgnTurn[];
  game: Game;

  constructor(payload: Partial<PgnRecord>) {
    this.event = payload.event;
    this.site = payload.site;
    this.date = payload.date;
    this.round = payload.round;
    this.white = payload.white;
    this.black = payload.black;
    this.result = payload.result;
    this.turns = payload.turns || [];
    this.game = new Game();
  }
  public buildGame() {
    for (const turn of this.turns) {
      const move = MoveFactory.fromPgn(
        this.game.board,
        turn.white,
        PieceColors.WHITE
      );
      this.game.movePiece(move.from, move.to);
      const moveBlack = MoveFactory.fromPgn(
        this.game.board,
        turn.black,
        PieceColors.BLACK
      );
      this.game.movePiece(moveBlack.from, moveBlack.to);
    }
  }
}
