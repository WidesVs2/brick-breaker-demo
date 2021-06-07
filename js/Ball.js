import { detectCollisionY, detectCollisionPaddleSpecific } from "./collisionDetection.js"

export default class Ball {
  constructor(game) {
    this.leftImage = document.getElementById("ball-left")
    this.rightImage = document.getElementById("ball-right")

    this.gameWidth = game.gameWidth
    this.gameHeight = game.gameHeight

    this.game = game

    this.size = 25
    this.reset()
  }

  reset() {
    this.position = { x: 25, y: 400 }
    this.speed = { x: 4, y: -4 }
  }

  draw(ctx) {
    if (this.speed.x > 0) {
      ctx.drawImage(
        this.rightImage,
        this.position.x,
        this.position.y,
        this.size,
        this.size
      )
    } else {
      ctx.drawImage(
        this.leftImage,
        this.position.x,
        this.position.y,
        this.size,
        this.size
      )
    }
  }

  update(deltaTime) {
    this.position.x += this.speed.x
    this.position.y += this.speed.y

    // Wall on Left or Right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x
    }

    // Wall on Top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y
    }

    // Bottom of game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--
      this.reset()
    }

    // Check collision with paddle

    if (detectCollisionY(this, this.game.paddle)) {
      this.speed.y = -this.speed.y
      this.position.y = this.game.paddle.position.y - this.size
    }

    if (detectCollisionPaddleSpecific(this, this.game.paddle)) {
      this.speed.x = -this.speed.x
    }
  }
}
