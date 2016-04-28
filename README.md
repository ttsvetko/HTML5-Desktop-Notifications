# DO NOT USE! IN DEVELOPMENT

# HTML 5 Desktop Notification

# Support
- IE 9+
- Firefox 22+
- Google Chrome 32+

# Notes
- MS Edge does not support Notification API
- Does not

# Permissions
Notification API defines 3 permission levels for supported environments:
- <strong>default</strong> - This is equivalent to "denied", but the user has made no explicit choice thus far.
- <strong>granted</strong> - This means notifications can be displayed.
- <strong>denied</strong> - This means the user does not want notifications.

To support environments that do not implement Notification API,
this code implements an additional permission level:
- <strong>notsupported</strong> - Notification API is not supported in any format(WHATWG spec or prefixed). Notification could not be displayed. Any Notification API code execution will pass, but no notification will be displayed.

# TODO
- Build distribution version that combines lie.js(Promise polyfill)(required for IE) and Notification file.
