import { detectCollisionX, detectCollisionY } from "./collisionDetection.js"

export default class Brick {
  constructor(game, position) {
    this.brickBase = document.getElementById("brick-base")
    this.brickBreaking = document.getElementById("brick-breaking")
    this.brickBrokenAlt = document.getElementById("brick-broken-alt")
    this.brickBroken = document.getElementById("brick-broken")
    this.brickCrack = document.getElementById("brick-crack")
    this.brickLight = document.getElementById("brick-light")
    this.exBrick = document.getElementById("ex-brick")
    this.currentImage = this.brickBase

    this.game = game
    this.breaking = false
    this.scoreMark = false
    this.comboMark = false

    this.position = position
    this.width = 75
    this.height = 50

    this.markedForDeletion = false
    this.explodeSFX = document.getElementById("explosion")
    this.addUp = document.getElementById("powerup-two")
    this.powered = false
    this.upped = false
  }

  update() {
    if (this.game.oneUp) {
      if (this.powered) this.addUp.play()
      this.upped = true
      this.powered = false
      this.currentImage = this.exBrick
      this.explodeSFX = document.getElementById("powerup-one")
    }
    if (this.breaking != true) {
      if (detectCollisionY(this.game.ball, this)) {
        if (this.game.comboMult > 1) this.comboMark = true
        this.game.collisionCount = 0
        this.scoreMark = true
        if (this.game.oneUp) {
          this.game.lives++
          this.game.oneUp = false
        }
        if (this.game.bricks.length <= 1) this.markedForDeletion = true
        this.breaking = true
        this.explodeSFX.play()
        this.game.ball.speed.y = -this.game.ball.speed.y
        this.currentImage = this.brickLight
        setTimeout(() => {
          this.currentImage = this.brickCrack
        }, 100)
        setTimeout(() => {
          this.currentImage = this.brickBreaking
        }, 200)
        setTimeout(() => {
          this.markedForDeletion = true
        }, 300)
      }

      if (detectCollisionX(this.game.ball, this)) {
        if (this.game.comboMult > 1) this.comboMark = true
        this.game.collisionCount = 0
        this.scoreMark = true
        if (this.game.oneUp) {
          this.game.lives++
          this.game.oneUp = false
        }
        if (this.game.bricks.length <= 1) this.markedForDeletion = true
        this.breaking = true
        this.explodeSFX.play()
        this.game.ball.speed.x = -this.game.ball.speed.x
        this.currentImage = this.brickLight
        setTimeout(() => {
          this.currentImage = this.brickCrack
        }, 100)
        setTimeout(() => {
          this.currentImage = this.brickBreaking
        }, 200)
        setTimeout(() => {
          this.markedForDeletion = true
        }, 300)
      }
    }

    if (this.markedForDeletion === true) {
      this.game.score += this.game.baseScore * this.game.comboMult
      this.game.comboCount++
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.drawImage(
      this.currentImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )

    if (this.scoreMark) {
      ctx.font = "25px Arial"
      ctx.fillStyle = "#fc3"
      ctx.fillText(
        `+${this.game.baseScore * this.game.comboMult}`,
        this.position.x,
        this.position.y
      )
    }

    if (this.comboMark) {
      ctx.font = "25px Arial"
      ctx.fillStyle = "#f3f3f3"
      ctx.fillText(
        `COMBO X${this.game.comboMult}`,
        this.position.x - 25,
        this.position.y - 25
      )
    }
  }
}
