export class PgnTurn {
  number: number;
  white: string;
  black: string;
  result: string;

  constructor(number: number, white: string, black: string, result: string) {
    this.number = number;
    this.white = white;
    this.black = black;
    this.result = result;
  }
}
