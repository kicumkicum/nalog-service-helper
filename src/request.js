


/**
 * @constructor
 */
function Transport() {
	/**
	 * @param {string} method
	 * @param {string} url
	 * @param {Object} data
	 * @param {Object=} opt_headers
	 * @return {HTTPResponse}
	 */
	this.fetch = function(method, url, data, opt_headers) {
		const options = {
			'method': method,
			'payload': data,
			'muteHttpExceptions': true
		};
		return UrlFetchApp.fetch(url, options);
	};
}



/**
 * @constructor
 */
function Request() {
	this._transport = new Transport();

	/**
	 * @param {string} method
	 * @param {string} url
	 * @param {Object} data
	 * @param {Object=} opt_headers
	 * @return {*}
	 * @this {Request}
	 */
	this.fetch = function(method, url, data, opt_headers) {
		return this._transport.fetch(method, url, data, opt_headers);
	};
}
