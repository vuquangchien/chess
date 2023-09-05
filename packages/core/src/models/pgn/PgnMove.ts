import {PieceType} from '../PieceType';
import {PieceTypes, PieceTypesByFenName} from '../Piece';

export class PgnMove {
  piece?: PieceType;
  toCellName?: string;
  isCapture?: boolean;
  isCheck?: boolean;
  isCheckmate?: boolean;
  isPromotion?: boolean;
  promotionPiece?: PieceType;
  isCastleKingSide?: boolean;
  isCastleQueenSide?: boolean;
  fromFileName?: string;

  constructor(params: {
    piece?: PieceType;
    toCellName?: string;
    isCapture?: boolean;
    isCheck?: boolean;
    isCheckmate?: boolean;
    isPromotion?: boolean;
    promotionPiece?: PieceType;
    isCastleKingSide?: boolean;
    isCastleQueenSide?: boolean;
    fromFileName?: string;
  }) {
    this.piece = params.piece;
    this.toCellName = params.toCellName;
    this.isCapture = params.isCapture;
    this.isCheck = params.isCheck;
    this.isCheckmate = params.isCheckmate;
    this.isPromotion = params.isPromotion;
    this.promotionPiece = params.promotionPiece;
    this.isCastleKingSide = params.isCastleKingSide;
    this.isCastleQueenSide = params.isCastleQueenSide;
    this.fromFileName = params.fromFileName;
  }
  static fromPgn(pgn: string): PgnMove {
    if (pgn === 'O-O' || pgn.toLowerCase() === 'o-o') {
      return new PgnMove({
        isCastleKingSide: true,
      });
    }
    if (pgn === 'O-O-O' || pgn.toLowerCase() === 'o-o-o') {
      return new PgnMove({
        isCastleQueenSide: true,
      });
    }
    const firstChar = pgn[0];
    const isPawn = firstChar !== firstChar.toUpperCase();
    const isCapture = pgn.includes('x');
    const isCheck = pgn.includes('+');
    const isCheckmate = pgn.includes('#');
    const isPromotion = pgn.includes('=');
    const normalizedPgn = pgn.replace(/[+#]/g, '');
    const pieceFenName = isPawn ? 'p' : firstChar.toLowerCase();
    const pieceType = PieceTypesByFenName[pieceFenName];
    let promotionPiece;
    if (isPromotion) {
      const promotionPart = normalizedPgn.slice(normalizedPgn.indexOf('=') + 1);
      promotionPiece = PieceTypesByFenName[promotionPart[0].toLowerCase()];
    }
    if (!isCapture) {
      if (isPawn) {
        return new PgnMove({
          piece: PieceTypes.PAWN,
          toCellName: normalizedPgn.slice(0, 2),
          promotionPiece,
          isCheck,
          isCheckmate,
          isPromotion,
        });
      } else {
        return new PgnMove({
          piece: pieceType,
          toCellName: normalizedPgn.slice(1),
          isCheck,
          isCheckmate,
        });
      }
    }
    if (isCapture) {
      const toCellName = normalizedPgn.slice(normalizedPgn.indexOf('x') + 1);
      if (isPawn) {
        return new PgnMove({
          piece: PieceTypes.PAWN,
          toCellName: normalizedPgn.slice(2, 4),
          isCapture,
          isCheck,
          isCheckmate,
          fromFileName: normalizedPgn[0],
          promotionPiece,
          isPromotion,
        });
      }
      return new PgnMove({
        piece: pieceType,
        toCellName,
        isCapture,
        isCheck,
        isCheckmate,
      });
    }

    throw new Error(`Unknown move: ${pgn}`);
  }
}
