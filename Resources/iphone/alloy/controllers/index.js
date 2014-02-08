function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.windowFugitives = Alloy.createController("fugitives", {
        id: "windowFugitives"
    });
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.windowFugitives.getViewEx({
            recurse: true
        }),
        title: "Fugitives",
        icon: "fugitives.png",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.windowCaptured = Alloy.createController("captured", {
        id: "windowCaptured"
    });
    $.__views.__alloyId3 = Ti.UI.createTab({
        window: $.__views.windowCaptured.getViewEx({
            recurse: true
        }),
        title: "Captured",
        icon: "captured.png",
        id: "__alloyId3"
    });
    __alloyId0.push($.__views.__alloyId3);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;