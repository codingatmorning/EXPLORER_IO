//put in array and it will make box
function createcollision(center, ar) {
  let points = [];
  for (i in ar) {
    let a = new SAT.Vector(ar[i][0], ar[i][1]);
    points.push(a);
  }
  return new SAT.Polygon(center, points);
}

function createelipse(a, b) {
  this.angle;
  this.points = [];
  for (var i = 0; i < 360; ++i) {
    this.angle = (i * Math.PI) / 180;
    this.r =
      1 /
      Math.pow(
        Math.pow(Math.cos(angle) / a, 2) +
          Math.pow(Math.sin(angle) / (b * sin(22.8)), 2),
        0.5
      );
    this.x = r * Math.cos(angle);
    this.y = r * Math.sin(angle);
    this.tempa = [x, y];
    this.points.push(tempa);
  }
  return this.points;
}

function createbox(width, height) {
  this.h = height;
  this.w = width;
  this.points = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  return this.points;
}

 function collisionhandler(obj1, obj2) {
  var bresponse = new SAT.Response();
  if (SAT.testPolygonPolygon(obj1, obj2, bresponse)) {
    obj2.pos.x = obj2.pos.x + bresponse.overlapV.x;
    obj2.pos.y = obj2.pos.y + bresponse.overlapV.y;
    bresponse.clear();
  } else {
    //do nothing
  }
}