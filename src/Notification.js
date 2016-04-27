/** @namespace window */
/** @namespace window.webkitNotifications */
/** @namespace window.external */

;(function(win, undefined) {
    /*
     Safari native methods required for Notifications do NOT run in strict mode.
     */
    //"use strict";

    // local variables
    var PERMISSION_DEFAULT      = 'default'; // The user decision is unknown; in this case the application will act as if permission was denied.
    var PERMISSION_GRANTED      = 'granted'; // The user has explicitly granted permission for the current origin to display system notifications.
    var PERMISSION_DENIED       = 'denied'; // The user has explicitly denied permission for the current origin to display system notifications.
    var PERMISSION_NOTSUPPORTED = 'notsupported'; // The Notification API is not supported on current environment
    // map for the old permission values
    var PERMISSIONS = [PERMISSION_GRANTED, PERMISSION_DEFAULT, PERMISSION_DENIED, PERMISSION_NOTSUPPORTED];

    /*
        IE does not support Notifications in the same meaning as other modern browsers.
        On the other side, IE9+(except MS Edge) implement flashing pinned site taskbar buttons.
        Each time new IE Notification is create, previous flashing and icon overlay is cleared.
        So, we need to keep track of the notification that calls close method.
     */
    var IENotificationIndex = -1;





    /**
     * Notification
     * @constructor
     */
    function Notification(title, options) {
        if (!arguments.length) {
            throw TypeError('Failed to construct \'Notification\': 1 argument required, but only 0 present.');
        }

        Object.defineProperties(this, {
            'body': { value: (options && options.body) || '' },
            'data': { value: (options && options.data) || null },
            'dir': { value: (options && options.dir) || 'auto' },
            'icon': { value: (options && String(options.icon)) || '' },
            'lang': { value: (options && String(options.lang)) || '' },
            'requireInteraction': { value: (options && Boolean(options.requireInteraction)) || false },
            'silent': { value: (options && Boolean(options.silent)) || false },
            'tag': { value: (options && String(options.tag)) || '' },
            'title': { value: String(title) }
        });
    }
    Object.defineProperty(Notification, 'permission', {
        enumerable: true,
        get: function() {
            return PERMISSION_NOTSUPPORTED;
        }
    });
    Object.defineProperty(Notification, 'requestPermission', {
        enumerable: true,
        writable: true,
        value: function(callback) {
            callback(this.permission);
        }
    });
    Notification.prototype.toString = function() {
        return 'Notification';
    }





    /**
     * IE Notification
     * @constructor
     */
    function IENotification(title, options) {
        var notificationIndex = IENotificationIndex;

        Notification.apply(this, arguments);

        Object.defineProperties(this, {
            close: {
                value: function() {
                    if (notificationIndex === IENotificationIndex) {
                        win.external.msSiteModeClearIconOverlay();
                    }
                }
            }
        });

        // Clear any previous icon overlay
        this.close();

        // Set icon
        win.external.msSiteModeSetIconOverlay(this.icon, this.description || this.title);

        // Blink icon
        win.external.msSiteModeActivate();

        notificationIndex = ++IENotificationIndex;
    }
    Object.defineProperty(IENotification, 'permission', {
        enumerable: true,
        get: function() {
            var isTabPinned = win.external.msIsSiteMode();
            return isTabPinned ? PERMISSION_GRANTED : PERMISSION_DENIED;
        }
    });
    Object.defineProperty(IENotification, 'requestPermission', {
        enumerable: true,
        writable: true,
        value: function(callback) {
            alert(this.PERMISSION_REQUEST_MESSAGE);
            callback(this.permission);
        }
    });

    Object.defineProperty(IENotification, 'PERMISSION_REQUEST_MESSAGE', {
        writable: true,
        value: 'IE supports notifications in pinned mode only. Pin this page on your taskbar to receive notifications.'
    });

    IENotification.prototype = Notification.prototype;





    /**
     * WebKit Notification
     * @constructor
     */
    function WebKitNotification(title, options) {
        Notification.call(this);

        var notification = new webkitNotifications(title, options);
    }
    Object.defineProperty(WebKitNotification, 'permission', {
        enumerable: true,
        get: function() {
            return PERMISSIONS[win.webkitNotifications.checkPermission()];
        }
    });
    Object.defineProperty(WebKitNotification, 'requestPermission', {
        enumerable: true,
        writable: true,
        value: function(callback) {
            win.webkitNotifications.requestPermission(callback);
        }
    });
    WebKitNotification.prototype = Notification.prototype;





    /*
        Check Notification support and create Notification
     */
    try {
        win.Notification = (
            // W3C
            win.Notification ||
            // Opera Mobile/Android Browser
            (win.webkitNotifications && WebKitNotification) ||
            // IE9+ pinned site
            (win.external && win.external.msIsSiteMode() !== undefined && IENotification)
        );
    } catch(e) {
        // IE check may throws an exception in other browsers
    } finally {
        // Use empty Notification in case no support detected
        win.Notification = win.Notification || Notification;
    }



    /*
        Safari6 do not support Notification.permission.
        Instead, it support Notification.permissionLevel()
     */
    if (!win.Notification.permission) {
        Object.defineProperty(win.Notification, 'permission', {
            enumerable: true,
            get: function() {
                return this.permissionLevel();
            }
        });
    }

    /*
        Notification.requestPermission should return a Promise(by spec).
        Keep the original method and replace it with a custom one that
        checks if the call of Notification.requestPermission returns a promise
        and if not, then return a custom object that simulates the Promise object.

        Specification:
        Notification.requestPermission().then(callback);

        Old Spec:
        Notification.requestPermission(callback);
     */
    win.Notification._requestPermission = win.Notification.requestPermission;
    Object.defineProperty(win.Notification, 'requestPermission', {
        enumerable: true,
        value: function() {
            var newPermission;
            var userCallback;
            this._requestPermission(function(permission) {
                newPermission = permission;

                if (userCallback) {
                    userCallback(permission);
                }
            });
            
            /*
                Notification API says that calling Notification.requestPermission
                returns a promise. In case result is undefined, then we are dealing
                with the old spec/prefixed or custom implementation
             */
            return promise = {
                then: function(callback) {
                    if (typeof callback !== 'function') {
                        return;
                    }

                    userCallback = callback;

                    if (newPermission) {
                        callback(newPermission);
                    }
                }.bind(this)
            }
        }
    });
}(window));
