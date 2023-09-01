import {AbstractView} from './AbstractView';
import {EmptyViewController} from './EmptyViewController';
import {AsciiEngine} from './AsciiEngine';

export class TextEl extends AbstractView<EmptyViewController> {
  private text: string;
  private row: number;
  private column: number;

  constructor(options: {text: string; row?: number; column?: number}) {
    super(new EmptyViewController());
    this.text = options.text;
    this.row = options.row || 0;
    this.column = options.column || 0;
    this.engine = new AsciiEngine();
  }

  public render(): string {
    return this.engine.renderBox({
      background: '#000000',
      text: this.text,
      column: this.column,
      row: this.row,
    });
  }
}
export class RowEl extends AbstractView<EmptyViewController> {
  constructor() {
    super(new EmptyViewController());
  }

  public render(): string {
    let result = '';
    result += this.renderChildren();
    result += '\n';
    return result;
  }
}
