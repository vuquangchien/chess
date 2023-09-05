import {Game} from './Game';
import {BoardViewFactory} from '../views/BoardViewFactory';
import {MoveFactory} from './moves/MoveFactory';

describe('Game', () => {
  it('should init game', () => {
    const game = new Game();
    expect(game.initialBoard).toBeDefined();
    expect(game.moves).toEqual([]);
    expect(
      BoardViewFactory.fromBoard(game.initialBoard).render()
    ).toMatchSnapshot();
  });
  it('should move piece', () => {
    const game = new Game();
    game.movePieceByName('a2', 'a3');
    expect(game.moves.length).toEqual(1);
    expect(
      BoardViewFactory.fromBoard(game.initialBoard).render()
    ).toMatchSnapshot();
  });
});
