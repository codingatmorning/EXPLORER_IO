//variable declerations
function mousehandler() {
  this.mstate = [];
  this.mcoords = [20, 20];
  this.called = false;
  this.state = 10;
  this.bcoords = [0, 0];
  this.mouseinit = function (element) {
    const that = this;
    var handler = function (e) { mouseHandler(e, that) };
    element.addEventListener('mousedown', handler, false);
    element.addEventListener('touchstart', function (e) { var event = new MouseEvent("replace", { clientX: e.clientX, clientY: e.clientY }); handler(event); }, false);
  }

  const mouseHandler = function (e, a) {
    // e.preventDefault();
    a.mcoords = [e.clientX, e.clientY];
    a.bcoords[0] = a.mcoords[0] + windows.posx;
    a.bcoords[1] = a.mcoords[1] + windows.posy;

  }


}



(function (window) {
  try {
    new MouseEvent('test');
    return false; // No need to polyfill
  } catch (e) {
    // Need to polyfill - fall through
  }

  // Polyfills DOM4 MouseEvent
  var MouseEventPolyfill = function (eventType, params) {
    params = params || { bubbles: false, cancelable: false };
    var mouseEvent = document.createEvent('MouseEvent');
    mouseEvent.initMouseEvent(eventType,
      params.bubbles,
      params.cancelable,
      window,
      0,
      params.screenX || 0,
      params.screenY || 0,
      params.clientX || 0,
      params.clientY || 0,
      params.ctrlKey || false,
      params.altKey || false,
      params.shiftKey || false,
      params.metaKey || false,
      params.button || 0,
      params.relatedTarget || null
    );

    return mouseEvent;
  }

  MouseEventPolyfill.prototype = Event.prototype;

  window.MouseEvent = MouseEventPolyfill;
})(window);


