class ToJump {
  constructor(ctx) {
    this.ctx = ctx
    this.h = 200
    this.x = this.ctx.canvas.width
    this.y = this.ctx.canvas.height - this.h
    this.w = 300
    this.vx = -5

    this.img = new Image()
    this.img.src = "img/to_jump.png"

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
    return  (
      this.x < el.x + el.w &&
    this.x + this.w > el.x &&
    this.y < el.y + el.h &&
    this.h + this.y > el.y)
    // // const colX = el.x + el.w > this.x && el.x < this.x + this.w
    // // const colY = el.y + el.h > this.y && el.y < this.y + this.h

    // colX && colY
  }
}