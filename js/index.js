import Game from "./Game.js"

let GAME_WIDTH = 1200
let GAME_HEIGHT = 550

let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext("2d")

canvas.setAttribute("height", GAME_HEIGHT)
canvas.setAttribute("width", GAME_WIDTH)

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

setInterval(() => {
  canvas.classList.toggle("bg")
}, 1500)

let game = new Game(GAME_WIDTH, GAME_HEIGHT)

let lastTime = 0

canvas.style.width = "90vw"
canvas.style.height = "85vh"

const gameLoop = (timestamp) => {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

  game.update(deltaTime)
  game.draw(ctx)

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
