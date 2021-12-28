var win = document.getElementById("window");
var sc = document.getElementById("screen");

function sin(a) {
  return Math.sin((Math.PI * a) / 180);
}
function cos(a) {
  return Math.cos((Math.PI * a) / 180);
}

function sinr(a) {
  return Math.sin(a).toFixed(3);
}
function cosr(a) {
  return Math.cos(a).toFixed(3);
}

function append(e) {
  sc.appendChild(e);
}
function remove(e) {
  sc.removeChild(e);
}

function createwindow() {
  this.width = 1280;
  this.height = 720;
  this.posx = 0;
  this.posy = 0;
  this.calcwindow = function (x, y) {
    this.posx = x - this.width / 2;
    this.posy = y - this.height / 2;

    sc.style.cssText =
      "margin-left:" +
      String(-this.posx) +
      "px; margin-top:" +
      String(-this.posy) +
      "px;";
  };
}


var windows = new createwindow();
