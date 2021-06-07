import { detectCollisionX, detectCollisionY } from "./collisionDetection.js"

export default class Brick {
  constructor(game, position) {
    this.brickBase = document.getElementById("brick-base")
    this.brickBreaking = document.getElementById("brick-breaking")
    this.brickBrokenAlt = document.getElementById("brick-broken-alt")
    this.brickBroken = document.getElementById("brick-broken")
    this.brickCrack = document.getElementById("brick-crack")
    this.brickLight = document.getElementById("brick-light")

    this.game = game

    this.position = position
    this.width = 75
    this.height = 50

    this.markedForDeletion = false
  }

  update() {
    if (detectCollisionY(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y

      this.markedForDeletion = true
    }

    if (detectCollisionX(this.game.ball, this)) {
      this.game.ball.speed.x = -this.game.ball.speed.x

      this.markedForDeletion = true
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.brickBase,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}
