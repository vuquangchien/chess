export interface MyIterator {
  hasNext(): boolean;
  next(): number;
}
export interface IteratorOptions {
  excludeFrom?: boolean;
  excludeTo?: boolean;
}
export class BigToSmallIterator implements MyIterator {
  private index: number;
  private from: number;
  private to: number;
  private excludeFrom: boolean;
  private excludeTo: boolean;

  constructor(from: number, to: number, options?: IteratorOptions) {
    this.excludeFrom = options?.excludeFrom || false;
    this.excludeTo = options?.excludeTo || false;
    this.index = this.excludeFrom ? from - 1 : from;
    this.from = from;
    this.to = this.excludeTo ? to + 1 : to;
  }

  public hasNext(): boolean {
    return this.index >= this.to;
  }

  public next(): number {
    return this.index--;
  }
}
export class SmallToBigIterator implements MyIterator {
  private index: number;
  private from: number;
  private to: number;
  private excludeFrom: boolean;
  private excludeTo: boolean;

  constructor(
    from: number,
    to: number,
    options?: {
      excludeFrom?: boolean;
      excludeTo?: boolean;
    }
  ) {
    this.excludeFrom = options?.excludeFrom || false;
    this.excludeTo = options?.excludeTo || false;
    this.index = this.excludeFrom ? from + 1 : from;
    this.from = from;
    this.to = this.excludeTo ? to - 1 : to;
  }

  public hasNext(): boolean {
    return this.index <= this.to;
  }

  public next(): number {
    return this.index++;
  }
}
export class NumberIterator {
  private constructor() {}
  static createIterator(
    from: number,
    to: number,
    options?: IteratorOptions
  ): MyIterator {
    if (from > to) {
      return new BigToSmallIterator(from, to, options);
    }
    return new SmallToBigIterator(from, to, options);
  }
}
