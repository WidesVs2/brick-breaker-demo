import Paddle from "./Paddle.js"
import Ball from "./Ball.js"
import inputHandler from "./Input.js"

import { generateLevel, generateAllLevels, buildLevel } from "./levels.js"

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  WIN: 5,
}

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.gameState = GAMESTATE.MENU
    this.paddle = new Paddle(this)
    this.ball = new Ball(this)

    this.gameObjects = []
    this.bricks = []
    this.collection = []
    this.lives = 3

    this.levels = generateAllLevels(generateLevel, 15, 4, 15)
    this.currentLevel = 0

    this.score = 0

    new inputHandler(this.paddle, this)
  }

  start() {
    if (
      this.gameState != GAMESTATE.MENU &&
      this.gameState != GAMESTATE.NEWLEVEL 
    )
      return
    if (this.currentLevel >= this.levels.length) {
      this.gameState = GAMESTATE.WIN
      return
    }
    
    this.bricks = buildLevel(this, this.levels[this.currentLevel])
    this.ball.reset()

    this.gameObjects = [this.ball, this.paddle]
    this.gameState = GAMESTATE.RUNNING
  }

  update(deltaTime) {
    if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER ||
      this.gameState === GAMESTATE.WIN
    )
      return

    
    if (this.bricks.length === 0) {
      this.currentLevel++
      this.gameState = GAMESTATE.NEWLEVEL
      this.start()
    }

    this.score = this.bricks.length
    this.collection = [...this.gameObjects, ...this.bricks]
    this.collection.forEach(obj => obj.update(deltaTime))

    this.bricks = this.bricks.filter((object) => !object.markedForDeletion)
  }

  draw(ctx) {
    this.collection.forEach((obj) => obj.draw(ctx))
    ctx.beginPath()
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.rect(25, 25, 100, 50)
    ctx.fill()

    ctx.font = "20px Arial"
    ctx.fillStyle = "#fff"
    ctx.fillText(`Bricks: ${this.score}`, 70, 45)

    ctx.font = "20px Arial"
    ctx.fillStyle = "#fff"
    ctx.fillText(`Lives: ${this.lives}`, 65, 70)

    if (this.gameState == GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight)
      ctx.fillStyle = "rgba(0,0,0,0.5)"
      ctx.fill()

      ctx.font = "30px Arial"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2)
    }

    if (this.gameState == GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight)
      ctx.fillStyle = "rgba(0,0,0,1)"
      ctx.fill()

      ctx.font = "30px Arial"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText(
        "Press SPACEBAR to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      )

      ctx.font = "30px Arial"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText(
        "Press ESC to Pause",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      )
    }

    if (this.gameState == GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight)
      ctx.fillStyle = "rgba(0,0,0,1)"
      ctx.fill()

      ctx.font = "30px Arial"
      ctx.fillStyle = "#cc1111"
      ctx.textAlign = "center"
      ctx.fillText("GAMEOVER", this.gameWidth / 2, this.gameHeight / 2)
    }

    if (this.gameState == GAMESTATE.WIN) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight)
      ctx.fillStyle = "rgba(0,0,0,1)"
      ctx.fill()

      ctx.font = "30px Arial"
      ctx.fillStyle = "#1111cc"
      ctx.textAlign = "center"
      ctx.fillText("You Win! Press ENTER to Restart!", this.gameWidth / 2, this.gameHeight / 2)
    }
  }

  togglePause() {
    if (this.gameState == GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING
    } else {
      this.gameState = GAMESTATE.PAUSED
    }
  }

  restart() {
    if (this.gameState === GAMESTATE.WIN) {
      this.lives = 3
      this.currentLevel = 0
      this.gameState = GAMESTATE.RUNNING
      this.start()
    }
    return
  }
}
