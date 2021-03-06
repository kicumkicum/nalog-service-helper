import HTTPResponse = GoogleAppsScript.HTML.HtmlService;

export default class UI {
	showPopup(pageParams: PageParams, app) {
		let page = null;
		switch (pageParams.sourceType) {
			case SourceType.LOCAL:
				page = HtmlService.createHtmlOutputFromFile(pageParams.src);
				if (pageParams.appendData) {
					page.append(pageParams.appendData);
				}
				break;
			case SourceType.REMOTE:
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
	}

	showCaptcha(captchaSrc: string, app) {
		const html = HtmlService.createHtmlOutputFromFile('captcha.html');
		const ad =
			'<script>' +
			' setTimeout(function() {document.getElementById("image").setAttribute("src","' + captchaSrc + '") } , 3000)' +
			'</script>';

		this.showPopup({
			width: 300,
			height: 200,
			src: 'captcha.html',
			sourceType: SourceType.LOCAL,
			title: 'Captcha Loader',
			appendData: ad
		}, app);
	}
}

export enum SourceType {
	LOCAL,
	REMOTE
}

export interface PageParams {
	width: number,
	height: number,
	src: string,
	sourceType: SourceType,
	title: string,
	appendData: string|undefined
}
