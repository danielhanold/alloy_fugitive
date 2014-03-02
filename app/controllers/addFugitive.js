var args = arguments[0] || {};

// Functions.
$.createFugitive.addEventListener('click', function(e) {
  // Ensure name was entered.
  var name = $.fugitiveName.getValue().trim();
  Ti.API.info('Fugitive Name: ' + name);

  // If no name is present, show an alert dialog.
  if (_.isEmpty(name)) {
    alert('You have to enter a name');
  }
  // If name is present, save model and add to collection.
  else {
    var fugitives = Alloy.Collections.fugitives;
    var fugitive = Alloy.createModel('fugitives', {
      name: name
    });
    Ti.API.info('Add fugitive: ' + name);

    // Add this fugitive to the collection.
    fugitives.add(fugitive);

    // Save this fugitive in the database.
    fugitive.save();

    // Close the window.
    closeWindow();
  }
});

/**
* Close the window.
*/
function closeWindow() {
  // On iOS, close the navigation window.
  if (OS_IOS) {
    $.navWin.close();
  }

  // On Android, simply close the window.
  if (OS_ANDROID) {
    $win.close();
  }
}