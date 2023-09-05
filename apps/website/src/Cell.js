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

  cellBgColor() {
    return (this.cell.color === 'white' ? theme.BOARD_COLOR_WHITE : theme.BOARD_COLOR_BLACK)
  }
  cellHighlightColor() {
    return (this.cell.color === 'white' ? theme.BOARD_COLOR_HIGHLIGHT_WHITE : theme.BOARD_COLOR_HIGHLIGHT_BLACK)
  }
  renderCell() {
    const {MT, ML, U} = theme
    const scene = this.context.scene
    const cell = this.cell
    this.rectEl = scene.add.rectangle(
      ML + cell.colIndex * U, MT + cell.rowIndex * U, U, U)
      .setFillStyle(this.cellBgColor())
      .setInteractive();
    this.rectEl.on('pointerdown', this.parent.handleHighlightPossibleMoves.bind(this.parent, this))
    this.rectEl.on('pointerup', this.parent.handleMove.bind(this.parent, this))
    this.textEl = scene.add.text(
      ML + cell.colIndex * U - 15,
      MT + cell.rowIndex * U - 30,
      cell.getPiece()?.getIcon(), {font: '50px Arial', fill: '#000000', align: 'center'})
  }

  highlight() {
    this.rectEl.setFillStyle(this.cellHighlightColor());
  }

  unHighlight() {
    this.rectEl.setFillStyle(this.cellBgColor());
  }
  destroy() {
    this.rectEl.destroy()
    this.textEl.destroy()
  }
}
