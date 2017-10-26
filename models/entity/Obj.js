class Obj {
	constructor(data) {
		let i = 0;

		// SERVER {
		data.splice(1, 0, OModels[this.constructor.name]);
		// }

		for (let j in this.constructor.key) {
			let v = this.constructor.key[j];

			this[j] = data[i];

			if (v.user) {
				this.__defineGetter__(v.user, function() { return userx.find(v2 => v2.id === this[v.user + "Id"]); });
			}
			if (v.map) {
				this.__defineGetter__(v.map, function() { return mapx.find(v2 => v2.id === this[v.map + "Id"]); });
			}
			if (v.item) {
				this.__defineGetter__(v.item, function() { return itemx.find(v2 => v2.id === this[v.item + "Id"]); });
			}

			i++;
		}
	}

	normalize(isStorage) {
		let result = [];

		for (let i in this.constructor.key) {
			let v = this.constructor.key[i];

			if (v.server && isServer && !isStorage) {
				result.push(v.DEFAULT);
			}
			else {
				result.push(this[i]);
			}
		}

		return result;
	}
}

Obj.key = {};

Obj.keys = function(keys) {
	if (Img[this.name]) {
		keys.type = uint(Img[this.name].length - 1);
	}

	for (let i in keys) {
		keys[i][0].server = keys[i][1];
		keys[i][0].user = keys[i][2] ? i.replace(/Id$/, "") : undefined;
		keys[i][0].map = keys[i][3] ? i.replace(/Id$/, "") : undefined;
		keys[i][0].item = keys[i][4] ? i.replace(/Id$/, "") : undefined;

		keys[i] = keys[i][0];
	}

	this.key = Object.assign(Object.assign({}, this.key), keys);
};

Obj.prop = function(props) {
	for (let i in props) {
		if (!["key", "keys", "prop", "name", "constructor"].includes(i)) {
			this[i] = props[i];
		}
	}
};

Obj.keys({
	id: uint(),
	entityId: uint(),
	type: uint(0)
});
