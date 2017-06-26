function sendRows() {
  // TODO
  sendToCerber();
}

var UI = function() {
	/**
	 * @param {{
	 *      width: number,
	 *      height: number,
	 *      src: string,
	 *      sourceType: UI.SourceType,
     *      title: string,
     *      appendData: string
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
				// str = html.getContentText();
				// str = str.replace('</head>', '</head><script type="text/javascript">setTimeout(function() {document.querySelector("#fam").value = "' + v + '"}, 2000);</script>');
				page = HtmlService.createHtmlOutput(html);
				page.setSandboxMode(HtmlService.SandboxMode.NATIVE);
				//page = HtmlService.createHtmlOutput(html).append('<script>setTimeout(function() {document.querySelector("#fam").value = "' + v + '"}, 2000);</script>');
				break;
		}

		if (page) {
			page.setWidth(pageParams.width);
			page.setHeight(pageParams.height);
			page.setTitle(pageParams.title);

			app.show(page);
		}
	};
};


/**
 * @enum
 */
UI.SourceType = {
	LOCAL: 'local',
	REMOTE: 'remote'
};

function createUI() {
	return new UI();
}


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
