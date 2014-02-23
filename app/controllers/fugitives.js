var args = arguments[0] || {};

// Access fugitives collection.
var fugitives = Alloy.Collections.fugitives;
fugitives.fetch();

// Functions.
function addNew() {
  var newFugitiveController = Alloy.createController('newFugitive');
  var newFugitiveWindow = newFugitiveController.getView();
  newFugitiveWindow.open();
};