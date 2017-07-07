


/**
 * @constructor
 */
function Transport() {}


/**
 * @param {string} method
 * @param {string} url
 * @param {Object} data
 * @param {Object=} opt_headers
 * @return {HTTPResponse}
 */
Transport.prototype.fetch = function(method, url, data, opt_headers) {
	const options = {
		'method': method,
		'payload': data,
		'muteHttpExceptions': true
	};
	return /** @type {HTTPResponse} */(UrlFetchApp.fetch(url, options));
};



/**
 * @constructor
 */
function Request() {
	/**
	 * @type {Transport}
	 * @private
	 */
	this._transport = new Transport();
}


/**
 * @param {string} method
 * @param {string} url
 * @param {Object} data
 * @param {Object=} opt_headers
 * @return {*}
 */
Request.prototype.fetch = function(method, url, data, opt_headers) {
	return this._transport.fetch(method, url, data, opt_headers);
};
