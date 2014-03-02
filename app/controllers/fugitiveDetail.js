var args = arguments[0] || {};

Ti.API.info('args passed to fugitive detail window');
Ti.API.info(JSON.stringify(args));

// Set default arguments.
var title = args.name || 'Fugitive';
var captured = args.captured || false;
var capturedText = (captured === true) ? 'Captured' : 'At Large';

$.win.setTitle(title);
$.labelStatus.setText(capturedText);

// Enable capture button if fugitive is still at large.
if (captured === false) {
  $.buttonCapture.setEnabled(true);
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