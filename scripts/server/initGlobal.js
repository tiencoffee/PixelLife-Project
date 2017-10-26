function getInsertId(obj) {
	if (obj.length) {
		let max = -1;

		for (let i = 0; i < obj.length; i++) {
			if (obj === maps || obj === items) {
				for (let j = 0; j < obj[i].length; j++) {
					if (max < obj[i][j].id) {
						max = obj[i][j].id;
					}
				}
			}
			else {
				if (max < obj[i].id) {
					max = obj[i].id;
				}
			}
		}

		return max + 1;
	}

	return 0;
}

users = db.read("users");
maps = db.read("maps");
items = db.read("items");

for (let i = 0; i < users.length; i++) {
	users[i] = new OModels[users[i][1]](users[i]);
}

for (let i = 0; i < maps.length; i++) {
	for (let j = 0; j < maps[i].length; j++) {
		maps[i][j] = new OModels[maps[i][j][1]](maps[i][j]);
	}
}

for (let i = 0; i < items.length; i++) {
	for (let j = 0; j < items[i].length; j++) {
		items[i][j] = new OModels[items[i][j][1]](items[i][j]);
	}
}
