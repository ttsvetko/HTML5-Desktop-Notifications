![Build Status](https://travis-ci.org/ttsvetko/HTML5-Desktop-Notifications.svg?branch=master)
[![CircleCI](https://circleci.com/gh/ttsvetko/HTML5-Desktop-Notifications/tree/master.svg?style=svg)](https://circleci.com/gh/ttsvetko/HTML5-Desktop-Notifications/tree/master)

# HTML 5 Desktop Notification

# Support
- IE 9+
- Edge
- Firefox 22+
- Google Chrome 32+

# Notes
- [IE 9][IE 10] Does not support Promise. Polyfill required.
- [MS Edge] Notifications supported for the latest version of Edge that comes with Windows 10 Anniversary Update
- [Safari] Icon is not displayed - it uses the application icon instance of provided one
- Have to type of icons - one image format that will be displayed for Chrome/Safari/Firefox and one in .ico format, 16x16 for IE
    The library automatically will parse the icon name and will add .ico extension if it is not .ico

    The icon resource file must contain a 16x16 icon at 96 dots per inch (dpi). If an icon overlay is already applied, the existing overlay is replaced.
    Note  To view the icon overlay, the taskbar buttons must be in their default large icon mode. Small taskbar icons do not support icon overlays.
- The Notification constructor(window.Notification) is replaced with custom one in order to polyill the missing properties/methods. Each instance created with <code>new Notification('title')</code> returns the original Notification object(for Chrome/Opera/Firefox/Safari/Edge) and custom Notification object for not supported browsers:
<code>
var n = new Notification('title');
n instanceOf Notification; // false for Chrome/Safari/Opera/Edge/Firefox as created notification is instance of the browsers' native Notification object, but window.Notification is a polyfill class.
</code>

# Permissions
Notification API defines 3 permission levels for supported environments:
- <strong>default</strong> - This is equivalent to "denied", but the user has made no explicit choice thus far.
- <strong>granted</strong> - This means notifications can be displayed.
- <strong>denied</strong> - This means the user does not want notifications.

To support environments that do not implement Notification API,
this code implements an additional permission level:
- <strong>notsupported</strong> - Notification API is not supported in any format(WHATWG spec or prefixed). Notification could not be displayed. Any Notification API code execution will pass, but no notification will be displayed.

Usage:
Use the Standard API for working with this notification library:

- Notification.permission - to get the permissions for page
- Notification.requestPermission() - request permission for displaying Notifications. NOTE: Returns a Promise. For IE9 & IE10 Promise polyfill required - it is not included within this library.
- new Notification('title', options) - create new Notification. 
    More details: 
    - https://notifications.spec.whatwg.org/
    - https://developer.mozilla.org/en-US/docs/Web/API/notification

# TODO
- [ ] Home page - documentation & demo
- [x] [IE] Add support for event listeners
- [ ] [IE] Implement actions as a thumbBar buttons
- [ ] Add Support for Service Workers
