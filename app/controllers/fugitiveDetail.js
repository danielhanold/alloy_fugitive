var args = arguments[0] || {};

Ti.API.info('args passed to fugitive detail window');
Ti.API.info(JSON.stringify(args));

// Get data from model.
var title = args.model.get('name');
var captured = args.model.get('captured');
var capturedText = (captured === 1) ? 'Captured' : 'At Large';

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

/**
* Allow the user to select where the image
* should be selected from.
*/
function showImageOptions() {
  $.optionDialogImage.show();
}

/**
* Store the photo in a directory on the filesystem.
*
* @param e.blob
*   Blob to store on the file system.
* @param e.filename
*   Name to use for file storage.
*/
function storeFile(e, callback) {
  e = e || {};
  callback = callback || function() {};

  // Ensure blob and filename are available.
  if (_.isUndefined(e.blob) || _.isUndefined(e.filename)) {
    callback(true, null);
  }

  // Determine the extension.
  var mimeType = e.blob.getMimeType();
  var fileExtension = '';
  if (mimeType.indexOf('/')) {
    var elements = mimeType.split('/');
    fileExtension = elements[elements.length - 1];
  }

  var filename = 'photo-' + String(e.filename) + '.' + fileExtension;
  var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
  file.write(e.blob);
  Ti.API.info('Successfully wrote file. nativePath = ' + file.getNativePath());

  // Nullify stuff.
  e.blob = null;
  callback(null, file);
}

/**
* Take the photo.
*/
function selectPhoto(e) {
  /**
  * User cancels photo selection.
  */
  function optionsCancel(e) {
    Ti.API.error('User cancelled photo upload');
  }

  /**
  * There was an error in the photo upload.
  */
  function optionError(e) {
    Ti.API.error('There was an error selecting the photo');
    alert('Your photo could not be selected. Please try again.');
  }

  /**
  * Successful photo selection.
  */
  function optionSuccess(e) {
    e = e || {};
    if (e.media) {
      storeFile({
        blob: e.media,
        filename: args.model.id
      }, function(error, file) {
        if (error) {
          alert('Something went wrong. Please try again later.');
          return;
        }

        // Store the native path as the url in the fugitive model.
        args.model.save({
          url: file.getNativePath()
        });

        // Set the stored blob in the image view.
        $.fugitiveImage.setImage(file.read());
      });
    }
  }

  // Define options for both taking a new photo
  // and selecting the photo from the gallery.
  var options = {
    allowEditing: true,
    mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
    cancel: optionsCancel,
    error: optionError,
    success: optionSuccess
  };

  switch (e.index) {
  case 0:
    // Upload from photo gallery.
    Ti.Media.openPhotoGallery(options);
    break;

  case 1:
    // Upload from camera. Ensure this is not a simulator.
    if (Titanium.Platform.model == 'google_sdk' || Titanium.Platform.model == 'Simulator') {
      alert('You cannot take a photo on the simulator');
      return;
    }

    Ti.Media.showCamera(options);
    break;
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