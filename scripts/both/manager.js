let Manager = {
	user: {
		add(data) {
			if (isServer) {
				users.push(data);
			}
			else {
				userx.push(data);
			}
		}
	},
	map: {
		add(data) {
			if (isServer) {
				maps.push(data);
			}
			else {
				mapx.push(data);
			}
		}
	},
	item: {
		add(data) {
			if (isServer) {
				items.push(data);
			}
			else {
				itemx.push(data);
			}
		}
	}
};
