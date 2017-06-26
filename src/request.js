var Transport = function() {
	this.fetch = function(method, url, data, opt_headers) {
		const options = {
			'method': method,
			'payload': data,
			'muteHttpExceptions': true
		};
		return UrlFetchApp.fetch(url, options);
	};
};

var Request = function(captcha) {
	this._transport = new Transport();

	this.fetch = function(method, url, data, opt_headers) {
		return this._transport.fetch(method, url, data, opt_headers);
	};
};

function getCaptchaToken() {
	var n = createNalog();
	const src = n.getCaptchaImageSrc();
	const ad = '<script> setTimeout(function() {document.getElementById("image").setAttribute("src","' + src + '") } , 3000)</script>';
	Logger.log(src);
	Logger.log(ad);

	var ui = createUI();
	ui.showPopup({
		width: 500,
		height: 500,
		src: 'captcha.html',
		sourceType: UI.SourceType.LOCAL,
		title: 'Test popup',
		appendData: ad
	}, SpreadsheetApp.getActiveSpreadsheet());
}


function testRequest(captcha) {
	Logger.log('start test request');
	var result = Request(captcha);
	Logger.log('r ' + result.getContentText());
}
