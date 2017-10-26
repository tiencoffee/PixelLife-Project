const isServer = false;

let isLogged,
	socket = io(location.href),
	me,
	userx = [],
	mapx = [],
	itemx = [],
	obj,
	intervalModalTemp,
	reqAnimFrameId;
