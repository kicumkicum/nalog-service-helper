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
	this._request = createRequest();

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

	this.writeINN = function(captcha) {
		// Read fio from current Row
		const value = this._sheet.readFromActiveRow();

		// Send POST request to Nalog for getting INN
		const inn = this._nalog.getINN({
			fam: value[0],
			nam: value[1],
			otch: value[2],
			bdate: value[3],
			docno: value[5],
			docdt: value[6]
		}, captcha);

		// Write INN to Cell
		this._sheet.writeToCell(inn, 'H' + this._sheet.getCurrentRow());
	};

	this.createMenu = function() {
		const appUi = SpreadsheetApp.getUi();
		appUi.createMenu('ФНС')
			.addItem('Запросить ИНН', '_getINN')
			.addToUi();
	};
};

var app = new App();
