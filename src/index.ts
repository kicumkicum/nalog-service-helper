import App from './application';

const app = new App();

/**
 * @callback
 */
export function onOpen() {
	app.createMenu();
}


/**
 * @param {Captcha} captcha
 */
export function __setCaptcha(captcha) {
	app.writeINN(captcha);
}


/**
 * @private
 */
export function _getINN() {
	app.getCaptcha();
}


/**
 * @private
 */
export function _splitNames() {
	app.splitNames();
}

export function foo() {
	Logger.log('foo');
}
