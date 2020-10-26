sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/UIComponent", "../model/formatter"], function (
	Controller,
	UIComponent,
	formatter
) {
	"use strict";

	return Controller.extend("com.hhn.tutorial.SAPUI5.controller.BaseController", {
		// The formatter is a global property and can be accessed without the need of "this"
		// Since we put it into the BaseController it's inherited by all views as are all the other methods defined here
		formatter: formatter,

		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Getter for a specific text of the resource bundle.
		 * @public
		 * @param {string} sKey Key to retrieve the text for
		 * @param {array} sArgs List of parameter values which should replace the placeholders "{n}" (n is the index) in the found locale-specific string value
		 * @param {boolean} bIgnoreKeyFallback If set, undefined is returned instead of the key string, when the key is not found in any bundle or fallback bundle
		 * @returns {sap.base.i18n.ResourceBundle.string} the specific string of the resourceModel of the component
		 */
		getI18n: function (sKey, sArgs, bIgnoreKeyFallback) {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey, sArgs, bIgnoreKeyFallback);
		},

		/**
		 * Adds a history entry in the FLP page history
		 * @public
		 * @param {object} oEntry An entry object to add to the hierachy array as expected from the ShellUIService.setHierarchy method
		 * @param {boolean} bReset If true resets the history before the new entry is added
		 */
		addHistoryEntry: (function () {
			var aHistoryEntries = [];

			return function (oEntry, bReset) {
				if (bReset) {
					aHistoryEntries = [];
				}

				var bInHistory = aHistoryEntries.some(function (oHistoryEntry) {
					return oHistoryEntry.intent === oEntry.intent;
				});

				if (!bInHistory) {
					aHistoryEntries.push(oEntry);
					this.getOwnerComponent()
						.getService("ShellUIService")
						.then(function (oService) {
							oService.setHierarchy(aHistoryEntries);
						});
				}
			};
		})()
	});
});
