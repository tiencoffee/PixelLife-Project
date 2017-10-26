/* JSPlus 1.0.0 Apr 2017 by TienCoffee */

const rand = function(a, b = 0) {
	if (a > b)
		[a, b] = [b, a];

	return Math.floor(a + Math.random() * (Math.abs(b - a) + 1));
};

const random = function(a = 1, b = 0) {
	if (a > b)
		[a, b] = [b, a];

	return a + Math.random() * (Math.abs(b - a));
};

Object.defineProperties(Object, {
	size: {
		value(a) {
			var b = 0;
			for (let c in a) a.hasOwnProperty(c) && b++;
			return b
		}
	}
});

Object.defineProperties(Array.prototype, {
	chunk: {
		value(a = 1) {
			if (a *= 1, 0 === a) return this;
			var c, b = [];
			for (c = 0; c < this.length; c += a) b.push(this.slice(c, c + a));
			return b
		}
	},
	combine: {
		value(a) {
			var c, b = {};
			for (c = 0; c < this.length; c++) b[a[c]] = this[c];
			return b
		}
	},
	fill: {
		value(a, b = 0, c = this.length) {
			var d;
			for (d = +b; d < c; d++) this[d] = a;
			return this
		}
	},
	first: {
		value() {
			return this[0]
		}
	},
	last: {
		value() {
			return this[this.length - 1]
		}
	},
	nth: {
		value(a = 0) {
			return a < 0 ? this[this.length + +a] : this[a]
		}
	},
	rand: {
		value() {
			return this[Math.floor(Math.random() * this.length)]
		}
	},
	shuffle: {
		value() {
			var b, a = this.slice(0);
			for (this.splice(0); a.length;) b = Math.floor(Math.random() * a.length), this.push(a[b]), a.splice(b, 1);
			return this
		}
	},
	unique: {
		value() {
			var b, c, a = this.slice(0);
			for (b = 0; b < a.length - 1; b++)
				for (; b !== (c = a.lastIndexOf(a[b]));) a.splice(c, 1);
			return a
		}
	}
});

Object.defineProperties(String.prototype, {
	isBlank: {
		value() {
			return 0 === this.valueOf().trim().length
		}
	},
	isEmpty: {
		value() {
			return 0 === this.valueOf().length
		}
	},
	isLowerCase: {
		value() {
			var a = this.valueOf();
			return a === a.toLowerCase()
		}
	},
	isNumeric: {
		value() {
			return NaN !== +this.valueOf()
		}
	},
	isUpperCase: {
		value() {
			var a = this.valueOf();
			return a === a.toUpperCase()
		}
	},
	ln2br: {
		value() {
			return this.valueOf().replace(/\n/g, "<br>")
		}
	},
	lowerFirst: {
		value() {
			var a = this.valueOf();
			return a[0].toLowerCase() + a.slice(1)
		}
	},
	upperFirst: {
		value() {
			var a = this.valueOf();
			return a[0].toUpperCase() + a.slice(1)
		}
	}
});

Object.defineProperties(Number.prototype, {
	toSign: {
		value() {
			var a = this.valueOf();
			return a > 0 ? "+" + a : "" + a
		}
	},
	zeroFill: {
		value(a) {
			var c, d, b = this.valueOf();
			return d = b.toString().match(/(\-?)(\d+)(.*)/), c = (c = a - d[2].length) > 0 ? "0".repeat(c) : "", d[1] + c + d[2] + d[3]
		}
	}
});

Object.defineProperties(Audio.prototype, {
	replay: {
		value() {
			this.load();
			this.play();
		}
	}
});

const KeyboardMap = {
	8: "Backspace",
	9: "Tab",
	13: "Enter",
	16: "Shift",
	17: "Ctrl",
	18: "Alt",
	19: "Pause/Break",
	20: "Caps Lock",
	27: "Esc",
	32: "Space",
	33: "Page Up",
	34: "Page Down",
	35: "End",
	36: "Home",
	37: "Left",
	38: "Up",
	39: "Right",
	40: "Down",
	45: "Insert",
	46: "Delete",
	48: "0",
	49: "1",
	50: "2",
	51: "3",
	52: "4",
	53: "5",
	54: "6",
	55: "7",
	56: "8",
	57: "9",
	65: "A",
	66: "B",
	67: "C",
	68: "D",
	69: "E",
	70: "F",
	71: "G",
	72: "H",
	73: "I",
	74: "J",
	75: "K",
	76: "L",
	77: "M",
	78: "N",
	79: "O",
	80: "P",
	81: "Q",
	82: "R",
	83: "S",
	84: "T",
	85: "U",
	86: "V",
	87: "W",
	88: "X",
	89: "Y",
	90: "Z",
	91: "Windows",
	93: "Right Click",
	96: "Numpad 0",
	97: "Numpad 1",
	98: "Numpad 2",
	99: "Numpad 3",
	100: "Numpad 4",
	101: "Numpad 5",
	102: "Numpad 6",
	103: "Numpad 7",
	104: "Numpad 8",
	105: "Numpad 9",
	106: "Numpad *",
	107: "Numpad +",
	109: "Numpad -",
	110: "Numpad .",
	111: "Numpad /",
	112: "F1",
	113: "F2",
	114: "F3",
	115: "F4",
	116: "F5",
	117: "F6",
	118: "F7",
	119: "F8",
	120: "F9",
	121: "F10",
	122: "F11",
	123: "F12",
	144: "Num Lock",
	145: "Scroll Lock",
	182: "My Computer",
	183: "My Calculator",
	186: ";",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'"
};
