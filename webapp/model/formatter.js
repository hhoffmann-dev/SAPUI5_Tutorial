sap.ui.define([], function () {
	"use strict";

	return {
		/**
		 * Capitalizes the input parameter
		 * @param {string} sValue Any string
		 */
		toCapitalize: function (sValue) {
			var sReturnValue;

			if (!sValue) {
				sReturnValue = "N.A.";
			} else if (sValue) {
				sReturnValue = sValue.toUpperCase();
			}
			return sReturnValue;
		},

		/**
		 * Formats the date from JSON date to the (dd.MM.yyyy) format
		 * @public
		 * @param {string} sValue JSON date
		 * @returns {string} dateFormat (dd.MM.yyyy)
		 */
		toPrettyDate: function (sValue) {
			if (!sValue) {
				return "n. a.";
			} else {
				var d = new Date(sValue),
					dateFormat = sap.ui.core.format.DateFormat.getDateInstance();
				return dateFormat.format(d);
			}
		}
	};
});
