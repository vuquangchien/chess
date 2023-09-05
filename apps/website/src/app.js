import {Grid} from "./grid";

function renderPhaser() {
  const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    backgroundColor: '#ffffff',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 200}
      }
    },
    scene: Grid
  };

   new Phaser.Game(config)

}
function main() {
  renderPhaser()
}

window.onload = main
