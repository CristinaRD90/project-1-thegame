class Game {
  constructor(ctx) {
    this.ctx = ctx;
    
    this.bg = new Background(ctx);
    this.girl = new Girl(ctx);
    this.plat = new Platform(ctx);
    this.intervalId = null;
    this.score = new Score()
    this.gameOver = document.querySelector(".game-over")
    this.restartButton = document.getElementById("restart")
    this.audio = new Audio ("sound/happy.mp3")
    this.life = document.querySelector(".life")

    this.cactus = [];

    this.tojump = [];

    this.coin = [];

    this.poisson = [];

    this.level = []
    

    //tick para los cactus
    this.tick = 0;

    //tick para las plataformas
    this.tick2 = 0;

    //tick para las monedas
    this.tick3 = 0;

    //tick para el array de monedas
    this.tick4 = 0;

    //tick para las flores rojas
    this.tick5 = 0;

    //tick para el final
    this.tick6 = 0;
  }

  ///run ejecuta el juego

  run() {
    this.audio.play()

    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._clearObstacles()
      this._checkCollisions()
    }, 1000 / 60)
  }

  ///clear, limpia canvas y obstáculos

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _clearObstacles() {
    this.cactus = this.cactus.filter(c => {
      return c.x + c.w >= 0
    })

    this.poisson = this.poisson.filter(p => {
      return p.x + p.w >= 0
    })

    this.tojump = this.tojump.filter(j => {
      return j.x + j.w >= 0
    })
  }

  ///draw, pinta canvas

  _draw() {
    this.bg.draw()
    this.girl.draw()
    this.plat.draw()
    this.score.draw()
    this.cactus.forEach(c => c.draw())

    this.tick++

    if (this.tick > Math.random() * 500 + 300) { 
      this.tick = 0
      this._addCactus()
    }

    this.tojump.forEach(j => j.draw())

    this.tick2++

    if (this.tick2 > Math.random() * 1500 + 600) { 
      this.tick2 = 0
      this._addToJump()
    }

    this.coin.forEach(m => m.draw())

    this.tick3++

    if (this.tick3 > Math.random() * 50 + 100){
      this.tick3 = 0
      this.addCoin()
    }

    this.poisson.forEach(p => p.draw())

    this.tick5++

    if (this.tick5 > Math.random() * 100 + 400) { 
      this.tick5 = 0
      this._addPoisson()
    }

    this.level.forEach(l => l.draw())

    this.tick6++

    if (this.tick6 > 1800) {
      this.tick6 = 0
      this._endLevel()
    }
  }

  _addCactus() {
    this.cactus.push(
      new Cactus(this.ctx)
    )
  }

  _addToJump() {
    this.tojump.push(
      new ToJump(this.ctx)
    )
  }

  addCoin() {
    const firstCoin = new Coin(this.ctx)

    this.coin.push(firstCoin)

    const randomCoinNum = Math.floor(Math.random() * 6)

    for (let i = 1; i < randomCoinNum; i++) {
      const newCoin = new Coin(this.ctx)
      newCoin.x = firstCoin.x + i * (newCoin.w * 2)
      this.coin.push(newCoin)
    }
  }

  _addPoisson() {
    this.poisson.push(
      new Poisson(this.ctx)
    )
  }

  _endLevel() {
    this.level.push(
      new EndLevel(this.ctx)
    )
  } 
  

  ///mueve el canvas

  _move() {
    this.bg.move()
    this.girl.move()
    this.plat.move()
    this.cactus.forEach(c => c.move())
    this.tojump.forEach(j => j.move())
    this.coin.forEach(m => m.move())
    this.poisson.forEach(p => p.move())
    this.level.forEach(l => l.move())
  }

  _checkCollisions() {
    //cactus para el game over
    const col = this.cactus.some(o => {
      return o.collide(this.girl)
    })

    if (col) {
      console.log('line 189 game.js aqui va el sonido')
      this._gameOver()
    }

    //plataforma para saltar
    const jump = this.tojump.some(j => {
      return j.collide(this.girl)
    })

    if (jump) {
      
      this._newHeight()
      this.girl.inPlatform = true
    } else if(!jump && !this.girl._isJumping()){
      this.falldown()
    }

    // recoger monedas
    this.coin = this.coin.filter(m => {  
      if (m.collide(this.girl)) {
        this.score.pickCoins()
        return false
      } else {
        return true
      }
    })

    //destruir veneno
    this.poisson = this.poisson.filter(p => {
      return !this.girl.bullets.some(b => {
        return p.collide(b)
      })
    })

    
    //veneno para quitar monedas
    this.poisson = this.poisson.filter(c => {
      if (c.collide(this.girl)) {
        this.score.removeCoins()
        this._removeCoinsCount()
        return false 
      } else {
        return true
      }
    })

    //terminar nivel
    const levelUp = this.level.some(o => {
      return o.collide(this.girl)
    })

    if (levelUp) {
      this.finishLevel()
    }
  }

  falldown() {
    this.girl.vy = -0.3
    this.girl.y = this.girl.y0
  }

  _newHeight() {
    this.girl.y = 305
  }

  _gameOver() {
    clearInterval(this.intervalId)
    this.audio.pause()
    this.ctx.font = "80px Bangers";
    this.ctx.textAlign = "center";
    this.gameOver.classList.toggle('d-none')
    this.gameOver.classList.add("z-index-top")
    this.life.classList.add('d-none')
    this.restartButton.onclick = function() {
      return window.location.reload(true)
    };
  }

  //final del nivel
  finishLevel() {
    clearInterval(this.intervalId)
    this.audio.pause()
    this.ctx.font = "40px Bangers";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `CONGRATULATIONS YOU'VE EARNED ${this.score.coins} COINS`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }

  //para parar el juego 
  _pause() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Bangers";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "PAUSED",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }

  _removeCoinsCount() {
    this.ctx.font = "40px Bangers";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `-10 COINS`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}