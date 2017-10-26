alert(content, okFn) {
	return modal("Thông báo", 300, `
		<div class="w3-padding w3-center">
			<p class="w3-left-align">${content}</p>
			<div class="w3-button w3-gray __close">OK</div>
		</div>
	`, $0 => {
		$0.close.click(okFn);
	});
},

log(code, okFn) {
	return Task.alert(Log[code], okFn);
},

register() {
	if (typeof grecaptcha !== "undefined") {
		return modal("Đăng ký", 400, `
			<form class="w3-padding w3-center __form" autocomplete="off">
				<input type="text" name="name" class="w3-input" placeholder="Tên nhân vật &nbsp; (a-z, 0-9, 6-12 ký tự)" pattern="[a-z0-9]+" minlength="6" maxlength="12" required value="tttttt">
				<input type="password" name="pass" class="w3-input" placeholder="Mật khẩu &nbsp; (6-48 ký tự)" minlength="6" maxlength="48" required value="tttttt">
				<input type="password" name="repass" class="w3-input" placeholder="Nhập lại mật khẩu" minlength="6" maxlength="48" required value="tttttt">
				<div class="g-recaptcha w3-margin-top __captcha" style="transform:scaleX(1.2)"></div>
				<div>
					<input type="checkbox" name="agree" id="131017190739" class="w3-check" required checked>
					<label for="131017190739">Tôi đã đọc và đồng ý với điều khoản</label>
				</div>
				<input type="submit" class="w3-button w3-pink w3-margin-top __next" value="Tiếp tục">
			</form>
		`, $0 => {
			let $1,
				captcha,
				regObj = {
					type: 0,
					hairId: 0,
					coatId: 0,
					pantId: 0
				};

			captcha = grecaptcha.render($0.captcha[0], {
				sitekey: "6Lf8cjQUAAAAANyA5-ArdtQMlP9QXDqlQNa4CP23",
				"expired-callback"() {
					Task.log(5, () => {
						$1.fn.close();
					});
				}
			});

			$0.form.submit(function(event) {
				event.preventDefault();

				if (!grecaptcha.getResponse(captcha)) {
					Task.log(1);
				}
				else if (this.pass.value !== this.repass.value) {
					Task.log(2);
				}
				else {
					regObj.name = this.name.value;
					regObj.pass = this.pass.value;
					regObj.repass = this.repass.value;
					regObj.captcha = grecaptcha.getResponse(captcha);
					regObj.agree = this.agree.checked;

					socket.emit("registerCheckNameExist", this.name.value, code => {
						if (code) {
							Task.log(code);
						}
						else {
							$1 = Task.registerChooseCharacter($0, regObj, captcha);
						}
					});
				}
			});
		});
	}
	else {
		Task.log(3);
	}
},

registerChooseCharacter($0, regObj, captcha) {
	return modal("Tùy chọn nhân vật", 600, `
		<div class="w3-row">
			<div class="w3-bar w3-light-gray w3-border-bottom">
				<button class="w3-bar-item w3-button __tab" data-img="User" data-prop="type">Màu da</button>
				<button class="w3-bar-item w3-button __tab" data-img="Hair" data-prop="hairId">Tóc</button>
				<button class="w3-bar-item w3-button __tab" data-img="Coat" data-prop="coatId">Áo</button>
				<button class="w3-bar-item w3-button __tab" data-img="Pant" data-prop="pantId">Quần</button>
			</div>
			<div class="w3-col s4 w3-flex" style="height:320px">
				<canvas class="__draw" width="${px}" height="${px * 2}"></canvas>
			</div>
			<div class="w3-col s8" style="height:320px">
				<div class="w3-row w3-overflow-auto __list"></div>
			</div>
			<div class="w3-col s12 w3-center w3-padding">
				<button class="w3-button w3-pink __submit">Đăng ký</button>
			</div>
		</div>
	`, $1 => {
		let g = $1.draw[0].getContext("2d");

		g.imageSmoothingEnabled = false;

		$1.tab
			.click(clickFn)
			.first()
			.click();

		function clickFn() {
			if (Img[this.dataset.img] && regObj[this.dataset.prop] !== undefined) {
				active(this);

				$1.list.empty();

				for (let i = 0; i < Img[this.dataset.img].length; i++) {
					let $elm;

					$elm = $(`
						<div class="w3-col s2 w3-flex">
							<div style="background:url(${Img[this.dataset.img][i].src}) 0 0/${px * 2}px no-repeat;width:${px / 2}px;height:${px}px"></div>
						</div>
					`);
					$1.list.append($elm);

					$elm.click(() => {
						active($elm);
						regObj[this.dataset.prop] = i;
						drawFn();
					});

					if (i === regObj[this.dataset.prop]) {
						active($elm);
					}
				}
			}
		}

		function drawFn() {
			g.clearRect(0, 0, px, px * 2);

			g.drawImage(Img.User[regObj.type], 0, 0, cpx, cpx * 2, 0, 0, px, px * 2);
			g.drawImage(Img.Pant[regObj.pantId], 0, 0, cpx, cpx * 2, 0, 0, px, px * 2);
			g.drawImage(Img.Coat[regObj.coatId], 0, 0, cpx, cpx * 2, 0, 0, px, px * 2);
			if (Date.now() % 5000 >= 200) {
				g.drawImage(Img.eye, 0, 0, cpx, cpx * 2, 0, 0, px, px * 2);
			}
			g.drawImage(Img.Hair[regObj.hairId], 0, 0, cpx, cpx * 2, 0, 0, px, px * 2);
		}
		drawFn();

		intervalModalTemp = setInterval(drawFn, 200);

		$1.submit.click(() => {
			socket.emit("register", regObj, code => {
				if (code) {
					Task.log(code);
				}
				else {
					grecaptcha.reset(captcha);

					Task.log(7, () => {
						$1.fn.close();
						$0.fn.close();

						frmLogin.name.value = regObj.name;
						frmLogin.pass.value = regObj.pass;
					});
				}
			});
		});
	});
},

login() {
	$(frmLogin).submit(function(event) {
		event.preventDefault();

		socket.emit("login", this.name.value, this.pass.value, (code, meId, _userx, _mapx, _itemx) => {
			if (code) {
				Task.log(code);
			}
			else {
				isLogged = true;

				if (_userx) {
					userx.splice(0, userx.length, ..._userx.map(v => new OModels[v[1]](v)));
				}
				if (_mapx) {
					mapx.splice(0, mapx.length, ..._mapx.map(v => new OModels[v[1]](v)));
				}
				if (_itemx) {
					itemx.splice(0, itemx.length, ..._itemx.map(v => new OModels[v[1]](v)));
				}

				me = userx.find(v => v.id === meId);
				me.socketId = socket.id;
			}
		});
	});
},
