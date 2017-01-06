const $ = require('jquery');
const { ipcRenderer } = require('electron');

/*
full player scale:
width: 560
height: 315
*/

var viewerPadding = 0;

window.onload = () => {
	ipcRenderer.on('change-viewer-padding', (event, args) => {
		viewerPadding = args;
		$(window).trigger('resize');
	});

	$(window).on('resize', () => {
		var thisWindow = $(this);
		if ($("iframe").length > 0) {
			// 25 is height of lowbar
			$("iframe").height(thisWindow.height() + viewerPadding - 25);
		} else if ($("#splash").length > 0) {
			$("#splash").height(thisWindow.height() + viewerPadding - 25);
		}
	});
}