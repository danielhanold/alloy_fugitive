var args = arguments[0] || {};

function rowClick(e) {
  Ti.API.info('User clicked on table view row');
  //Ti.API.info(JSON.stringify(e));

  // Create the fugitive detail window.
  var fugitiveDetailController = Alloy.createController('fugitiveDetail');
  var fugitiveDetailWindow = fugitiveDetailController.getView();

  // Open the fugitive detail window.
  // On iOS, open in the current tab.
  if (OS_IOS) {
    Alloy.Globals.tabGroup.activeTab.open(fugitiveDetailWindow);
  }
  // On Android, simply open.
  if (OS_ANDROID) {
    fugitiveDetailWindow.open();
  }
};