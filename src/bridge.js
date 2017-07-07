function onOpen() {
	global.onOpen();
}

function __setCaptcha(captcha) {
	global.__setCaptcha(captcha);
}

function log(var_args) {
	const args = [].join.call(arguments, ', ');
	Logger.log(args);
}

function _getINN() {
	global._getINN();
}

function _splitNames() {
	global._splitNames();
}
