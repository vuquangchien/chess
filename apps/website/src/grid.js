import {theme} from "./theme";
import {Cell} from "./Cell";
import {Game, RankIterator} from "@chess/core/dist";
import {SimpleIterator} from "./simpleIterator";

export class Grid extends Phaser.Scene {
  myGame
  viewChildren = [];
  map = {}
  moveStart= null
  moveEnd = null
  moveIterator = null
  constructor() {
    super();
    this.myGame = new Game()
    this.moveIterator =new SimpleIterator(this.myGame.moves)
  }
  get board() {
    return this.moveIterator.current()?.startBoard || this.myGame.board
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
        this.myGame.movePiece(this.moveStart.cell, this.moveEnd.cell)
        this.moveIterator.next()
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
    this.renderControlPanel()

  }
  renderControlPanel() {
    const {MT, ML, U} = theme
    const scene = this.scene.scene
    const rectEl = scene.add.rectangle(
      ML + 10 * U, MT + 8 * U, U *2 , U)
      .setFillStyle(0x000000)
      .setInteractive();
    rectEl.on('pointerdown', ()=> {
      this.moveIterator.next();
      this.renderBoard()
    })
    const textEl = scene.add.text(
      ML + 10 * U - 30,
      MT + 8 * U - 30,
      'Next Move', {font: '20px Arial', fill: '#ffffff', align: 'center'})

    const rectEl2 = scene.add.rectangle(
      ML + 10 * U, MT + 7 * U, U*2, U)
      .setFillStyle(0x000000)
      .setInteractive();
    rectEl2.on('pointerdown', ()=> {
      this.moveIterator.prev();
      this.renderBoard()
    })
    const textEl2 = scene.add.text(
      ML + 10 * U - 30,
      MT + 7 * U - 30,
      'Previous Move', {font: '20px Arial', fill: '#ffffff', align: 'center'})
  }
  renderBoard() {
    const rankIt = new RankIterator(this.board)
    while (rankIt.hasNext()) {
      const rank = rankIt.next()
      const cellIt = rank.getIterator()
      while (cellIt.hasNext()) {
        const cell = cellIt.next()
        console.log(cell)
        const cellView = new Cell(this, cell, {scene: this.scene.scene})
        this.viewChildren.push(cellView)
        this.map[cell.name] = cellView
      }
    }
  }
}
