//key events
function keyboardhandler() {
  if (window.addEventListener) {
    window.addEventListener("keydown", handlekeypress, false);
  } else if (window.attachEvent) {
    window.attachEvent("onkeydown", handlekeypress);
  }
}

function handlekeypress(e) {
  if (
    e.key == "ArrowLeft" ||
    e.key == "ArrowUp" ||
    e.key == "ArrowRight" ||
    e.key == "ArrowDown"
  ) {
    e.preventDefault();
  }
}
