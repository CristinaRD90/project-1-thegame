class Coin {
  constructor(ctx) {
    this.ctx = ctx
    this.x = this.ctx.canvas.width
    this.y = this.ctx.canvas.height - 100
    this.w = 20
    this.h = 20
    this.vx = -5

    this.coinCollected = new Audio ("sound/coin.wav")

    this.img = new Image()
    this.img.src = "img/coin.png"

  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  move() {
    this.x += this.vx
  }

  collide(el) {
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h
    return colX && colY
  }


  isVisible() {
    return !(
      this.x + this.w <= 0
    )
  }
}