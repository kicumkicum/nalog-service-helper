function onOpen() {
	global.onOpen();
}

function setCaptcha(captcha) {
	global.setCaptcha(captcha);
}

function log(var_args) {
	const args = [].join.call(arguments, ', ');
	Logger.log(args);
}

function getINN() {
	global.getINN();
}

function splitNames() {
	global.splitNames();
}
