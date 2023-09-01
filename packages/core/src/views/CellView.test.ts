import {Cell} from '../models/Cell';
import {CellView} from './CellView';
import {CellViewController} from './CellViewController';
import {Piece} from '../models/Piece';

describe('CellView', () => {
  it('should render empty cell', () => {
    const cell = Cell.fromName('a1');
    const cellView = new CellView(new CellViewController(cell));
    expect(cellView.render()).toMatchSnapshot();
  });
  it('should render cell with piece', () => {
    const cell = Cell.fromName('a1');
    cell.setPiece(Piece.fromName('b'));
    const cellView = new CellView(new CellViewController(cell));
    expect(cellView.render()).toMatchSnapshot();
  });
  // render white cell
  it('should render white cell', () => {
    const cell = Cell.fromName('a8');
    const cellView = new CellView(new CellViewController(cell));
    expect(cellView.render()).toMatchSnapshot();
  });
  // render highlighted cell
  it('should render highlighted cell', () => {
    const cell = Cell.fromName('a8');
    cell.highlight();
    const cellView = new CellView(new CellViewController(cell));
    expect(cellView.render()).toMatchSnapshot();
  });
  // render highlighted cell with piece
  it('should render highlighted cell with piece', () => {
    const cell = Cell.fromName('a8');
    cell.highlight();
    cell.setPiece(Piece.fromName('b'));
    const cellView = new CellView(new CellViewController(cell));
    expect(cellView.render()).toMatchSnapshot();
  });
});
