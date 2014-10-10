###### (draft)

# HTML5 Desktop Notifications

A small library that unifies the HTML5 Notifications APIs accross different browsers including IE9 & IE10.

## Content
<ol>
	<li><a href="#introduction">Introduction</a></li>
	<li><a href="#browsers-support">Browsers Support</a></li>
	<li><a href="#demo">Demo</a></li>
	<li><a href="#usage">Usage</a></li>
	<li><a href="#api-documentation">API Documentation</a></li>
    	<li><a href="#screenshots">Screenshots</a></li>
	<li><a href="#limitations">Limitations</a></li>
</ol>

## Introduction

<a href="http://dvcs.w3.org/hg/notifications/raw-file/tip/Overview.html">HTML5 Notifications API</a> allows you to display notifications to the user for given events. There is a <a href="http://dvcs.w3.org/hg/notifications/raw-file/tip/Overview.html">draft spec</a>, but it is not currently in any standard.

Google Chrome introduces notifications in version 5 (http://caniuse.com/#feat=notifications) - supporting the old proposed APIs version. Starting from version 22, Chrome supports the lastest proposed draft version of the Notifications API, but some of the methods are not implemented or breaking the page - see below for details.

Safari 6 implements most of the APIs in proposed Notifications draft. See <a href="https://developer.apple.com/library/mac/#documentation/AppleApplications/Conceptual/SafariJSProgTopics/Articles/SendingNotifications.html#//apple_ref/doc/uid/TP40001483-CH23-SW1">Safari documentation</a>.

IE9 introduced pinned sites, a convenient way for users to access your website directly by clicking an icon on the taskbar. Pinned sites are easy to implement, too, requiring very little code. For more information about creating pinned sites, see <a href="http://msdn.microsoft.com/en-us/library/ie/gg491731(v=vs.85).aspx">Pinned Sites Developer Documentation</a>. Pinned site can display icon overlays on the taskbar or highlights the taskbar button to notify user of activity. To view an icon overlay, the taskbar buttons must be in their default large icon mode. Small taskbar icons do not support icon overlays. In addition, icon overlays are visible only while the Pinned site window is running. The icon is removed from the taskbar button when the Pinned site window is closed. See <a href="http://msdn.microsoft.com/en-us/library/ie/gg491744(v=vs.85).aspx">Working with custom icon overlays in pinned sites</a>.

<a href="#html5-desktop-notifications">top</a>

## Browsers Support

<table>
	<thead>
		<th></th>
		<th>Windows</th>
		<th>MacOS</th>
		<th>Linux</th>
		<th>ChromeOS</th>
        	<th>Android</th>
	</thead>
	<tbody>
		<!-- IE -->
		<tr>
			<td>IE<sup>1</sup></td>
			<td>✓</td>
			<td>-</td>
			<td>-</td>
			<td>-</td>
            		<td>-</td>
		</tr><!-- IE -->

		<!-- Chrome -->
		<tr>
			<td>Chrome</td>
			<td>✓</td>
			<td>✓</td>
			<td>✓</td>
			<td>✓</td>
            		<td>-</td>
		</tr><!-- Chrome -->

		<!-- Safari -->
		<tr>
			<td>Safari<sup>2</sup></td>
			<td>-</td>
			<td>✓</td>
			<td>-</td>
			<td>-</td>
            		<td>-</td>
		</tr><!-- Safari -->

		<!-- Firefox -->
		<tr>
			<td>Firefox<sup>3</sup></td>
			<td>✓</td>
			<td>✓</td>
			<td>✓</td>
			<td>-</td>
    			<td>✓</td>
		</tr><!-- Firefox-->
	</tbody>
</table>

<sup>1</sup> Support for IE9+ running on Windows7 or later. In addition, notifications are visible only while the Pinned site window is running. The icon is removed from the taskbar button when the Pinned site window is closed. The taskbar buttons must be in their default large icon mode, small taskbar icons do not support icon overlays.

<sup>2</sup> Support for Safari 6

<sup>3</sup> Support for Firefox less than version 23 only when <a href="http://code.google.com/p/ff-html5notifications/">html5-notifications plugin</a> is installed. Recommended version is 1.2.0.1 - see the following issue: http://code.google.com/p/ff-html5notifications/issues/detail?id=58 . Firefox 23 introduced native support for html5 desktop Notifications. For MacOS <a href="http://www.growl.info/">Growl</a> app is required. Firefox Mobile for Android does NOT require any plugins installed.

<a href="#html5-desktop-notifications">top</a>

## Demo
<a href="http://ttsvetko.github.io/HTML5-Desktop-Notifications/" target="_blank">Demo page</a>

## Usage
### Step 1
First, ensure that notifications are allowed to be displayed by calling <em>notify.permissionLevel()</em>. 

### Step 2
If returned value is equal to <em>notify.PERMISSION_DEFAULT</em>, then call <em>notify.requestPermission()</em> to ask user to grand permissions for displaying notifications. <br/>
If returned value is equal to <em>notify.PERMISSION_GRANTED</em>, permissions are granted and can display notifications.<br/>
If returned value is equal to <em>notify.PERMISSION_DENIED</em> - notifications are denied. Instead, user should allow notifications or remove current domain from the list of notifications setting into browser's setting page.

### Step 3
Set global configurations:
 - pageVisibility - to displaying notification when page is not visible - for browsers that support pageVisibility only. Defaults to false;
 - autoClose - an interval of time in ms for displaying the notification and then it is closed automatically. Defaults to 0 (notifications will not be closed automatically)

notify.config({pageVisibility: false, autoClose: 500});

Create notifications by calling <em>notify.createNotification()</em>. Notification title, notification body and notification icon are required parameters. Calling <em>notify.createNotification()</em> returns am notification object that has one method - close() - used to close manually the notificaiton.


<a href="#html5-desktop-notifications">top</a>

## API Documentation
The <b>notify</b> global object provides a single global namespace within which all code resides. It contains the following properties and methods:

<ul>
    <li>PERMISSION_DEFAULT: "default" -- "default" string value</li>
    <li>PERMISSION_GRANTED: "granted" -- "granted" string value</li>
    <li>PERMISSION_DENIED: "denied" -- "denied" string value</li>
    <li>isSupported: true/false -- indicates browser's notifications support.</li>
    <li>permissionLevel() -- check for permissions to display notifications. Returns one of the following:
        <ul>
            <li>PERMISSION_DEFAULT -- The user has not yet specified whether they approve of notifications being sent from this domain. (Chrome, Safari & Firefox)</li>
            <li>PERMISSION_GRANTED
                <ul>
                    <li>Chrome, Safari & Firefox: The user has given permission for notifications to be sent from this domain</li>
                    <li>IE9+: Page is running on pinned site window.</li>
                    <li>Firefox Mobile: HTML5 notifications are supported</li>
                </ul>
            </li>
            <li>PERMISSION_DENIED -- The user has denied permission for notifications to be sent from this domain. (Chrome, Safari & Firefox)</li>
        </ul>
    </li>
    <li>requestPermission() -- If the permission level is default, it is likely that the user hasn’t yet been prompted to grant access to notifications from your domain. Prompt users to grand permissions by calling the requestPermission() method. This method accepts one parameter, a callback function, which executes when the user grants or denies permission. (Applies for Chrome, Safari and Firefox only. To grand permissions for IE, the site window should be pinned. As window cannot be pinned with javascript, this method gracefully do nothing for IE.)
    <li>createNotification() -- Create a notification by calling createNotification() method: notify.createNotification(String title [, Object options]).
        <ul>
            <li>title / String / (required) -- notification's title</li>
            <li>Available keys that can be included in the options object are the following:
                <ul>
                    <li>body / String / -- The notification’s subtitle. For IE it provides an accessible description of the information conveyed by the icon overlay. Choose text that can be read by screen readers.</li>
                    <li>icon / String/Object / (required) -- The icon that will be set as a custom overlay for IE and notification displayed from Chrome running on Windows. Note that icon by default is not required for Chrome, Safari & Firefox, but is required for IE. In order to unify the implementations, the icon should be always provided in order to display notifications for all supported browsers. icon param could be String with icon's location, but it could be also an Object with the following properties: {"x16": Icon for IE only. The icon should be 16x16px *.ico format, "x32": Icon for all other browsers(Chrome on Windows, Firefox). The icon's size should be 32x32px, supported formats: jpg/png/ico}. Once again - Safari and Chrome on MacOS does not allow icon to be set. For Firefox Mobile, the icon is always Firefox icon. </li>
                    <li>tag -- The notification’s unique identifier. This prevents duplicate entries from appearing in Notification Center if the user has multiple instances of your website open at once. (Apply for Chrome & Safari only)</li>
                </ul>
            </li>
        </ul>
        Returns an object with the following methods:
        <ul>
            <li>close() -- call to close the notification.</li>
        </ul>
    </li>
