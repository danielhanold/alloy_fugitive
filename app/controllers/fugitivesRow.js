var args = arguments[0] || {};

function rowClick(e) {
  Ti.API.info('User clicked on table view row');
  Ti.API.info(JSON.stringify(e));
};