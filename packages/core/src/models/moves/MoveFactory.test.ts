// @ts-ignore
import {expect} from '@jest/globals';
import {BoardFactory} from '../BoardFactory';
import {MoveFactory} from './MoveFactory';
import {PieceColors} from '../Piece';

describe('MoveFactory', () => {
  it('should create move from pgn', () => {
    const board = BoardFactory.createBoardWithPieces();
    console.log(board.getAllPossibleMoves().map(m => m.toString()));
    const move = MoveFactory.fromPgn(board, 'e4', PieceColors.WHITE);
    expect(move.from.name).toEqual('e2');
    expect(move.toString()).toEqual('white:e2 -> e4');
  });
});
