/**
 * @global
 * @return {UI}
 */
function createUI() {
	return new UI();
}


/**
 * @global
 */
function testUI() {
	const ui = new UI();
	const app = SpreadsheetApp.getActiveSpreadsheet();
	const type = 1;
	switch (type) {
		case 1:
			ui.showPopup({
				width: 600,
				height: 600,
				src: 'http://service.nalog.ru/inn.do',
				sourceType: UI.SourceType.REMOTE,
				title: 'Test popup'
			}, app);
			break;
		case 2:
			ui.showPopup({
				width: 500,
				height: 500,
				src: 'fns-index.html',
				sourceType: UI.SourceType.LOCAL,
				title: 'Test popup'
			}, app);
			break;
	}
}



/**
 * @constructor
 */
var UI = function() {
	/**
	 * @param {{
	 *      width: number,
	 *      height: number,
	 *      src: string,
	 *      sourceType: UI.SourceType,
	 *		  title: string,
	 *      appendData: (string|undefined)
	 *  }} pageParams
	 * @param {{
	 *      show: function(*): void
	 *  }} app
	 */
	this.showPopup = function(pageParams, app) {
		var page = null;
		switch (pageParams.sourceType) {
			case UI.SourceType.LOCAL:
				page = HtmlService.createHtmlOutputFromFile(pageParams.src);
				if (pageParams.appendData) {
					page.append(pageParams.appendData);
				}
				break;
			case UI.SourceType.REMOTE:
				const html = UrlFetchApp.fetch(pageParams.src, {'muteHttpExceptions': true});
				Logger.log(html.getResponseCode());
				page = HtmlService.createHtmlOutput(html);
				page.setSandboxMode(HtmlService.SandboxMode.NATIVE);
				break;
		}

		if (page) {
			page.setWidth(pageParams.width);
			page.setHeight(pageParams.height);
			page.setTitle(pageParams.title);

			app.show(page);
		}
	};


	/**
	 * @param {string} captchaSrc
	 * @param {{
	 *      show: function(*): void
	 *  }} app
	 *  @this {UI}
	 */
	this.showCaptcha = function(captchaSrc, app) {
		const html = HtmlService.createHtmlOutputFromFile('captcha.html');
		const ad =
			'<script>' +
				' setTimeout(function() {document.getElementById("image").setAttribute("src","' + captchaSrc + '") } , 3000)' +
			'</script>';

		this.showPopup({
			width: 300,
			height: 200,
			src: 'captcha.html',
			sourceType: UI.SourceType.LOCAL,
			title: 'Captcha Loader',
			appendData: ad
		}, app);
	};
};


/**
 * @enum
 */
UI.SourceType = {
	LOCAL: 'local',
	REMOTE: 'remote'
};
