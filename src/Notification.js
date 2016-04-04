;(function(win, undefined) {
    /*
     Safari native methods required for Notifications do NOT run in strict mode.
     */
    //"use strict";

    /**
     * Notification
     * @constructor
     *
     * Notification constructor for dummy Notification object and
     * filling gaps in some browsers that do not support full API
     */
    function Notification() {
        // Safari 6 do not support Notification.permission
        if (!this.permission) {
            // Check for Notification.permissionLevel()
            if (this.permissionLevel) {
                Object.defineProperty(this, 'permission', {
                    enumerable: true,
                    get: function() {
                        return this.permissionLevel();
                    }
                });
            } else {
                // Set default granted permissions
                this.permission = PERMISSION_GRANTED;
            }
        };

        this._requestPermission = this.requestPermission || function(callback) {
                callback(PERMISSION_GRANTED);
            };

        this.requestPermission = function() {
            return (this._requestPermission() ||
                function() {
                    return {
                        then: function(callback) {
                            this._requestPermission(callback);
                        }
                    }
                }
            );
        };
    }

    /**
     * IE Notification
     * @constructor
     */
    function IENotification() {
        this.permission = PERMISSION_GRANTED;
        this.requestPermission = function() {};
    }

    IENotification.prototype = Notification.prototype;

    /**
     * Firefox Mobile Notification
     * @constructor
     */
    function MozNotification() {
        this.permission = PERMISSION_GRANTED;
        this.requestPermission = function() {
            return {
                then: function(callback) {
                    callback(PERMISSION_GRANTED);
                }
            }
        };
    }

    MozNotification.prototype = Notification.prototype;

    /**
     * WebKit Notification
     * @constructor
     */
    function WebKitNotification() {
        this.permission = PERMISSION_GRANTED;
        this.requestPermission = function() {};
    }

    WebKitNotification.prototype = Notification.prototype;

    // local variables
    var PERMISSION_DEFAULT  = "default"; // The user decision is unknown; in this case the application will act as if permission was denied.
    var PERMISSION_GRANTED  = "granted"; // The user has explicitly granted permission for the current origin to display system notifications.
    var PERMISSION_DENIED   = "denied"; // The user has explicitly denied permission for the current origin to display system notifications.
    // map for the old permission values
    var PERMISSIONS = [PERMISSION_GRANTED, PERMISSION_DEFAULT, PERMISSION_DENIED];

    var notification        = (function() {
        var notification;
        try {
            notification = (
                // W3C
                (win.Notification && Notification.call(win.Notification)) ||
                // Firefox Mobile
                (navigator.mozNotification && new MozNotification) ||
                // Chrome/Android Browser/Opera Mobile
                (win.webkitNotifications && new WebKitNotification) ||
                // IE9+ pinned tab
                (win.external && win.external.msIsSiteMode() !== undefined && new IENotification) ||
                // Dummy Notification
                new Notification
            );
        } catch(e) {}
        return notification;
    }());

    window.Notification = window.Notification || notification;
}(window));