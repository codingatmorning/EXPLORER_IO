var jg = new jsGraphics(sc);
function createobj(type, center, w, h, a, b, c, d) {
  //main vars
  this.p = document.createElement("img");
  this.c = c;
  this.d = d;
  this.collisionbox;
  this.zindex = 0;
  this.width = w;
  this.height = h;
  this.rheight = b;
  this.rwidth = a;
  this.infomatic;
  this.timer;
  if (type == "box") {
    let a = new SAT.Box(
      new SAT.Vector(center[0], center[1]),
      this.width,
      this.height
    );
    // this.collisionbox=a.toPolygon();
    this.collisionbox = new SAT.Polygon(new SAT.Vector(center[0], center[1]), [
      new SAT.Vector(),
      new SAT.Vector(this.width, 0),
      new SAT.Vector(this.width, this.height),
      new SAT.Vector(0, this.height),
    ]);
    // console.log(this.collisionbox);
  } else {
    //do nothing
  }

  //default eventlisteners
  if (this.p.addEventListener) {
    this.p.addEventListener(
      "mousedown",
      function (e) {
        return false;
      },
      false
    );
    this.p.addEventListener(
      "drag",
      function (e) {
        return false;
      },
      false
    );
  } else if (this.p.attachEvent) {
    this.p.attachEvent("onmousedown", function (e) {
      return false;
    });
    this.p.attachEvent("ondrag", function (e) {
      return false;
    });
  }

  //All the methods of the objects
  //change animation

  this.loadimage = function (src) {
    this.val = src;
    this.p.setAttribute("src", src);
    this.p.setAttribute("width", this.rwidth);
    this.p.setAttribute("height", this.rheight);
    this.p.setAttribute("draggable", "false");
    this.p.style.cssText = "position:absolute;  user-select: none;";
  };

  //change scale of the image
  this.scale = function (scale) {
    this.p.setAttribute("width", scale);
    this.p.setAttribute("height", "auto");
  };

  //update on screen
  this.render = function () {
    let a = this.collisionbox.pos.x + this.c;
    let b = this.collisionbox.pos.y - this.rheight + this.height + this.d;
    // jg.setColor("#000fff"); // blue
    // jg.drawRect(
    //   this.collisionbox.pos.x,
    //   this.collisionbox.pos.y,
    //   this.width,
    //   this.height
    // );
    // jg.paint();
    if (a > windows.width + windows.posx || a < windows.posx - this.rwidth || b < windows.posy - this.rheight || b > windows.posy + windows.height) {
      this.p.style.visibility = "hidden";
    } else {
      this.p.style.visibility = "visible";
      this.p.style.cssText =
        "position:absolute; user-select: none;" +
        "; left:" +
        String(a) +
        "px; top:" +
        String(b) +
        "px;";
      this.p.style.zIndex = String(parseInt(this.collisionbox.pos.y + this.height + this.d));
      //this.p.setAttribute("zIndex",String(this.collisionbox.pos[1].toFixed(0)));
    }
    append(this.p);
  };
}

function createbackground(type, center, w, h, a, b, c, d) {
  createobj.call(this, type, center, w, h, a, b, c, d);
  this.zIndex = -2;
  this.render = function () {
    let a = this.collisionbox.pos.x + this.c;
    let b = this.collisionbox.pos.y - this.rheight + this.height + this.d;
    if (
      a > windows.width + windows.posx ||
      a < windows.posx - this.rwidth ||
      b < windows.posy - this.rheight ||
      b > windows.posy + windows.height
    ) {
      this.p.style.visibility = "hidden";
    } else {
      this.p.style.visibility = "visible";
      this.p.style.cssText =
        "position:absolute; user-select: none;" +
        "; left:" +
        String(a) +
        "px; top:" +
        String(b) +
        "px;";
    }
    this.p.style.zIndex = this.zIndex;
    append(this.p);
  };
}
