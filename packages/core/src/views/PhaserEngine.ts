import {IEngine} from './IEngine';

export class PhaserEngine implements IEngine {
  renderBox(options: {
    background: string;
    text: string;
    column: number;
    row: number;
  }): any {
    return 'abc';
  }
}
