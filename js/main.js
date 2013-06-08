/**
 * Copyright (c) 2013 Tsvetan Tsvetkov

 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
"use strict";

function NotifyDemo ($scope) {
    var win = window,
        statusClass = {},
        isIE = false,
        isSupported = notify.isSupported,
        messages = {
            notPinned: 'Pin current page in the taskbar in order to receive notifications',
            notSupported: '<strong>Desktop Notifications not supported!</strong> Check supported browsers table and project\'s GitHub page.'
        };
    
    $scope.notification = {
        title: "Notification Title",
        body: "Notification Body",
        icon: "images/chat.ico"
    };
    $scope.permissionLevel = notify.permissionLevel();
    $scope.permissionsGranted = ($scope.permissionLevel === notify.PERMISSION_GRANTED);

    try {
        isIE = (win.external && win.external.msIsSiteMode() !== undefined);
    } catch (e) {}

    statusClass[notify.PERMISSION_DEFAULT] = 'alert';
    statusClass[notify.PERMISSION_GRANTED] = 'alert alert-success';
    statusClass[notify.PERMISSION_DENIED] = 'alert alert-error';

    messages[notify.PERMISSION_DEFAULT] = '<strong>Warning!</strong> Click to allow displaying desktop notifications.';
    messages[notify.PERMISSION_GRANTED] = '<strong>Success!</strong>';
    messages[notify.PERMISSION_DENIED] = '<strong>Denied!</strong>';

    $scope.status = isSupported ? statusClass[$scope.permissionLevel] : statusClass[notify.PERMISSION_DENIED];
    $scope.message = isSupported ? (isIE ? messages.notPinned : messages[$scope.permissionLevel]) : messages.notSupported;

    $scope.requestPermission = function() {
        if ($scope.permissionLevel === notify.PERMISSION_DEFAULT) {
            notify.requestPermission(function() {
                $scope.$apply($scope.permissionLevel = notify.permissionLevel());
                $scope.$apply($scope.permissionsGranted = ($scope.permissionLevel === notify.PERMISSION_GRANTED));
                $scope.$apply($scope.status = isSupported ? statusClass[$scope.permissionLevel] : statusClass[notify.PERMISSION_DENIED]);
                $scope.$apply($scope.message = isSupported ? (isIE ? messages.notPinned : messages[$scope.permissionLevel]) : messages.notSupported);
            });
        }
    }
    
    $scope.showNotification = function() {
        notify.createNotification($scope.notification.title, {
            body: $scope.notification.body,
            icon: $scope.notification.icon
        });
    }
}