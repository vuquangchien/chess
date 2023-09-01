export interface IEngine {
  renderBox(options: {
    background: string;
    text: string;
    column: number;
    row: number;
  }): any;
}
