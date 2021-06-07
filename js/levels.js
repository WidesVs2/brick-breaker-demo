import Brick from "./Brick.js"

export function buildLevel(game, level) {
  let bricks = []
  
  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 25 + 75 * brickIndex,
          y: 50 + 45 * rowIndex,
        }

        bricks.push(new Brick(game, position))
      }
    })
  })

  return bricks
}

export const levelOne = [
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
]

export const levelTwo = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

export const levelThree = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
]

export function generateLevel(rows, cols) {
  let arr1 = []
  let arr2 = []

  for (let j = 0; j < rows; j++) {
    arr1 = []
    for (let i = 0; i < cols; i++) {
      let num = Math.round(Math.random())
      arr1.push(num)
    }
    arr2.push(arr1)
  }

  return arr2
}

export function generateAllLevels(func, count, rows, cols) {
  let levels = []
  for (let i = 0; i < count; i++) {
    levels.push(func(rows, cols))
  }
  return levels
}