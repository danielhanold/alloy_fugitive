var args = arguments[0] || {};

// Access fugitives collection.
var fugitives = Alloy.Collections.fugitives;
fugitives.fetch();

// Functions.
function addNew() {
  var addFugitiveController = Alloy.createController('addFugitive');
  var addFugitiveView = addFugitiveController.getView();
  addFugitiveView.open({
    modal: true
  });
};

// Release bindings when window is closed.
$.winFugitives.addEventListener('close', function() {
  $.destroy();
});