/*!
 * Copyright (c) @crzyj
 *
 * Released under the MIT license:
 * https://opensource.org/licenses/MIT
 */

var Class = require("@frontgear/lang/Class");
var EventData = require("./EventData");

module.exports = Class("@frontgear/events/ErrorEventData", EventData, function(ErrorEventData, base)
{

	// Public Properties

	this.error = null;

	// Constructor

	this.constructor = function(error)
	{
		this.error = error;
	};

});
