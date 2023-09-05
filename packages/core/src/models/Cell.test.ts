import {Cell, fileToColIndex, rankToRowIndex} from './Cell';
// @ts-ignore
import {expect} from '@jest/globals';

describe('cell', () => {
  it('should get correct name', () => {
    const cell = new Cell(0, 0, null);
    expect(cell.name).toEqual('a8');
  });
  it('should create from name', () => {
    const cell = Cell.fromName('a1');
    expect(cell.name).toEqual('a1');
    expect(cell.colIndex).toEqual(0);
    expect(cell.rowIndex).toEqual(7);
  });
  it('should convert correctly file to col index', () => {
    [
      ['a', 0],
      ['b', 1],
      ['c', 2],
      ['d', 3],
      ['e', 4],
      ['f', 5],
      ['g', 6],
      ['h', 7],
    ].forEach(pair => {
      const [file, colIndex] = pair;
      expect(fileToColIndex(file.toString())).toEqual(colIndex);
    });
  });
  it('should get correct cell index', () => {
    [
      ['8', 0],
      ['7', 1],
      ['6', 2],
      ['5', 3],
      ['4', 4],
      ['3', 5],
      ['2', 6],
      ['1', 7],
    ].forEach(pair => {
      const [rank, rowIndex] = pair;
      expect(rankToRowIndex(rank.toString())).toEqual(rowIndex);
    });
  });
});
