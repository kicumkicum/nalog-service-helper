/**
 * @param {Nalog.Deps} deps
 * @return {Nalog}
 * @global
 */
function createNalog(deps) {
	return new Nalog(deps);
}


var CAPTCHA_BASE_URL = 'https://service.nalog.ru/static/captcha.html';
var SERVICE_BASE_URL = 'https://service.nalog.ru/inn.do';
//https://service.nalog.ru/static/captcha.html?r=1498150605927&a=



/**
 * @param {Nalog.Deps} deps
 * @constructor
 */
function Nalog(deps) {
	this._request = deps.request;
}


/**
 * @param {Nalog.InputData} data
 * @param {Nalog.Captcha} captcha
 * @return {number}
 * @throws {Object}
 */
Nalog.prototype.getINN = function(data, captcha) {
	const url = 'https://service.nalog.ru/inn-proc.do';
	const newData = this._createOutData(data, captcha);
	const responseRaw = this._request.fetch('post', url, newData);
	log(responseRaw);
	const response = JSON.parse(responseRaw);

	if (response['inn'] && response['code'] === 1) {
		return response['inn'];
	} else {
		throw response;
	}
};


/**
 * @return {string}
 */
Nalog.prototype.getCaptchaImageSrc = function() {
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
Nalog.prototype._createOutData = function(data, captcha) {
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
 */
Nalog.prototype._loadCaptchaImageSrc = function(loadTime, token) {
	return CAPTCHA_BASE_URL + '?r=' + loadTime + '&a=' + token;
};


/**
 * @return {{loadTime: number, token: string}}
 * @private
 */
Nalog.prototype._loadCaptchaToken = function() {
	const now = Math.floor(Date.now() / 1000);
	const response = UrlFetchApp.fetch(CAPTCHA_BASE_URL + '?' + now).getContentText();
	return {loadTime: now, token: response};
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


/**
 * @typedef {{
 *	 token: string,
 *	 value: string
 * }}
 */
Nalog.Captcha;
