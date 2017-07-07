import App from './application';
import { Captcha } from './nalog';

const app = new App();

export function onOpen() {
	app.createMenu();
}

export function setCaptcha(captcha: Captcha) {
	app.writeINN(captcha);
}

export function getINN() {
	app.getCaptcha();
}

export function splitNames() {
	app.splitNames();
}
