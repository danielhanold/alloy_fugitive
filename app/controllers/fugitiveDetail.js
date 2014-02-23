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