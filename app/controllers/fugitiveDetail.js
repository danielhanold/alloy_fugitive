var args = arguments[0] || {};

Ti.API.info('args passed to fugitive detail window');
Ti.API.info(JSON.stringify(args));

// Set defaults and popuplate with model data, if available.
var title = 'Fugitive';
var captured = false;
var capturedText = 'At Large';
if (args.model instanceof Backbone.Model) {
  title = args.model.get('name');
  captured = args.model.get('captured');
  capturedText = (captured === true) ? 'Captured' : 'At Large';
}

$.win.setTitle(title);
$.labelStatus.setText(capturedText);

// Enable capture button if fugitive is still at large.
if (captured === false) {
  $.buttonCapture.setEnabled(true);
}

// Functions //
function showDeleteAlert(e) {
  $.dialogDelete.show();
}

function confirmDelete(e) {
  // Only delete if this user confirms deletion.
  if (e.index === 0) {
    $.win.close();
  }
}

// Enable the back button on Android.
if (OS_ANDROID) {
  $.win.addEventListener('open', function(e) {
    if (this.activity) {
      Ti.API.info('detected activity');
      var actionBar = this.activity.actionBar;
      if (actionBar) {
        actionBar.displayHomeAsUp = true;
        actionBar.onHomeIconItemSelected = function() {
          $.win.close();
        };
      }
    }
  });
}