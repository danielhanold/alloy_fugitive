var args = arguments[0] || {};

Ti.API.info('args passed to fugitive detail window');
Ti.API.info(JSON.stringify(args));

// Get data from model.
var title = args.model.get('name');
var captured = args.model.get('captured');
var capturedText = (captured === true) ? 'Captured' : 'At Large';

// Populate window.
$.win.setTitle(title);
$.labelStatus.setText(capturedText);

// Enable capture button if fugitive is still at large.
if (captured === 0) {
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
    args.model.destroy();
  }
}

/**
* Capture a fugitive.
*/
function eventClickCapture() {
  args.model.save({captured: 1});
  $.win.close();
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