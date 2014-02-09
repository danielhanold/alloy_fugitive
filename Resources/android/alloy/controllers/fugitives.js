function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "fugitives";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.fugitives = Ti.UI.createWindow({
        title: "Fugitives",
        id: "fugitives"
    });
    $.__views.fugitives && $.addTopLevelView($.__views.fugitives);
    $.__views.tableFugitives = Ti.UI.createTableView({
        backgroundImage: "grain.png",
        id: "tableFugitives"
    });
    $.__views.fugitives.add($.__views.tableFugitives);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;