</ul>

<a href="#html5-desktop-notifications">top</a>

## Screenshots
IE9 running on Windows7:<br/>
<img src="https://raw.github.com/ttsvetko/HTML5-Desktop-Notifications/master/screenshots/IE9Windows7.png"/>

Chrome running on Windows7:<br/>
<img src="https://raw.github.com/ttsvetko/HTML5-Desktop-Notifications/master/screenshots/ChromeWindows7.png"/>

Chrome running on MacOS:<br/>
<img src="https://raw.github.com/ttsvetko/HTML5-Desktop-Notifications/master/screenshots/ChromeMacOS.png"/>

Safari 6 running on MacOS:<br/>
<img src="https://raw.github.com/ttsvetko/HTML5-Desktop-Notifications/master/screenshots/SafariMacOs.png"/>

Firefox with html5notifications plugin installed and running on Windows7:<br/>
<img src="https://raw.github.com/ttsvetko/HTML5-Desktop-Notifications/master/screenshots/FirefoxWindows7.png"/>

Firefox Mobile running on Android:<br/>
<img src="https://raw.github.com/ttsvetko/HTML5-Desktop-Notifications/master/screenshots/FirefoxAndroid.png"/>

<a href="#html5-desktop-notifications">top</a>
## Limitations
<ul>
    <li>Notifications could not be "styled" - Only icon(for some browsers and OS), title and body could be changed.</li>
    <li>IE9+ supports *.ico file types only for an overlay icon. No notification title or notification description. Recommended icon size is 16px x 16px.</li>
    <li>For Chrome & Safari running on MacOS the icon of the notification could not be changed - it is always Chrome or Safari icon.</li>
</ul>

<a href="#html5-desktop-notifications">top</a>
