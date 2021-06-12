import {
  detectCollisionY,
  detectCollisionPaddleSpecific,
} from "./collisionDetection.js"

export default class Ball {
  constructor(game) {
    this.leftImage = document.getElementById("ball-left")
    this.rightImage = document.getElementById("ball-right")

    this.gameWidth = game.gameWidth
    this.gameHeight = game.gameHeight

    this.game = game

    this.collisionSFX = document.getElementById("robot")
    this.dieSFX = document.getElementById("chime")

    this.size = 28
    this.reset()
  }

  reset() {
    this.position = { x: this.gameWidth / 2 - 100, y: 450 }
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
      this.collisionSFX.pause()
      this.speed.x = -this.speed.x
      this.game.comboCount = 0
      this.game.collisionCount++
      this.collisionSFX.play()
    }

    // Wall on Top
    if (this.position.y < 0) {
      this.collisionSFX.pause()
      this.speed.y = -this.speed.y
      this.game.comboCount = 0
      this.game.collisionCount++
      this.collisionSFX.play()
    }

    // Bottom of game
    if (this.position.y + this.size > this.gameHeight) {
      this.dieSFX.pause()
      this.game.lives--
      this.game.comboCount = 0
      this.game.comboMult = 1
      this.reset()
      this.game.collisionCount = 0
      this.dieSFX.play()
    }

    // Check collision with paddle

    if (detectCollisionY(this, this.game.paddle)) {
      this.collisionSFX.pause()
      this.speed.y = -this.speed.y
      this.position.y = this.game.paddle.position.y - this.size
      this.game.comboCount = 0
      this.game.collisionCount = 0
      this.game.comboMult = 1
      this.collisionSFX.play()
    }

    if (detectCollisionPaddleSpecific(this, this.game.paddle)) {
      this.collisionSFX.pause()
      this.speed.x = -this.speed.x
      this.game.comboCount = 0
      this.game.collisionCount = 0
      this.game.comboMult = 1
      this.collisionSFX.play()
    }
  }
}
