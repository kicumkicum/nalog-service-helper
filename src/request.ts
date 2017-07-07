import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

export default class Request {
	fetch(method: string, url: string, data: Object, opt_headers: Object|null): HTTPResponse {
		const options = {
			'method': method,
			'payload': data,
			'muteHttpExceptions': true
		};
		return UrlFetchApp.fetch(url, options);
	}
}

export enum A {
	a
}
