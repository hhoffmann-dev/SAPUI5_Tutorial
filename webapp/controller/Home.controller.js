sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("com.hhn.tutorial.SAPUI5.controller.Home", {
		onInit: function () {
			// This how we the access and bind the model we set in the Component to the current view
			// homeView here is an alias for the view model, a view can have several models bound
			// Don't forget, that setModel() is a convenience method defined in the BaseController
			this.setModel(this.getOwnerComponent().getModel("userModel"), "homeView");

			var oUserList = this.getModel("homeView").getProperty("/userList");

			// Pay attention to the structure of the model object to correctly access specific properties
			this.byId("iName").setValue(oUserList[0].name);
			this.byId("iSurname").setValue(oUserList[0].surname);
			this.byId("iEmail").setValue(oUserList[0].email);
		},

		/**
		 * If the pressed button was the accept one, add a new user. Else, navigate to the table view
		 * @param {sap.ui.base.Event} oEvent the event object
		 */
		onPress: function (oEvent) {
			// Accessing the event firing control, in this case it's the accept button
			var oButton = oEvent.getSource();
			// Saving the userList to a variable wouldn't be enough, since that would always return outdated properties
			var fnGetLastUser = function () {
				var oUserList = this.getModel("homeView").getProperty("/userList");

				return oUserList[oUserList.length - 1];
			}.bind(this); // Don't forget to bind the correct context when you use "this" inside nested function

			if (oButton.getProperty("type") === "Accept") {
				var iNewId = Number(fnGetLastUser().userId) + 1; // new Id created here
				var sInputName = this.byId("iName").getValue();
				var sInputSurname = this.byId("iSurname").getValue();
				var sInputEmail = this.byId("iEmail").getValue();
				var dCreateDate = this.byId("iCreateDate").getDateValue();
				// New user object that is to be addded to the current JSON model
				var oNewUser = {
					userId: iNewId.toString(),
					name: sInputName,
					surname: sInputName,
					email: sInputEmail,
					createDate: dCreateDate ? new Date(dCreateDate) : new Date()
				};

				// One way to add a new object entry to a model property
				this.getModel("homeView").getProperty("/userList").push(oNewUser);
				// Is the new user's id the same as the last model's entry's id? Also check name and surname aren't empty
				if (oNewUser.userId === fnGetLastUser().userId && oNewUser.name && oNewUser.surname) {
					var sInputs = sInputName + " " + sInputSurname + " " + sInputEmail + " " + dCreateDate;
					// The second array parameter fills the placeholder located in the i18n file
					// getI18n() is also a convenience method from the BaseController
					MessageBox.success(this.getI18n("form.success", [sInputs]), {
						onClose: function (oAction) {
							if (oAction === "OK") {
								// Empties the input controls after successful JSON model addition
								this.byId("iName").setValue("");
								this.byId("iSurname").setValue("");
								this.byId("iEmail").setValue("");
								this.byId("iCreateDate").setValue("");
							}
						}.bind(this)
					});
				} else {
					MessageBox.error(this.getI18n("form.error"));
				}
			} else {
				// Make to use the Route namein the manifest and not some target or its properties
				this.getRouter().navTo("RouteTable");
			}
		}
	});
});
