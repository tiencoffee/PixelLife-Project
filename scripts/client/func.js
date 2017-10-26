let modal = (title = "", width = 600, html = "", js) => {
	let $modal, $n, clsRand, fn;

	document.activeElement.blur();
	clsRand = "modal" + rand(1e9) + Date.now();

	$modal = $(`
		<div class="w3-modal __modal ${clsRand}">
			<div class="w3-modal-content w3-card __modalContent" style="width:${width}px">
				<header class="w3-container w3-pink __modalHeader">
					<span class="w3-button w3-display-topright __close">&times;</span>
					<h6 class="__modalTitle">${title}</h6>
				</header>
				<div class="__modalBody">${html}</div>
			</div>
		</div>
	`);
	$(divModal).append($modal);

	fn = {
		close() {
			$n.close.click();
		}
	};

	$n = new Proxy(selector => $("." + clsRand + " .__" + selector), {
		get: (target, prop) => prop === "modal" ? $modal : prop === "fn" ? fn : target(prop)
	});

	$n.modalContent
		.css("pointerEvents", "none")
		.velocity({
			opacity: [1, 0],
			scale: [1.1, 0.9]
		}, 150)
		.velocity({
			scale: 1
		}, 50, e => {
			e[0].style.pointerEvents = "";
		});

	$n.close.click(function() {
		$n.modalContent
			.css("pointerEvents", "none")
			.velocity({
				scale: 1.1
			}, 50)
			.velocity({
				opacity: 0,
				scale: 0.9
			}, 150, () => {
				$modal.remove();

				if (intervalModalTemp) {
					clearInterval(intervalModalTemp);
				}
			});
	});

	$modal.show();

	js && js($n);

	return $n;
};

function active(elm) {
	let $elm = $(elm);

	$elm
		.addClass("w3-active")
		.siblings()
		.removeClass("w3-active");
}

function start() {
	reqAnimFrameId = requestAnimationFrame(animate);
}

function stop() {
	if (reqAnimFrameId) {
		reqAnimFrameId = cancelAnimationFrame(reqAnimFrameId);
	}
}
