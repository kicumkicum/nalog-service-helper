function Sheet() {
	/**
	 * @type {GoogleAppsScript.Spreadsheet.SpreadsheetApp}
	 * @private
	 */
	this._app = SpreadsheetApp;

	this.readFromActiveRow = function() {
		const activeSheet = this._app.getActiveSheet();
		const range = activeSheet.getActiveRange();
		const a = range.getDisplayValues();
		return a[0];
	};

	this.writeToCell = function(value, position) {
		this._app.getActiveSheet().getRange(position).setValue(value);
	};

	this.getCurrentRow = function() {
		return this._app.getActiveRange().getRow();
	};
}


function test() {
	(new Sheet()).readFromActiveRow();
}
