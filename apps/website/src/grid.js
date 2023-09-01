import {theme} from "./theme";
import {Cell} from "./Cell";
import {BoardFactory} from "@chess/core/dist";


export class Grid extends Phaser.Scene {
  board;
  viewChildren = [];
  map = {}
  moveStart= null
  moveEnd = null
  constructor() {
    super();
    this.board = BoardFactory.createBoardWithPieces()
    this.viewChildren = []
  }
  resetMoves() {
    this.moveStart = null
    this.moveEnd = null
  }
  handleMove(cellEl) {
    cellEl.highlight()
    if(!this.moveStart) {
      this.moveStart = cellEl
    }else if(!this.moveEnd) {
      this.moveEnd = cellEl
    }

    if(this.moveStart && this.moveEnd) {
      try {
      this.board.movePiece(this.moveStart.cell, this.moveEnd.cell)
      } catch (e) {
        console.log(e)
        this.resetMoves()
      }
      this.viewChildren.forEach(cellView => {
        cellView.destroy()
      });
      this.renderBoard()
      this.resetMoves()
    }
  }

  handleResetHighlight() {
    this.viewChildren.forEach(cellView => {
      cellView.unHighlight();
    });
  }

  handleHighlightPossibleMoves(cellEl) {
    const cell = cellEl.cell
    const possibleMoves = this.board.getPossibleMoves(cell);
    possibleMoves.forEach(cell => {
      this.map[cell.name].highlight();
    });
  }

  create() {
    const {MT, ML, U} = theme
    'ABCDEFGH'.split('').forEach((file, index) => {
      const text = this.add.text(
        ML + index * U - 10,
        MT / 2 - 20,
        file,
        {font: '32px Arial', fill: '#000000', align: 'center'});
    })
    "87654321".split('').forEach((rank, index) => {
      const text = this.add.text(
        ML / 2 - 20,
        MT + index * U - 15,
        rank,
        {font: '32px Arial', fill: '#000000', align: 'center'});
    })
    this.renderBoard()
  }
  renderBoard() {
    const rankIt = this.board.getRankIterator()
    while (rankIt.hasNext()) {
      const rank = rankIt.next()
      const cellIt = rank.getIterator()
      while (cellIt.hasNext()) {
        const cell = cellIt.next()
        const cellView = new Cell(this, cell, {scene: this.scene.scene})
        this.viewChildren.push(cellView)
        this.map[cell.name] = cellView
      }
    }
  }
}
