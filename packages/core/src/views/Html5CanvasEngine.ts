import {IEngine} from './IEngine';

const UNIT = 50;
export class Html5CanvasEngine implements IEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    this.ctx = ctx;
  }

  renderBox(options: {
    background: string;
    text: string;
    column: number;
    row: number;
  }): void {
    const {ctx} = this;
    ctx.beginPath();
    ctx.fillStyle = options.background;
    ctx.fillRect(UNIT * options.column, UNIT * options.row, UNIT, UNIT);
    ctx.stroke();
    ctx.font = '50px Georgia';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    this.ctx.fillText(
      options.text,
      UNIT * options.column + UNIT / 2,
      UNIT * options.row + UNIT / 2
    );
  }
}
