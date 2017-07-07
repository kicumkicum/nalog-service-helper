import Request from './request';

const CAPTCHA_BASE_URL = 'https://service.nalog.ru/static/captcha.html';
const SERVICE_BASE_URL = 'https://service.nalog.ru/inn.do';
//https://service.nalog.ru/static/captcha.html?r=1498150605927&a=

export default class Nalog {
	private request: Request;

	constructor() {
		this.request = new Request();
	}

	getINN(data: InputData, captcha: Captcha): number {
		const url = 'https://service.nalog.ru/inn-proc.do';
		const newData = this.createOutData(data, captcha);
		const responseRaw = this.request.fetch('post', url, newData, null);
		// log(responseRaw);
		const response = JSON.parse(responseRaw.getContentText());

		if (response['inn'] && response['code'] === 1) {
			return response['inn'];
		} else {
			throw response;
		}
	}

	getCaptchaImageSrc(): string {
		const captchaToken = this.loadCaptchaToken();
		return this.loadCaptchaImageSrc(captchaToken.loadTime, captchaToken.token);
	}

	private createOutData(data: InputData, captcha: Captcha): OutputtData {
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
	}

	private loadCaptchaImageSrc(loadTime: number, token: string): string {
		return CAPTCHA_BASE_URL + '?r=' + loadTime + '&a=' + token;
	}

	private loadCaptchaToken(): CaptchaData {
		const now = Math.floor(Date.now() / 1000);
		const response = UrlFetchApp.fetch(CAPTCHA_BASE_URL + '?' + now).getContentText();
		return {
			loadTime: now,
			token: response
		};
	}
}


interface Deps {
	request: Request
}

export interface InputData {
	fam: string,
	nam: string,
	otch: string,
	bdate: string,
	docno: string,
	docdt: string
}

interface OutputtData extends InputData{
	captcha: string,
	captchaToken: string,
	c: string,
	bplace: string,
	doctype: string
}

export interface Captcha {
	token: string,
	value: string
}

interface CaptchaData {
	loadTime: number,
	token: string
}
