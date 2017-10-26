temp = {
	SERVER() {
		this[1] = true;
		return this;
	},
	USER() {
		this[2] = true;
		return this;
	},
	MAP() {
		this[3] = true;
		return this;
	},
	ITEM() {
		this[4] = true;
		return this;
	}
};

function int(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
	let arr = [value => Number.isSafeInteger(value) && value >= min && value <= max];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = 0;
	arr.MIN = min;
	arr.MAX = max;
	return arr;
}

function uint(max = Number.MAX_SAFE_INTEGER) {
	let arr = [value => Number.isSafeInteger(value) && value >= 0 && value <= max];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = 0;
	arr.MIN = 0;
	arr.MAX = max;
	return arr;
}

function float(fixed = 2, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
	let arr = [value => Number.isFinite(value) && value >= min && value <= max && value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER && (Number.isInteger(value) || RegExp(`\\.\\d{0,${fixed}}$`).test(value))];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = 0;
	arr.MIN = min;
	arr.MAX = max;
	arr.FIXED = fixed;
	return arr;
}

function ufloat(fixed = 2, max = Number.MAX_SAFE_INTEGER) {
	let arr = [value => Number.isFinite(value) && value >= 0 && value <= max && value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER && (Number.isInteger(value) || RegExp(`\\.\\d{0,${fixed}}$`).test(value))];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = 0;
	arr.MIN = 0;
	arr.MAX = max;
	arr.FIXED = fixed;
	return arr;
}

function string(max = 65536, min = 0, pattern = ".*") {
	if (max < min) {
		[max, min] = [min, max];
	}
	pattern = "^" + pattern + "$";
	let arr = [value => typeof value === "string" && value.length >= min && value.length <= max && RegExp(pattern).test(value) && !/\r?\n/.test(value)];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = "";
	arr.MIN = min;
	arr.MAX = max;
	arr.PATTERN = pattern;
	return arr;
}

function text(max = 65536, min = 0, pattern = "[\\s\\S]*") {
	if (max < min) {
		[max, min] = [min, max];
	}
	pattern = "^" + pattern + "$";
	let arr = [value => typeof value === "string" && value.length >= min && value.length <= max && RegExp(pattern).test(value)];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = "";
	arr.MIN = min;
	arr.MAX = max;
	arr.PATTERN = pattern;
	return arr;
}

function bit() {
	let arr = [value => value === 0 || value === 1];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = 0;
	return arr;
}

function bool() {
	let arr = [value => value === true || value === false];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = false;
	return arr;
}

function array() {
	let arr = [value => Array.isArray(value)];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = [];
	return arr;
}

function object() {
	let arr = [value => typeof value === "object" && object.constructor === Object];
	arr.__defineGetter__("SERVER", temp.SERVER);
	arr.__defineGetter__("USER", temp.USER);
	arr.__defineGetter__("MAP", temp.MAP);
	arr.__defineGetter__("ITEM", temp.ITEM);
	arr.DEFAULT = {};
	return arr;
}
