class Item extends Obj {
	constructor(data) {
		super(data);
	}
}

Item.keys({
	userId: uint().USER,
	num: uint()
});
