export function detectCollisionY(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size
  let topOfBall = ball.position.y

  let topOfObject = gameObject.position.y
  let leftSideOfObject = gameObject.position.x
  let rightSideOfObject = gameObject.position.x + gameObject.width
  let bottomOfObject = gameObject.position.y + gameObject.height

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject
  ) {
    return true
  } else {
    return false
  }
}

export function detectCollisionX(ball, gameObject) {
  let rightSideOfBall = ball.position.x + ball.size
  let leftSideOfBall = ball.position.x

  let topOfObject = gameObject.position.y
  let leftSideOfObject = gameObject.position.x
  let rightSideOfObject = gameObject.position.x + gameObject.width
  let bottomOfObject = gameObject.position.y + gameObject.height

  if (
    rightSideOfBall >= leftSideOfObject &&
    leftSideOfBall <= rightSideOfObject &&
    ball.position.y >= topOfObject &&
    ball.position.y + ball.size <= bottomOfObject
    ) {
    return true
  } else {
    return false
  }
}

export function detectCollisionPaddleSpecific(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size
  let topOfBall = ball.position.y

  let topOfObject = gameObject.position.y
  let leftSideOfObject = gameObject.position.x
  let rightSideOfObject = gameObject.position.x + gameObject.width
  let bottomOfObject = gameObject.position.y + gameObject.height

  let quadATop = gameObject.position.x
  let quadBTop = gameObject.position.x + gameObject.width / 4
  let quadCTop = gameObject.position.x + gameObject.width / 2

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject
  ) {
    if (
      (ball.position.x <= quadBTop - ball.size && ball.position.x >= quadATop) ||
      (ball.position.x >= quadCTop + gameObject.width / 4 &&
        ball.position.x + ball.size <= rightSideOfObject)
    ) {
      return true
    }
    return false
  } else {
    return false
  }
}
