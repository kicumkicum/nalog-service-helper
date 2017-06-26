


/**
 * @constructor
 */
function Transport() {
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

	this.fetch = function(method, url, data, opt_headers) {
		return this._transport.fetch(method, url, data, opt_headers);
	};
}


/**
 * @global
 * @return {Request}
 */
function createRequest() {
	return new Request();
}
