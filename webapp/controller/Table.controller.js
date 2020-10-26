sap.ui.define(["./BaseController", "sap/ui/core/routing/History", "sap/ui/core/Fragment"], function (
	BaseController,
	History,
	Fragment
) {
	"use strict";

	return BaseController.extend("com.hhn.tutorial.SAPUI5.controller.Table", {
		onInit: function () {
			// Gets the model from the Component and binds it to the view
			this.setModel(this.getOwnerComponent().getModel("userModel"));
		},

		/**
		 * Handles the routing back to the home view, it uses the Backhome route as a workaround to avoid viewId conflicts
		 * Normally routing would be handled a bit differently, see Walkthrough
		 */
		handleNav: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			// If the UI5 app doesn't know of a previous site hash
			if (sPreviousHash !== undefined) {
				window.history.go(-1); // Native JS statement to go to the last page
			} else {
				this.getRouter().navTo("BackHome");
			}
		},

		/**
		 * Handles the dialog call. Gets the data of the pressed item and binds it
		 * @param {sap.ui.base.Event} oEvent the event object
		 */
		onItemPress: function (oEvent) {
			var oSource = oEvent.getSource();
			var oGetItemFromEventContext = oSource.getBindingContext().getProperty(oSource.getBindingContextPath());
			var oGetItemFromTableControl = this.byId("table")
				.getBinding("items")
				.getModel()
				.getProperty(oSource.getBindingContextPath());
			// This is only for demonstration, both are valid ways to access the pressed item's properties
			var oItem = oGetItemFromEventContext || oGetItemFromTableControl;

			var fnBindDataToFragment = function (item) {
				this.byId("dName").setText(item.name);
				this.byId("dSurname").setText(item.surname);
				this.byId("dEmail").setText(item.email);
				this.byId("dCreateDate").setText(this.formatter.toPrettyDate(item.createDate)); // formatter defined in the BaseController
			}.bind(this);

			// This if how you call a fragment with its id
			if (!this.byId("itemDetails")) {
				Fragment.load({
					type: "XML",
					id: this.getView().getId(),
					name: "com.hhn.tutorial.SAPUI5.view.ItemDetails",
					controller: this
				})
					.then(
						function (oDialog) {
							// Makes the dialog dependent of the view's lifecycle
							this.getView().addDependent(oDialog);
							// Adds the Component's styling, but we didn't define any in the Component
							// oDialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
							oDialog.open();
						}.bind(this)
					)
					.then(fnBindDataToFragment(oItem));
			} else {
				this.byId("itemDetails").open();
			}
		},

		/**
		 * Closes the fragment when you press the back button
		 */
		closeItemPress: function () {
			this.byId("itemDetails").close();
		},

		/**
		 * Used to destroy fragments after closure
		 * @param {sap.ui.base.Event} oEvent the event object
		 */
		onAfterClose: function (oEvent) {
			oEvent.getSource().destroy();
		}
	});
});
