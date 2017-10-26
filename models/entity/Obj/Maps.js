class Maps extends Obj {
	constructor(data) {
		super(data);
	}
}

Maps.keys({
	x: int(),
	y: int(),
	userId: uint(),
	areaId: uint(),
	homeId: uint()
});
