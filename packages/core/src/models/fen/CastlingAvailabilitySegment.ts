import {Castling} from './Castling';

export class CastlingAvailabilitySegment {
  private castlingAvailability: string;
  whiteKingSide: boolean;
  whiteQueenSide: boolean;
  blackKingSide: boolean;
  blackQueenSide: boolean;

  constructor(castlingAvailability: string) {
    this.castlingAvailability = castlingAvailability;
    const castlingAvailabilityArray = castlingAvailability.split('');
    this.whiteKingSide = castlingAvailabilityArray.includes(
      Castling.WHITE_KING_SIDE
    );
    this.whiteQueenSide = castlingAvailabilityArray.includes(
      Castling.WHITE_QUEEN_SIDE
    );
    this.blackKingSide = castlingAvailabilityArray.includes(
      Castling.BLACK_KING_SIDE
    );
    this.blackQueenSide = castlingAvailabilityArray.includes(
      Castling.BLACK_QUEEN_SIDE
    );
  }
}
