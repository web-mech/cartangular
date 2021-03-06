define(['core/Class'],function(Class){
    'use strict';

    //Ply - https://github.com/rafikk/ply.git
    
    // ## Private Variables
    // Create private variables. `listeners` is an associative array holding arrays of
    // notification listeners keyed on the notification name.
    var listeners = {},
        // id used to uniquely identify listeners for use in ignore.
        id = 0,
        debug = false;

    // ## Public Methods/Properties
    var Event = Class.extend({
        init:function(){

        },
        // ### Notify
        // Notifies listeners of an event. Notifiers should send themselves
        // and optional data as arguments.
        notify: function (note, sender, data) {

            // Cache listeners array or create a new array, assign, and cache it.
            var list = listeners[note] || (listeners[note] = []),
                // Create loop variables.
                i = 0,
                len = list.length;

            // Loop over listeners and notify each.
            for (; i < len; i++) {
                list[i].handler.call(list[i].listener, note, sender, data);
            }

        },

        // ### Listen
        // Listens for a particular notification or set of notifications.
        // Clients should pass in a handler function and themselves as arguments.
        // When the handler function is called, it will be applied to the `listener`'s
        // scope, ensuring that `this` refers to what the client expects.
        listen: function (notification, handler, listener) {

            // Cache the notification's listeners if it exists or create and cache
            // a new array otherwise.
            var list  = listeners[notification] || (listeners[notification] = []),
                // Split the notification on whitespace. Clients can listen to
                // multiple notifications by passing in a string with the notification
                // names split by whitespace.
                notes = notification.split(/\s/),
                // Create loop variables.
                len = notes.length,
                i = 0;

            // If the notification name contains whitespace,
            // listen on each particular notification (segment).
            if (len > 1) {
                for (; i < len; i++) {
                    this.listen(notes[i], handler, listener);
                }

                return;
            }

            // Add the listener and handler function to the notifications array.
            list.push({
                id: id += 1,
                handler: handler,
                listener: listener
            });
            
            // return handle used to ignore.
            return [notification, id];
        },

        // ### Ignore
        // Removes a particular notification from listeners object.
        // Clients should pass in the returned handle from `Ply.core.listen`.
        ignore: function (handle) {
            
            var note = handle[0];

            if (listeners[note]) {
                for(var i=0; i < listeners[note].length; i++){
                    if (this.id === handle[1]) {
                        listeners[note].splice(i, 1);
                    }
                }
            }

            return;
        },

        // ### Log
        // Lightweight logging wrapper around `console`. Useful less so
        // for debugging than for posting notices of interest.
        log: function (msg, type) {

            // Do nothing if debug mode is disabled.
            if (!debug) {
                return;
            }

            // Use the correct logging mechanism based
            // on the parameter type.
            if (window.console) {

                switch (type) {
                case 'warn':
                    window.console.warn(msg);
                    break;

                case 'info':
                    window.console.info(msg);
                    break;

                default:
                    window.console.log(msg);
                    break;
                }
            }

        },

        // ### Error
        // Method to catch JavaScript errors. All Ply methods are run in a `try/catch` block,
        // with exceptions being passed to this method.
        error: function (ex, sev) {

            // If an `onError` callback function is defined in `Ply.config.core`, call it.
            // Note that implementing this callback is highly recommended. See the sample implementation
            // in `Ply.config`.
            if (Ply.config.core.onError && typeof Ply.config.core.onError === 'function') {
                // Pass in the exception and the severity to the handler.
                Ply.config.core.onError(ex, sev);

                return;
            }

            // If no error handler is defined, simply throw the error.
            throw ex;

        },

        // ### Debug
        // Enabled debugging when called with no argues or with any truthy value. To disable debug mode
        // send `false` or another falsy value to this function, e.g.: `Ply.core.debug(0)`.
        debug: function (val) {

            // Default to `true` if no arguments.
            debug = typeof val === 'undefined' ? true : val;

            if (debug) {
                // Print debug notice.
                this.log('debugging...', 'info');

                // Manually set `this.debugOn` in case debug is set after Ply has been initialized.
                // `debugOn` will still be cached to the old value.
                this.debugOn = true;
            }
            else {
                // Do the opposite.
                this.debugOn = false;
            }
        },

        // ### Debug on
        // Cache the value of debug. This is used by clients to determine
        // if debug mode is currently enabled.
        debugOn: (function () {
            // Coerce the value to a boolean.
            return !!debug;
        }())
    });

    return new Event();
});


    