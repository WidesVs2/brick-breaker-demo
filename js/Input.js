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

    let left = document.getElementById("left")
    let right = document.getElementById("right")
    let pause = document.getElementById("pause")
    let start = document.getElementById("start")

    left.addEventListener("mousedown", (e) => {
      e.preventDefault()
      paddle.moveLeft()
    })
    left.addEventListener("mouseup", (e) => {
      e.preventDefault()
      paddle.stop()
    })
    left.addEventListener("mouseleave", (e) => {
      e.preventDefault()
      paddle.stop()
    })
    left.addEventListener("touchstart", (e) => {
      e.preventDefault()
      paddle.moveLeft()
    })
    left.addEventListener("touchend", (e) => {
      e.preventDefault()
      paddle.stop()
    })
    right.addEventListener("mousedown", (e) => {
      e.preventDefault()
      paddle.moveRight()
    })
    right.addEventListener("touchstart", (e) => {
      e.preventDefault()
      paddle.moveRight()
    })
    right.addEventListener("mouseup", (e) => {
      e.preventDefault()
      paddle.stop()
    })
    right.addEventListener("mouseleave", (e) => {
      e.preventDefault()
      paddle.stop()
    })
    right.addEventListener("touchend", (e) => {
      e.preventDefault()
      paddle.stop()
    })
    pause.addEventListener("click", (e) => {
      e.preventDefault()
      game.togglePause()
    })
    start.addEventListener("click", (e) => {
      e.preventDefault()
      game.start()
    })
  }
}
