import App from './application';
import { Captcha } from './nalog';

const app = new App();

export function onOpen() {
	app.createMenu();
}

export function __setCaptcha(captcha: Captcha) {
	app.writeINN(captcha);
}

export function _getINN() {
	app.getCaptcha();
}

export function _splitNames() {
	app.splitNames();
}
