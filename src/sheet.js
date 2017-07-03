/**
 * @global
 * @constructor
 */
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

	/**
	 * @param {string|number} value
	 * @param {{
	 *      row: number,
	 *      column: number
	 * }} position
	 * @this {Sheet}
	 */
	this.writeToCell = function(value, position) {
		log('write to cell', value, position.row, position.column);
		this._app.getActiveSheet().getRange(position.row, position.column).setValue(value);
	};

	/**
	 * @return {number}
	 * @this {Sheet}
	 */
	this.getCurrentRow = function() {
		return this._app.getActiveRange().getRow();
	};
}


function test() {
	(new Sheet()).readFromActiveRow();
}


/**
 * @enum {number}
 */
Sheet.RowName = {
	NVL: 0,
	SQUARE: 1,
	CON_DESC: 2,
	REG_NO: 3,
	TYPE: 4,
	FULL_NAME: 5,
	FAMILY: 6,
	NAME: 7,
	SECOND_NAME: 8,
	BIRTHDAY: 9,
	INN: 10,
	PASSPORT_NUMBER: 11,
	PASSPORT_DATE: 12,
	SNILS: 13
};
