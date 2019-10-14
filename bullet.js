class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.y = y
    this.x = x
    this.w = 30
    this.h = 15
    this.vx = 10

    this.img = new Image()
    this.img.src = "img/Knife_2.png"
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  move() {
    this.x += this.vx
  }

  isVisible() {
    return !(
      this.x >= this.ctx.canvas.width ||
      this.y >= this.ctx.canvas.height
    )
  }
}