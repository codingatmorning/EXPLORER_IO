// var dlisplay=updatewindow();
function populate() {
  this.levelobjects = [];

  this.char = new player("box", [2500, 2500], 40, 40, 150, 150, -80, 60);
  this.char.loadimage("sprites/idle.gif", 200, 200);
  for (var i = 0; i < 65; ++i) {
    var tree;
    tree = new createobj("box", [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000)], 220, 80, 500, 500, -140, 0);
    tree.loadimage("sprites/tree_2.png");

    levelobjects.push(tree);
  }

  for (var i = 0; i < 40; ++i) {
    var bush;
    bush = new createobj("box", [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000)], 0, 0, 50, 85, 0, 0);
    bush.loadimage("sprites/foliage_1.png");
    levelobjects.push(bush);
  }

  for (var i = 0; i < 30; ++i) {

    var val = Math.floor(Math.random() * 3);
    var house;
    if (val == 0) {
      house = new createobj("box", [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000)], 300, 250, 400, 400, -50, 0);
      house.loadimage("sprites/building2_green.png");
    } else if (val == 1) {
      house = new createobj("box", [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000)], 350, 250, 400, 400, -50, 0);
      house.loadimage("sprites/building3_blue.png");
    } else {
      house = new createobj("box", [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000)], 350, 250, 400, 400, -50, 0);
      house.loadimage("sprites/building3_yellow.png");
    }
    levelobjects.push(house);
  }


  for (var i = 0; i < 100; ++i) {
    this.foliage = new createbackground("box", [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000)], 0, 0, 80, 40, 0, 0);
    var val = Math.floor(Math.random() * 3);
    if (val == 0) {
      foliage.loadimage("sprites/outside/flower.png");
      foliage.zIndex = -1;
    } else if (val == 1) {
      foliage.loadimage("sprites/outside/mushroom.png");
      foliage.zIndex = -1;
    } else {
      foliage.loadimage("sprites/outside/mushroom_2.png");
      foliage.zIndex = -1;
    }
    levelobjects.push(foliage);
  }
  for (var i = 0; i < 35; ++i) {
    var val = Math.floor(Math.random() * 2);
    if (val == 0) {
      this.rock = new createobj("box", [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000)], 65, 10, 65, 90, 0, 0
      );
      rock.loadimage("sprites/outside/rock.png");
    } else {
      this.rock = new createobj("box", [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000)], 60, 60, 60, 60, 0, 0);
      rock.loadimage("sprites/outside/rock_2.png");
    }
    levelobjects.push(rock);
  }
  this.twidth = 125;
  this.theight = 125;
  this.background = Array.from(
    Array(5000 / theight),
    () => new Array(5000 / twidth)
  );
  for (let i = 0; i < 5000 / theight; i++) {
    for (let j = 0; j < 5000 / twidth; j++) {
      this.tile = new createbackground("box", [j * twidth, i * theight], twidth, theight, twidth, theight, 0, 0);

      var val = Math.floor(Math.random() * 5);

      tile.loadimage("sprites/outside/grass_tile.png");

      background[i][j] = tile;
    }
  }
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
var id="";
function init() {
  removeAllChildNodes(sc);
  clearInterval(id);
  var a = document.getElementById("reset");
  a.onclick = function () {
    init();
  }
  //Get All Elements
  populate.call(this);

  //Init Mouse
  this.mhandler = new mousehandler();
  mhandler.mouseinit(win);
  //Make Sure collision boxes aren't clipping
  for (let i = 0; i < this.levelobjects.length; ++i) {
    for (let j = i + 1; j < this.levelobjects.length; j++) {
      collisionhandler(
        this.levelobjects[i].collisionbox,
        this.levelobjects[j].collisionbox
      );
    }
  }
  for (let i = 0; i < this.levelobjects.length; ++i) {
    for (let j = i + 1; j < this.levelobjects.length; j++) {
      collisionhandler(
        this.levelobjects[i].collisionbox,
        this.levelobjects[j].collisionbox
      );
    }
  }
  //Start Renderer
  const bound_renderer = renderer.bind(this);
  id = setInterval(bound_renderer, 33.3333333);
}
function renderer() {

  jg.clear();
  char.move(mhandler.bcoords);
  windows.calcwindow(char.collisionbox.pos.x, char.collisionbox.pos.y);
  char.render();

  for (let i = 0; i < this.levelobjects.length; i++) {
    levelobjects[i].render();
    collisionhandler(levelobjects[i].collisionbox, this.char.collisionbox);
  }
  let i = windows.posy / theight;
  let a = (windows.posy + windows.height) / theight;

  let b = (windows.posx + windows.width) / twidth;

  for (; i < a; i++) {
    for (let j = windows.posx / twidth; j < b; j++) {
      i = Math.floor(i);
      j = Math.floor(j);
      background[i][j].render();
    }
  }
}



if (window.addEventListener) {
  window.addEventListener("load", init, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", init);
}
