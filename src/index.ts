import App from './index';

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
 * @param {...*} var_args
 * @global
 */
export function log(var_args) {
	const args = [].join.call(arguments, ', ');
	Logger.log(args);
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
