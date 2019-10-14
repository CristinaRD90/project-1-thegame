class Girl {
  constructor(ctx) {
    this.ctx = ctx
    this.h0 = 100
    this.x = 0.1 * this.ctx.canvas.width
    this.y0 = this.ctx.canvas.height - (this.h0 + GROUND_HEIGHT)
    this.y = this.y0
    this.w = 80
    this.h = this.h0
    this.vx = 0
    this.vy = 0
    this.ay = 0.8

    this.inPlatform = false

    this.img = new Image()
    this.img.src = "img/run_sprite.png"
    this.img.frames = 8
    this.img.frameIndex = 0

    this.jumpAudio = new Audio ("sound/jump_02.wav")

    this.shooting = new Audio ("sound/knifesharpener2.flac")

    this.tick = 0

    this._setListeners()

    this.bullets = []
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / 8,
      0,
      this.img.width / 8,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this._animate()

    this.bullets.forEach(b => b.draw())
  }

  move() {
    this.x += this.vx
    if (this.y < this.y0 && this._isJumping()) {
      this.vy += this.ay;
      this.y += this.vy;
    } else {
      this.vy = 0; 
    }

    this.bullets.forEach(b => b.move())
  }

  _animate() {
    this.tick++

    if (this.tick > 8) {
      this.img.frameIndex++
      this.tick = 0
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  _setListeners() {
    document.onkeydown = (e) => {
      if (e.keyCode === TOP_KEY) {
        this._jump()
      }
      else if (e.keyCode === SPACE_KEY) {
        this._shoot()
      }
      else if (e.keyCode === RIGHT_KEY) {
        this.vx = 5
      } 
      else if (e.keyCode === LEFT_KEY) {
        this.vx = -5
      }
    }

    document.onkeyup = (e) => {
      if (e.keyCode === RIGHT_KEY) {
        this.vx = 0
      } else if (e.keyCode === LEFT_KEY) {
        this.vx = 0
      }
    }
  }

  _shoot() {
    this.shooting.play()
    this.bullets.push(
      new Bullet(
        this.ctx,
        this.x + this.w,
        this.y + ((this.h/3)*1.5)
      )
    )
  }

  _jump() {
    if (!this._isJumping() || this.inPlatform) {
      this.jumpAudio.play()
      this.img.frameIndex = 3
      this.y -= 20;
      this.vy -= 20;
    }
  }

  _isJumping() {
    return this.y < this.y0
  }

  isVisible() {
    return !(
      this.x >= this.ctx.canvas.width ||
      this.y >= this.ctx.canvas.height
    )
  }
}