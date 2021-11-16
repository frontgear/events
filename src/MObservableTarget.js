/*!
 * Copyright (c) @crzyj
 *
 * Released under the MIT license:
 * https://opensource.org/licenses/MIT
 */

var Class = require("@frontgear/lang/Class");
var Event = require("./Event");
var EventData = require("./EventData");

module.exports = Class("@frontgear/events/MObservableTarget", function(MObservableTarget)
{

	// Public Properties

	this.isObservableTarget = true;

	// Public Events

	this.changed = new Event("changed", EventData);

});
