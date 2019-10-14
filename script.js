const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)
const start = document.getElementById("start-button")
const restart = document.getElementById("start")
const pause = document.getElementById("pause")
const introBoard = document.getElementById("intro-board")

const score = new Score(ctx)
const gameOver = document.querySelector(".game-over")
gameOver.classList.add('d-none')



start.onclick = () =>{
  game.run()
  introBoard.classList.add('fade-out')
  introBoard.classList.add('d-none')
}

pause.onclick = () => game._pause()

restart.onclick = () => game.run()

document.getElementById('coin-counter').innerText = score.coins