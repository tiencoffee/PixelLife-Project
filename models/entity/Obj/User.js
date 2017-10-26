class User extends Obj {
	constructor(data) {
		super(data);

		this.socketId = "";
	}
}

User.keys({
	name: string(6, 12, "[a-z0-9]+"),
	pass: string(6, 48).SERVER,
	x: int(),
	y: int(),
	d: uint(3),
	hairItemId: int(-1).ITEM,
	coatItemId: int(-1).ITEM,
	pantItemId: int(-1).ITEM,
	areaId: uint(),
	homeId: int(-1)
});
