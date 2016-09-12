# DO NOT USE! IN DEVELOPMENT

![Build Status](https://travis-ci.org/ttsvetko/HTML5-Desktop-Notifications.svg?branch=v2)

# HTML 5 Desktop Notification

# Support
- IE 9+
- Firefox 22+
- Google Chrome 32+

# Notes
- [IE 9][IE 10] Does not support Promise. Polyfill required.
- [MS Edge] does not support Notification API
- [Safari] Do not display Notification if title is not set
- [Safari] Icon is not displayed - it uses the application icon instance of provided one
- Have to type of icons - one image format that will be displayed for Chrome/Safari/Firefox and one in .ico format, 16x16 for IE
    The library automatically will parse the icon name and will add .ico extension if it is not .ico

    The icon resource file must contain a 16x16 icon at 96 dots per inch (dpi). If an icon overlay is already applied, the existing overlay is replaced.
    Note  To view the icon overlay, the taskbar buttons must be in their default large icon mode. Small taskbar icons do not support icon overlays.

# Permissions
Notification API defines 3 permission levels for supported environments:
- <strong>default</strong> - This is equivalent to "denied", but the user has made no explicit choice thus far.
- <strong>granted</strong> - This means notifications can be displayed.
- <strong>denied</strong> - This means the user does not want notifications.

To support environments that do not implement Notification API,
this code implements an additional permission level:
- <strong>notsupported</strong> - Notification API is not supported in any format(WHATWG spec or prefixed). Notification could not be displayed. Any Notification API code execution will pass, but no notification will be displayed.

# TODO
- Promise is not supported for IE9/10. It should be included by the user.
- [IE] Implement actions as a thumbBar buttons
- Add Support for Service Workers
