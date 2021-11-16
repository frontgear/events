/*!
 * Copyright (c) @crzyj
 *
 * Released under the MIT license:
 * https://opensource.org/licenses/MIT
 */

var Class = require("@frontgear/lang/Class");
var Event = require("./Event");

module.exports = Class("@frontgear/events/MEventTarget", function(MEventTarget)
{

	// Public Properties

	this.isEventTarget = true;

	// Public Methods

	this.on = function(event, listener, scope, priority)
	{
		event = Event.resolve(this, event);

		if (listener == null)
			throw new Error("Parameter listener must be non-null.");
		if (!Class.isFunction(listener))
			throw new Error("Parameter listener must be of type Function.");
		if ((priority != null) && !Class.isNumber(priority))
			throw new Error("Parameter priority must be of type Number.");

		if (scope == null)
			scope = this;
		if ((priority == null) || isNaN(priority))
			priority = 0;

		event.on(this, listener, scope, priority);

		return this;
	};

	this.off = function(event, listener, scope)
	{
		if (scope != null)
		{
			event = Event.resolve(this, event);

			if (listener == null)
				throw new Error("Parameter listener must be non-null.");
			if (!Class.isFunction(listener))
				throw new Error("Parameter listener must be of type Function.");

			event.off(this, listener, scope);
		}
		else if (listener != null)
		{
			event = Event.resolve(this, event);

			if (!Class.isFunction(listener))
				throw new Error("Parameter listener must be of type Function.");

			event.off(this, listener, this);
		}
		else if (event != null)
		{
			event = Event.resolve(this, event);

			event.offAll(this);
		}
		else
		{
			Event.offAll(this);
		}

		return this;
	};

	this.fire = function(event, eventData)
	{
		event = Event.resolve(this, event);

		if (eventData == null)
			eventData = event.createEventData();
		else if (!event.isValidType(eventData))
			throw new Error("Data fired on event \"" + event.name() + "\" must be of type " + event.getTypeName() + ".");

		return event.fire(this, eventData);
	};

	this.hasListeners = function(event)
	{
		if (event != null)
		{
			event = Event.resolve(this, event);

			return event.hasListeners(this);
		}
		else
		{
			return Event.hasListeners(this);
		}
	};

	this.getBubbleTarget = function()
	{
		return null;
	};

});
