sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/Device"], function (JSONModel, Device) {
	"use strict";

	return {
		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		/**
		 * Creates hardcoded JSON mockdata to be used in the Component
		 * @returns {sap.ui.model.json.JSONModel} Returned hardcoded mockdata
		 */
		createMockData: function () {
			var oData = {
				userList: [
					{
						userId: "1",
						name: "Smitty",
						surname: "Jensen",
						email: "Smitty.Werben.Jagger.Man.Jensen@ananas.to",
						createDate: "Fri Oct 22 2020 10:12:34 GMT+0200 (Mitteleuropäische Sommerzeit)"
					},
					{
						userId: "2",
						name: "John",
						surname: "Clarkson",
						email: "john.c12@gmail.com",
						createDate: "Fri Oct 23 2020 14:18:06 GMT+0200 (Mitteleuropäische Sommerzeit)"
					},
					{
						userId: "3",
						name: "Michael",
						surname: "Daniels",
						email: "jDan13@webmail.de",
						createDate: "Fri Oct 23 2020 14:18:06 GMT+0200 (Mitteleuropäische Sommerzeit)"
					}
				]
			};
			return new JSONModel(oData);
		}
	};
});
