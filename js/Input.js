export default class inputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (e) => {
      e.preventDefault()
      switch (e.key) {
        case "ArrowLeft":
          paddle.moveLeft()
          break
        case "ArrowRight":
          paddle.moveRight()
          break
        case "Escape":
          game.togglePause()
          break
        case " ":
          game.start()
          break
        case "Enter":
          game.restart()
          break
      }
    })

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          if (paddle.speed < 0) paddle.stop()
          break
        case "ArrowRight":
          if (paddle.speed > 0) paddle.stop()
          break
      }
    })
  }
}
