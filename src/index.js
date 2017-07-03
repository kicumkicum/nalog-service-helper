/**
 * @callback
 */
function onOpen() {
	app.createMenu();
}


/**
 * @param {string} captcha
 */
function __setCaptcha(captcha) {
	app.writeINN(captcha);
}


/**
 * @param {...*} var_args
 * @global
 */
function log(var_args) {
	const args = [].join.call(arguments, ', ');
	Logger.log(args);
}


/**
 * @private
 */
function _getINN() {
	app.getCaptcha();
}

function testReadRow() {
	app.writeINN();
}

var App = function() {
	/**
	 * @type {UI}
	 * @private
	 */
	this._ui = createUI();

	/**
	 * @type {Sheet}
	 * @private
	 */
	this._sheet = new Sheet();

	/**
	 * @type {Request}
	 * @private
	 */
	this._request = new Request();

	/**
	 * @type {Nalog}
	 * @private
	 */
	this._nalog = createNalog({request: this._request});

	/**
	 * @this {App}
	 */
	this.getCaptcha = function() {
		const captchaSrc = this._nalog.getCaptchaImageSrc();
		const currentApp = SpreadsheetApp.getActiveSpreadsheet();
		this._ui.showCaptcha(captchaSrc, currentApp);

		// Next call this.setCaptcha
	};

	/**
	 * @param {Nalog.Captcha} captcha
	 * @this {App}
	 */
	this.writeINN = function(captcha) {
		// Read fio from current Row
		const value = this._sheet.readFromActiveRow();

		// Send POST request to Nalog for getting INN
		try {
			var inn = this._nalog.getINN(this._createINNData(value), captcha);
		} catch (e) {
			// this._ui.showPopup()
			log(e);
		}

		log('inn', inn);

		// Write INN to Cell
		this._sheet.writeToCell(inn, {
			row: this._sheet.getCurrentRow(),
			column: Sheet.RowName.INN + 1
		});
	};

	/**
	 */
	this.createMenu = function() {
		const appUi = SpreadsheetApp.getUi();
		appUi.createMenu('ФНС')
			.addItem('Запросить ИНН', '_getINN')
			.addToUi();
	};

	/**
	 * @param {Array<string>} rowData
	 * @return {Object}
	 * @private
	 */
	this._createINNData = function(rowData) {
		return {
			fam: rowData[Sheet.RowName.FAMILY],
			nam: rowData[Sheet.RowName.NAME],
			otch: rowData[Sheet.RowName.SECOND_NAME],
			bdate: rowData[Sheet.RowName.BIRTHDAY].replace('/', '.').replace('/', '.'),
			docno: rowData[Sheet.RowName.PASSPORT_NUMBER].replace('№', '').splice(2, 0, ' '),
			docdt: rowData[Sheet.RowName.PASSPORT_DATE].replace('/', '.').replace('/', '.')
		};
	};
};


/**
 * @param {number} idx
 * @param {number} rem
 * @param {string} str
 * @return {string}
 */
String.prototype.splice = function(idx, rem, str) {
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};


var app = new App();
