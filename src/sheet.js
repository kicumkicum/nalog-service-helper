


/**
 * @constructor
 */
function Sheet() {
	/**
	 * @type {GoogleAppsScript.Spreadsheet.SpreadsheetApp}
	 * @private
	 */
	this._app = SpreadsheetApp;
}


/**
 * @return {Array<string>}
 */
Sheet.prototype.readFromActiveRow = function() {
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
 */
Sheet.prototype.writeToCell = function(value, position) {
	log('write to cell', value, position.row, position.column);
	this._app.getActiveSheet().getRange(position.row, position.column).setValue(value);
};


/**
 * @return {number}
 */
Sheet.prototype.getCurrentRow = function() {
	return this._app.getActiveRange().getRow();
};


/**
 * @param {number} from
 * @param {number} to
 */
Sheet.prototype.splitNames = function(from, to) {
	const fullNames = this._app.getActiveSheet().getRange(from, Sheet.RowName.FULL_NAME + 1, to, 1).getDisplayValues();

	fullNames.forEach(function(fullName, i) {
		var names = fullName[0].split(' ');
		if (fullName[0].toLocaleLowerCase().indexOf('общество') > -1 ||
			fullName[0].toLocaleLowerCase().indexOf('администрация') > -1) {
			return;
		}

		this._app.getActiveSheet().getRange(i, Sheet.RowName.FAMILY + 1).setValue(names[0] || '');
		this._app.getActiveSheet().getRange(i, Sheet.RowName.NAME + 1).setValue(names[1] || '');
		this._app.getActiveSheet().getRange(i, Sheet.RowName.SECOND_NAME + 1).setValue(names[2] || '');
	}, this);
};


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
