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

    this.levels = generateAllLevels(generateLevel, 50, 4, 15)
    this.currentLevel = 0

    this.score = 0
    this.baseScore = 50
    this.collisionCount = 0
    this.comboCount = 0
    this.comboMult = 1
    this.oneUp = false

    this.timer = 5
    this.clock = undefined
    this.endStageClock = undefined
    this.endStageTimer = 25
    this.endStage = false

    this.refresh = document.getElementById("refresh")
    this.refresh.addEventListener("click", (e) => {
      location.reload()
    })

    this.bg_music = document.getElementById("bg-music")
    this.gameover_music = document.getElementById("creepy-piano")

    new inputHandler(this.paddle, this)
  }

  start() {
    this.oneUp = false
    this.bg_music.play()
    if (
      this.gameState != GAMESTATE.MENU &&
      this.gameState != GAMESTATE.NEWLEVEL
    )
      return
    if (this.currentLevel >= this.levels.length) {
      this.gameState = GAMESTATE.WIN
      return
    }

    if (this.ball.speed.x >= 0) {
      this.ball.speed.x += this.currentLevel + 1
    } else {
      this.ball.speed.x -= this.currentLevel + 1
    }
    if (this.ball.speed.y >= 0) {
      this.ball.speed.y += this.currentLevel + 1
    } else {
      this.ball.speed.y -= this.currentLevel + 1
    }

    this.bricks = buildLevel(this, this.levels[this.currentLevel])
    this.paddle.reset()
    this.ball.reset()

    this.gameObjects = [this.ball, this.paddle]
    this.gameState = GAMESTATE.RUNNING
  }

  update(deltaTime) {
    if (this.lives === 0) {
      refresh.classList.add("show")
      this.gameState = GAMESTATE.GAMEOVER
      this.gameover_music.play()
    }

    if (this.comboCount >= 3) {
      this.comboMult++
      this.comboCount = 0
    }

    if (this.collisionCount >= 4)
      this.comboMult > 1 ? this.comboMult-- : (this.comboMult = 1)

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER ||
      this.gameState === GAMESTATE.WIN ||
      this.gameState === GAMESTATE.NEWLEVEL
    )
      return

    if (this.bricks.length === 2) this.endStage = true

    if (this.bricks.length === 1) {
      this.bricks[0].upped
        ? (this.bricks[0].powered = false)
        : (this.bricks[0].powered = true)
      this.oneUp = true
      if (this.endStage) {
        this.endStageClock = setInterval(() => {
          if (
            this.gameState === GAMESTATE.NEWLEVEL ||
            this.bricks.length >= 2
          ) {
            this.endStageTimer = 25
            return
          }
          this.endStageTimer--
        }, 1000)
        setTimeout(() => {
          this.endStageTimer = 25
          this.oneUp = false
          clearInterval(this.endStageClock)
          if (this.gameState === GAMESTATE.NEWLEVEL || this.bricks.length >= 2)
            return
          this.bricks[0].markedForDeletion = true
          this.bricks = this.bricks.filter(
            (object) => !object.markedForDeletion
          )
          this.gameState = GAMESTATE.NEWLEVEL
        }, 25000)
      }
      this.endStage = false
    }

    if (this.bricks.length === 0) {
      this.currentLevel++
      if (this.currentLevel >= 15) this.baseScore += 500
      if (this.currentLevel < 15 && this.currentLevel >= 10)
        this.baseScore += 250
      if (this.currentLevel < 10 && this.currentLevel >= 5)
        this.baseScore += 100
      if (this.currentLevel < 5) this.baseScore += 50
      this.gameState = GAMESTATE.NEWLEVEL
      this.clock = setInterval(() => {
        this.timer--
      }, 1000)
      setTimeout(() => {
        this.timer = 5
        clearInterval(this.clock)
        this.start()
      }, 5000)
    }

    this.collection = [...this.gameObjects, ...this.bricks]
    this.collection.forEach((obj) => obj.update(deltaTime))

    this.bricks = this.bricks.filter((object) => !object.markedForDeletion)
  }

  draw(ctx) {
    this.collection.forEach((obj) => obj.draw(ctx))
    ctx.beginPath()
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.rect(25, 15, 100, 75)
    ctx.fill()

    ctx.font = "20px Arial"
    ctx.fillStyle = "#fff"
    ctx.fillText(`${this.score}`, 95, 85)

    ctx.font = "20px Arial"
    ctx.fillStyle = "#fff"
    ctx.fillText(`Lives:  ${this.lives}`, 65, 60)

    ctx.font = "20px Arial"
    ctx.fillStyle = "#fff"
    ctx.fillText(`Level:  ${this.currentLevel + 1}`, 65, 35)

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
        "Press SPACEBAR/Start Button to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      )

      ctx.font = "30px Arial"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText(
        "Press ESC/Pause Button to Pause",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      )
    }

    if (this.gameState == GAMESTATE.NEWLEVEL) {
      ctx.font = "30px Arial"
      ctx.fillStyle = "#070"
      ctx.textAlign = "center"
      ctx.fillText("Congratulations!", this.gameWidth / 2, this.gameHeight / 2)

      ctx.font = "30px Arial"
      ctx.fillStyle = "#070"
      ctx.textAlign = "center"
      ctx.fillText(
        "Press Start to begin now...",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      )

      ctx.font = "45px Arial"
      ctx.fillStyle = "#070"
      ctx.textAlign = "center"
      ctx.fillText(
        `Begin in: ${this.timer}`,
        this.gameWidth / 2,
        this.gameHeight / 2 - 50
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
      ctx.fillText(
        "You Win! Press ENTER to Restart!",
        this.gameWidth / 2,
        this.gameHeight / 2
      )
    }

    if (this.oneUp && this.endStageTimer <= 10) {
      ctx.font = "55px Arial"
      ctx.fillStyle = "#cc3333"
      ctx.textAlign = "center"
      ctx.fillText(
        `${this.endStageTimer}...`,
        this.gameWidth / 2,
        this.gameHeight / 2
      )
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
