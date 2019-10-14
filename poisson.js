class Poisson {
  constructor(ctx) {
    this.h = 200
    this.ctx = ctx
    this.x = this.ctx.canvas.width
    this.y = this.ctx.canvas.height - 260
    this.w = 160
    this.vx = -5

    this.img = new Image()
    this.img.src = "img/flower-red.png"

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