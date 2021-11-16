/*!
 * Copyright (c) @crzyj
 *
 * Released under the MIT license:
 * https://opensource.org/licenses/MIT
 */

var Class = require("@frontgear/lang/Class");
var Event = require("./Event");

module.exports = Class("@frontgear/events/CascadingEvent", Event, function(CascadingEvent, base)
{

	// Private Properties

	this._nextEvent = null;

	// Constructor

	this.constructor = function(name, nextEvent, type, bubbles, cancelable)
	{
		if (nextEvent == null)
			throw new Error("Parameter nextEvent must be non-null.");
		if (!(nextEvent instanceof Event))
			throw new Error("Parameter nextEvent must be of type " + Class.getName(Event) + ".");

		var nextEventType = nextEvent.type();
		if (type == null)
			type = nextEventType;
		else if (!Class.isFunction(type))
			throw new Error("Parameter type must be of type Function.");
		else if ((type !== nextEventType) && !Class.isSubclassOf(type, nextEventType))
			throw new Error("Parameter type must be a subclass of " + (Class.getName(nextEventType) || "nextEvent.type") + ".");

		if (bubbles == null)
			bubbles = nextEvent.bubbles();
		if (cancelable == null)
			cancelable = nextEvent.cancelable();

		base.constructor.call(this, name, type, bubbles, cancelable);

		this._nextEvent = nextEvent;
	};

	// Public Accessor Methods

	this.nextEvent = function()
	{
		return this._nextEvent;
	};

	// Public Methods

	this.notifyListeners = function(target, eventData)
	{
		base.notifyListeners.call(this, target, eventData);
		if (!eventData.isPropagationStopped())
			this._nextEvent.notifyListeners(target, eventData);
	};

	this.notifyBubbleListeners = function(bubbleTargets, eventData)
	{
		if (this.bubbles())
			base.notifyBubbleListeners.call(this, bubbleTargets, eventData);
		else
			this._nextEvent.notifyBubbleListeners(bubbleTargets, eventData);
	};

	this.getBubbleTargets = function(target)
	{
		if (this.bubbles())
			return base.getBubbleTargets.call(this, target);
		else
			return this._nextEvent.getBubbleTargets(target);
	};

});
