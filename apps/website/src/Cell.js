import {theme} from "./theme";


export class Cell {
  rectEl;
  textEl;

  constructor(grid, cell, context) {
    this.context = context
    this.cell = cell;
    this.parent = grid
    this.renderCell()

  }

  renderCell() {
    const {MT, ML, U} = theme
    const scene = this.context.scene
    const cell = this.cell
    this.rectEl = scene.add.rectangle(
      ML + cell.file * U, MT + cell.rank * U, U, U)
      .setFillStyle(cell.color === 'white' ? 0xD18B47 : 0xFFCE9E)
      .setInteractive();
    this.rectEl.on('pointerdown', this.parent.handleHighlightPossibleMoves.bind(this.parent, this))
    this.rectEl.on('pointerup', this.parent.handleMove.bind(this.parent, this))
    this.textEl = scene.add.text(
      ML + cell.file * U - 15,
      MT + cell.rank * U - 30,
      cell.getPiece()?.getIcon(), {font: '50px Arial', fill: '#000000', align: 'center'})
  }

  highlight() {
    this.rectEl.setStrokeStyle(4, 0xefc53f);
  }

  unHighlight() {
    this.rectEl.setStrokeStyle(0);
  }
  destroy() {
    // const scene = this.context.scene
    // scene.remove(this.rectEl)
    // scene.remove(this.textEl)
    this.rectEl.destroy()
    this.textEl.destroy()
  }
}
