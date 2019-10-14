class EndLevel {
  constructor(ctx) {
    this.ctx = ctx
    this.x = this.ctx.canvas.width
    this.y = this.ctx.canvas.height - 100
    this.w = 40
    this.h = 40
    this.vx = -5

    this.img = new Image()
    this.img.src = "img/Sign.png"

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
}