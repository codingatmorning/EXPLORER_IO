function isbetween(vala, valb) {
  if (
    Math.trunc(vala) > Math.trunc(valb) - 3 &&
    Math.trunc(vala) < Math.trunc(valb) + 3
  ) {
    return true;
  } else {
    return false;
  }
}

function player(type, center, width, height, a, b, c, d) {
  createobj.call(this, type, center, width, height, a, b, c, d);
  this.t = this.c;
  this.xv = 0;
  this.yv = 0;
  this.loopin = true;
  this.slope = function (bcoords) {
    let slopes = Math.atan2(
      bcoords[1] - this.collisionbox.pos.y,
      bcoords[0] - this.collisionbox.pos.x
    ).toFixed(3);
    let am = 6.4;
    let bm = 6.4 * cos(22.8);

    let r =
      (am * bm) /
      Math.pow(
        Math.pow(bm * Math.cos(slopes), 2) + Math.pow(am * Math.sin(slopes), 2),
        0.5
      );
    this.xv = r * Math.cos(slopes);
    this.yv = r * Math.sin(slopes);
  };

  this.move = function (bcoords) {
    this.slope(bcoords);
    if (this.loopin == true) {
      this.collisionbox.pos.y = this.collisionbox.pos.y + this.yv;
      this.collisionbox.pos.x = this.collisionbox.pos.x + this.xv;

      if (this.xv > 0) {
        if (this.val != "sprites/run.gif") {
          this.loadimage("sprites/run.gif");
          this.c = 0;
        }
      } else if (this.xv < 0) {
        if (this.val != "sprites/rund.gif") {
          this.loadimage("sprites/rund.gif");
          this.c = this.t;
        }
      }
    }

    if (
      isbetween(this.collisionbox.pos.x, bcoords[0]) &&
      isbetween(this.collisionbox.pos.y, bcoords[1])
    ) {
      this.loopin = false;
      if (this.val != "sprites/idle.gif") {
        this.loadimage("sprites/idle.gif", 200, 200);
        this.c = 0;

      }
      xv = 0;
      yv = 0;
    } else {
      this.loopin = true;
    }
  };
}
