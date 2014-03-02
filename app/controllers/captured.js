var args = arguments[0] || {};

// Access fugitives collection.
var fugitives = Alloy.Collections.fugitives;
fugitives.fetch();

// Release bindings when window is closed.
$.win.addEventListener('close', function() {
  $.destroy();
});