class Score {
  constructor() {
    this.coins = 0
    this.life = [

    ]
    this.points = 0
    this.time = 0
    this.scoreDOMElement = document.getElementById("coin-counter")

    this.coin = new Coin(ctx)
  }

  pickCoins() {
    this.coins++
    this.coin.coinCollected.play()
  }

  removeCoins() {
    this.coins = this.coins - 10
  }

  manyLife() {
    
  }

  draw() {
    this.scoreDOMElement.innerText = this.coins
  }
}