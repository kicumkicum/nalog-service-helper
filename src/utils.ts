
export default {
	spliceString: (string: string, idx: number, rem: number, str: string): string => {
		return string.slice(0, idx) + str + string.slice(idx + Math.abs(rem));
	}
}
