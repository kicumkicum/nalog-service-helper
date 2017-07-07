var global = {};

/**
 * @callback
 */
function onOpen() {
	global.app.createMenu();
}


/**
 * @param {Nalog.Captcha} captcha
 */
function __setCaptcha(captcha) {
	global.app.writeINN(captcha);
}


/**
 * @param {...*} var_args
 * @global
 */
function log(var_args) {
	const args = [].join.call(arguments, ', ');
	Logger.log(args);
}


/**
 * @private
 */
function _getINN() {
	global.app.getCaptcha();
}


/**
 * @private
 */
function _splitNames() {
	global.app.splitNames();
}
