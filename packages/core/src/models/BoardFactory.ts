import {Board} from './Board';
import {FenRecord} from './fen/FenRecord';

export class BoardFactory {
  public static createEmptyBoard(): Board {
    return new Board();
  }
  public static createFromFen(fen: string): Board {
    const board = new Board();
    const fenRecord = new FenRecord(fen);
    const cells = fenRecord.piecePlacement.getCells();
    cells.forEach(cell => {
      board.getByCellName(cell.name).setPiece(cell.piece);
    });
    board.setCurrentPlayer(fenRecord.activeColor);
    return board;
  }
  public static createBoardWithPieces(): Board {
    return BoardFactory.createFromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'
    );
  }
}
