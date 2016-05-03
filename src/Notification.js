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

    var DIRESCTIONS = ['auto', 'ltr', 'rtl']

    /*
     * Keep the original/constructor defined requestPermission() method in local variable.
     * The public requestPermission() method will be defind last and will call this private method.
     */
    var requestPermission;

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
        var dir;

        if (!arguments.length) {
            throw TypeError('Failed to construct \'Notification\': 1 argument required, but only 0 present.');
        }

        if (options && 'object' !== typeof options) {
            throw TypeError('Failed to construct \'Notification\': parameter 2 (\'options\') is not an object.');
        }

        dir = Object(options).dir;
        if (dir && DIRESCTIONS[dir] === undefined) {
            throw TypeError('Failed to construct \'Notification\': The provided value \'' + dir +'\' is not a valid enum value of type NotificationDirection.')
        }

        options = Object(options);

        Object.defineProperties(this, {
            'body': { value: String(options.body || '') },
            'data': { value: options.data || null },
            'dir': { value: dir },
            'icon': { value: String(options.icon || '') },
            'lang': { value: String(options.lang || '') },
            'requireInteraction': { value: Boolean(options.requireInteraction) },
            'silent': { value: Boolean(options.silent) },
            'tag': { value: String(options.tag || '') },
            'title': { value: String(title) },
            'timestamp': { value: (new Date).getTime() }
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
        if (this.icon) {
            win.external.msSiteModeSetIconOverlay(this.icon, this.description || this.title);
        }

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
            return new Promise(function(resolve, reject) {
                alert(this.PERMISSION_REQUEST_MESSAGE);
                resolve(this.permission);
            }.bind(this));
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
            return new Promise(function(resolve, reject) {
                win.webkitNotifications.requestPermission(function(permission) {
                    resolve(permission);
                });
            });
        }
    });
    WebKitNotification.prototype = Notification.prototype;





    /*
        Check Notification support and create Notification
     */
     var notification = (
         // W3C
         win.Notification ||
         // Opera Mobile/Android Browser
         (win.webkitNotifications && WebKitNotification) ||
         // IE9+ pinned site
         (("external" in window) && ("msIsSiteMode" in window.external) && win.external.msIsSiteMode() !== undefined && IENotification) ||
         // Notification
         Notification
     );



    /*
        Safari6 do not support Notification.permission.
        Instead, it support Notification.permissionLevel()
     */
    if (!notification.permission) {
        Object.defineProperty(notification, 'permission', {
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
    requestPermission = notification.requestPermission.bind(notification);
    Object.defineProperty(notification, 'requestPermission', {
        enumerable: true,
        value: function() {
            return new Promise(function(resolve, reject) {
                var promise = requestPermission(function(permission) {
                    resolve(permission);
                });

                if (!(promise instanceof Promise)) {
                    return;
                }

                resolve(promise);
            });
        }
    });

    win.Notification = notification
}(window));
