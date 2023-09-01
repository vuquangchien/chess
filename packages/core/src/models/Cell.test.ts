import {Cell} from './Cell';
// @ts-ignore
import {expect} from '@jest/globals';

describe('cell', () => {
  it('should get correct name', () => {
    const cell = new Cell(0, 0, null);
    expect(cell.name).toEqual('a1');
  });
  it('should create from name', () => {
    const cell = Cell.fromName('a1');
    expect(cell.name).toEqual('a1');
  });
});
