/*! HTML5Notification - v0.2.0 - 2016-04-05 */
(function(win, undefined) {
    /*
     Safari native methods required for Notifications do NOT run in strict mode.
     */
    //"use strict";
    // local variables
    var PERMISSION_DEFAULT = "default";
    // The user decision is unknown; in this case the application will act as if permission was denied.
    var PERMISSION_GRANTED = "granted";
    // The user has explicitly granted permission for the current origin to display system notifications.
    var PERMISSION_DENIED = "denied";
    // The user has explicitly denied permission for the current origin to display system notifications.
    // map for the old permission values
    var PERMISSIONS = [ PERMISSION_GRANTED, PERMISSION_DEFAULT, PERMISSION_DENIED ];
    /**
     * Notification
     * @constructor
     */
    function Notification() {}
    Object.defineProperty(Notification, "permission", {
        enumerable: true,
        get: function() {
            return PERMISSION_GRANTED;
        }
    });
    Object.defineProperty(Notification, "requestPermission", {
        enumerable: true,
        value: function(callback) {
            callback(this.permission);
        }
    });
    /**
     * IE Notification
     * @constructor
     */
    function IENotification() {}
    Object.defineProperty(IENotification, "permission", {
        enumerable: true,
        get: function() {
            var isTabPinned = win.external.msIsSiteMode();
            return isTabPinned ? PERMISSION_GRANTED : PERMISSION_DENIED;
        }
    });
    Object.defineProperty(IENotification, "requestPermission", {
        enumerable: true,
        value: function(callback) {
            callback(this.permission);
        }
    });
    /**
     * WebKit Notification
     * @constructor
     */
    function WebKitNotification() {}
    Object.defineProperty(WebKitNotification, "permission", {
        enumerable: true,
        get: function() {
            return PERMISSION[win.webkitNotifications.checkPermission()];
        }
    });
    Object.defineProperty(WebKitNotification, "requestPermission", {
        enumerable: true,
        value: function(callback) {
            win.webkitNotifications.requestPermission(callback);
        }
    });
    /*
        Check Notification support and create Notification
     */
    try {
        win.Notification = // W3C
        win.Notification || // Opera Mobile/Android Browser
        win.webkitNotifications && WebKitNotification || // IE9+ pinned site
        win.external && win.external.msIsSiteMode() !== undefined && IENotification;
    } catch (e) {} finally {
        // Use empty Notification in case no support detected
        win.Notification = win.Notification || Notification;
    }
    /*
        Safari6 do not support Notification.permission.
        Instead, it support Notification.permissionLevel()
     */
    if (!win.Notification.permission) {
        Object.defineProperty(win.Notification, "permission", {
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
    Object.defineProperty(win.Notification, "requestPermission", {
        enumerable: true,
        value: function() {
            var promise = this._requestPermission();
            /*
                Notification API says that calling Notification.requestPermission
                returns a promise. In case result is undefined, then we are dealing
                with the old spec/prefixed or custom implementation
             */
            if (!promise) {
                promise = {
                    then: function(callback) {
                        this._requestPermission(callback);
                    }.bind(this)
                };
            }
            return promise;
        }
    });
})(this);