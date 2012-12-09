/**
 * Copyright 2012 Tsvetan Tsvetkov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Tsvetan Tsvetkov (tsekach@gmail.com)
 */
(function (win) {
    /*
     Safari native methods required for Notification object do not run in strict mode.
     */
    //"use strict";
    var PERMISSION_DEFAULT = "default",
        PERMISSION_GRANTED = "granted",
        PERMISSION_DENIED = "denied",
        PERMISSION = [PERMISSION_GRANTED, PERMISSION_DEFAULT, PERMISSION_DENIED],

        isSupported = !!(win.Notification /* Safari */ || win.webkitNotifications /* old WebKit */ || navigator.mozNotification /* Firefox Mobile */ || (win.external && win.external.msIsSiteMode() !== undefined) /* IE9+ */),

        ieVerification = Math.floor((Math.random() * 10) + 1),
        isFunction = function (value) { return typeof value === 'function'; },
        noop = function () {};

    function getNotification(title, options) {
        var notification;

        if (win.Notification) { /* Safari 6, Chrome (23+) */
            notification =  new win.Notification(title, {
                /* The notification's icon - For Chrome in Windows, Linux & Chrome OS */
                icon: options.icon,
                /* The notification’s subtitle. */
                body: options.body || "",
                /*
                    The notification’s unique identifier.
                    This prevents duplicate entries from appearing if the user has multiple instances of your website open at once.
                */
                tag: options.tag || ""
            });
        } else if (win.webkitNotifications) { /* FF with html5Notifications plugin installed */
            notification = win.webkitNotifications.createNotification(options.icon, title, options.body);
            notification.show();
        } else if (navigator.mozNotification) {
            notification = navigator.mozNotification.createNotification(title, options.body, options.icon);
            notification.show();
        } else if (win.external && win.external.msIsSiteMode()) { /* IE9+ */
            //Clear any previous notifications
            window.external.msSiteModeClearIconOverlay();
            win.external.msSiteModeSetIconOverlay(options.icon, title);
            window.external.msSiteModeActivate();
            notification = {
                "ieVerification": ++ieVerification
            };
        }

        return notification;
    }

    function getWrapper(notification) {
        return {
            close: function () {
                if (notification && notification.close) {
                    //http://code.google.com/p/ff-html5notifications/issues/detail?id=58
                    notification.close();
                } else if (win.external && win.external.msIsSiteMode()) {
                    if (notification.ieVerification === ieVerification) {
                        window.external.msSiteModeClearIconOverlay();
                    }
                }
            }
        };
    }

    function requestPermission(callback) {
        if (!isSupported) { return; }

        var callbackFunction = isFunction(callback) ? callback : noop;

        if (win.Notification && win.Notification.requestPermission && win.Notification.permissionLevel) {
            win.Notification.requestPermission(callbackFunction);
        } else if (win.webkitNotifications && win.webkitNotifications.checkPermission) {
            win.webkitNotifications.requestPermission(callbackFunction);
        }
    }

    function permissionLevel() {
        try {
            var permission;

            if (!isSupported) { return; }
            if (win.Notification && win.Notification.permissionLevel) {
                permission = win.Notification.permissionLevel();
            } else if (win.webkitNotifications && win.webkitNotifications.checkPermission) {
                permission = PERMISSION[win.webkitNotifications.checkPermission()];
            } else if (navigator.mozNotification) {
                permission = PERMISSION_GRANTED;
            } else if (win.external && win.external.msIsSiteMode()) { /* keep last */
                permission = PERMISSION_GRANTED;
            }

            return permission;
        } catch (e) {

        }

    }

    function createNotification(title, options) {
        var notificationWrapper;
        /*
            Return undefined if notifications are not supported.

            Return undefined if no permissions for displaying notifications.

            Title and icons are required. Return undefined if not set.
         */
        if (isSupported && title && options.icon && (permissionLevel() === PERMISSION_GRANTED)) {
            notificationWrapper = getWrapper(getNotification(title, options));
        }

        return notificationWrapper;
    }


    win.notify = {
        PERMISSION_DEFAULT: PERMISSION_DEFAULT,
        PERMISSION_GRANTED: PERMISSION_GRANTED,
        PERMISSION_DENIED: PERMISSION_DENIED,

        createNotification: createNotification,
        isSupported: isSupported,
        permissionLevel: permissionLevel,
        requestPermission: requestPermission
    };
}(window));
