(function() {
	var img = new Image();
	document.addEventListener("keydown", function(event) {
		var key = event.keyCode;
		if (key == 123 || event.ctrlKey && ([67, 73, 74].includes(key) && event.shiftKey || key == 85)) {
			event.preventDefault();
			event.stopPropagation();
		}
	});
	Object.defineProperty(img, "id", {
		get: function () {
			history.back();
		}
	});
	console.log("%c", img);
})();
