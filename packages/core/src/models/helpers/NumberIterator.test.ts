// @ts-ignore
import {describe} from '@jest/globals';

import {NumberIterator} from './NumberIterator';

describe('test', () => {
  it('should pass', () => {
    const numbers = [];
    const it = NumberIterator.createIterator(1, 10);
    while (it.hasNext()) {
      numbers.push(it.next());
    }
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  // should exclude from
  it('should exclude from', () => {
    const numbers = [];
    const it = NumberIterator.createIterator(0, 10, {excludeFrom: true});
    while (it.hasNext()) {
      numbers.push(it.next());
    }
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  // should exclude to
  it('should exclude to', () => {
    const numbers = [];
    const it = NumberIterator.createIterator(1, 10, {excludeTo: true});
    while (it.hasNext()) {
      numbers.push(it.next());
    }
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  // should reverse
  it('should reverse', () => {
    const numbers = [];
    const it = NumberIterator.createIterator(10, 1);
    while (it.hasNext()) {
      numbers.push(it.next());
    }
    expect(numbers).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  // should reverse and exclude from and to
  it('should reverse and exclude from and to', () => {
    const numbers = [];
    const it = NumberIterator.createIterator(10, 1, {
      excludeFrom: true,
      excludeTo: true,
    });
    while (it.hasNext()) {
      numbers.push(it.next());
    }
    expect(numbers).toEqual([9, 8, 7, 6, 5, 4, 3, 2]);
  });
});
