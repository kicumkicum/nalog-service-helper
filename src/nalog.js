/**
 * @param {Nalog.Deps} deps
 * @return {Nalog}
 * @global
 */
function createNalog(deps) {
	return new Nalog(deps);
}


/**
 * @global
 */
function testNalog() {
	var showCaptcha = function(src) {
		const ss = SpreadsheetApp.getActiveSpreadsheet();
		const html = HtmlService.createHtmlOutputFromFile('captcha.html');
		html.setWidth(300);
		html.setHeight(200);

		ss.show(html);
	};

	var n = createNalog();

	var a = n._loadCaptchaToken();
	var src = n._loadCaptchaImageSrc(a.loadTime, a.token);
	n.getINN()
	Logger.log(src);

	showCaptcha(src);
}


var CAPTCHA_BASE_URL = 'https://service.nalog.ru/static/captcha.html';
var SERVICE_BASE_URL = 'https://service.nalog.ru/inn.do';
//https://service.nalog.ru/static/captcha.html?r=1498150605927&a=


/**
 * @param {Nalog.Deps} deps
 * @this {Nalog}
 */
var Nalog = function(deps) {
	this._request = deps.request;

	/**
	 * @param {Nalog.InputData} data
	 * @param {{
	 *	 token: string,
	 *	 value: string
	 * }} captcha
	 * @this {Nalog}
	 */
	this.getINN = function(data, captcha) {
		const url = 'https://service.nalog.ru/inn-proc.do';
		const newData = this._createOutData(data, captcha);
		const responce = this._request.fetch('post', url, newData);
		return responce;
	};

	this.getCaptchaImageSrc = function() {
		const captchaToken = this._loadCaptchaToken();
		return this._loadCaptchaImageSrc(captchaToken.loadTime, captchaToken.token);
	};

	/**
	 * @param {Nalog.InputData} data
	 * @param {{
	 *	 token: string,
	 *	 value: string
	 * }} captcha
	 * @return {Nalog.OutputtData}
	 * @private
	 */
	this._createOutData = function(data, captcha) {
		return {
			'fam': data.fam,
			'nam': data.nam,
			'otch': data.otch,
			'bdate': data.bdate,
			'docno': data.docno,
			'docdt': data.docdt,
			'captcha': captcha.value,
			'captchaToken': captcha.token,
			'c': 'innMy',
			'bplace': '',
			'doctype': '21'
		};
	};


	/**
	 * @param {number} loadTime
	 * @param {string} token
	 * @return {string}
	 * @private
	 * @this {Nalog}
	 */
	this._loadCaptchaImageSrc = function(loadTime, token) {
		return CAPTCHA_BASE_URL + '?r=' + loadTime + '&a=' + token;
	};

	/**
	 * @return {{loadTime: number, token: string}}
	 * @private
	 */
	this._loadCaptchaToken = function() {
		const now = Math.floor(Date.now() / 1000);
		const response = UrlFetchApp.fetch(CAPTCHA_BASE_URL + '?' + now).getContentText();
		return {loadTime: now, token: response};
	};
};


/**
 * @typedef {{
 *	 request: Request
 * }}
 */
Nalog.Deps;


/**
 * @typedef {{
 *	 fam: string,
 *	 nam: string,
 *	 otch: string,
 *	 bdate: string,
 *	 docno: string,
 *	 docdt: string
 * }}
 */
Nalog.InputData;


/**
 * @typedef {{
 *	 fam: string,
 *	 nam: string,
 *	 otch: string,
 *	 bdate: string,
 *	 docno: string,
 *	 docdt: string,
 *	 captcha: string,
 *	 captchaToken: string,
 *	 c: string,
 *	 bplace: string,
 *	 doctype: string
 * }}
*/
Nalog.OutputtData;
