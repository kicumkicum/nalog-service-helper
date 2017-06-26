/**
 * @callback
 */
function onOpen() {
	app.createMenu();
}


/**
 * @param {string} captcha
 */
function setCaptcha(captcha) {
	app.setCaptcha(captcha);
}


/**
 * @private
 */
function _getINN() {
	app.getINN();
}


var App = function() {
	/**
	 * @type {UI}
	 * @private
	 */
	this._ui = createUI();

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
	this.getINN = function() {
		const captchaSrc = this._nalog.getCaptchaImageSrc();
		const currentApp = SpreadsheetApp.getActiveSpreadsheet();
		this._ui.showCaptcha(captchaSrc, currentApp);
	};

	this.setCaptcha = function(captcha) {
		Logger.log(captcha);
	};

	this.createMenu = function() {
		const appUi = SpreadsheetApp.getUi();
		appUi.createMenu('ФНС')
			.addItem('Запросить ИНН', '_getINN')
			.addToUi();
	};
};

var app = new App();
