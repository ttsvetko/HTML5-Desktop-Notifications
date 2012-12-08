###### (draft)
# HTML5 Desktop Notifications

Displaying desktop notifications using the html5 desktop notifications api for 
Safari/ Chrome/ Firefox and pinned sites api for IE.

The <a href="http://dvcs.w3.org/hg/notifications/raw-file/tip/Overview.html#notificationoptions">HTML5 Notifications API</a> allows you to display notifications to the user for given events. 
There is <a href="http://dvcs.w3.org/hg/notifications/raw-file/tip/Overview.html#notificationoptions">draft spec</a> but it is not currently in any standard.

## Content
<ol>
	<li>Content</li>
	<li>Browsers Support</li>
	<li>Notes</li>
	<li>API Documentation</li>
	<li>Limitations</li>
</ol>

## Browsers Support

<table style="width: 100%;">
	<colgroup>
		<col style="border-color: #eee; border-style: none solid; border-width: 1px; text-align:center"></col>
		<col style="border-right: 1px solid #eee"></col>
		<col style="border-right: 1px solid #eee"></col>
		<col style="border-right: 1px solid #eee"></col>
		<col style="border-right: 1px solid #eee"></col>
	</colgroup>
	<thead style="border-color: #eee; border-style: solid none; border-width: 1px;">
		<th></th>
		<th>Windows</th>
		<th>MacOS</th>
		<th>Linux</th>
		<th>ChromeOS</th>
	</thead>
	<tbody>
		<!-- IE -->
		<tr style="border-bottom: 1px solid #eee;">
			<td style="text-align: center">IE<sup>*</sup></td>
			<td style="text-align: center">✓</td>
			<td style="text-align: center">-</td>
			<td style="text-align: center">-</td>
			<td style="text-align: center">-</td>
		</tr><!-- IE -->

		<!-- Chrome -->
		<tr style="border-bottom: 1px solid #eee;">
			<td style="text-align: center">Chrome<sup>*</sup></td>
			<td style="text-align: center">✓</td>
			<td style="text-align: center">✓</td>
			<td style="text-align: center">✓</td>
			<td style="text-align: center">✓</td>
		</tr><!-- Chrome -->

		<!-- Safari -->
		<tr style="border-bottom: 1px solid #eee;">
			<td style="text-align: center">Safari<sup>**</sup></td>
			<td style="text-align: center">-</td>
			<td style="text-align: center">✓</td>
			<td style="text-align: center">-</td>
			<td style="text-align: center">-</td>
		</tr><!-- Safari -->

		<!-- Firefox -->
		<tr style="border-bottom: 1px solid #eee;">
			<td style="text-align: center">Firefox<sup>***</sup></td>
			<td style="text-align: center">✓</td>
			<td style="text-align: center">✓</td>
			<td style="text-align: center">✓</td>
			<td style="text-align: center">✓</td>
		</tr><!-- Firefox-->
	</tbody>
</table>
<hr style="border-color: #eee; border-style: solid none none; border-width: 1px; height: 1px;"/>
<p>
	<sup>*</sup> Support for IE 9+
</p>
<p>
	<sup>**</sup> Support for Safari 6
</p>
<p>
	<sup>***</sup> Support for Firefox with <a href="http://code.google.com/p/ff-html5notifications/">html5notifications</a> plugin installed.
</p>