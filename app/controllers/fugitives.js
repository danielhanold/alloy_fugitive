var args = arguments[0] || {};

// Access fugitives collection.
var fugitives = Alloy.Collections.fugitives;
fugitives.fetch();

// Functions.
function addNew() {
  alert('Add New fugitive');
};

// Release bindings when window is closed.
$.winFugitives.addEventListener('close', function() {
  $.destroy();
});