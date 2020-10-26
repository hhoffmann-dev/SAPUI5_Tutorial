/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/hhn/tutorial/SAPUI5/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});