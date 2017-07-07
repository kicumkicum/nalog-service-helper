/**
 * @param {number} idx
 * @param {number} rem
 * @param {string} str
 * @return {string}
 */
String.prototype.splice = function(idx, rem, str) {
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
