/*!
 * Copyright (c) @crzyj
 *
 * Released under the MIT license:
 * https://opensource.org/licenses/MIT
 */

var Class = require("@frontgear/lang/Class");

module.exports = Class("@frontgear/events/EventData", Object, function(EventData, base)
{

	// Public Properties

	this.event = null;
	this.target = null;
	this.currentEvent = null;
	this.currentTarget = null;

	// Private Properties

	this._isDefaultPrevented = false;
	this._isPropagationStopped = false;
	this._isImmediatePropagationStopped = false;

	// Public Methods

	this.preventDefault = function()
	{
		this._isDefaultPrevented = true;
	};

	this.stopPropagation = function()
	{
		this._isPropagationStopped = true;
	};

	this.stopImmediatePropagation = function()
	{
		this._isImmediatePropagationStopped = true;
		this.stopPropagation();
	};

	this.isDefaultPrevented = function()
	{
		return this._isDefaultPrevented;
	};

	this.isPropagationStopped = function()
	{
		return this._isPropagationStopped;
	};

	this.isImmediatePropagationStopped = function()
	{
		return this._isImmediatePropagationStopped;
	};

	this.resetPropagation = function()
	{
		this._isPropagationStopped = false;
		this._isImmediatePropagationStopped = false;
	};

});
