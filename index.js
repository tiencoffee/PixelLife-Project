const express = require("express"),
	app = express(),
	server = require("http").Server(app),
	bodyParser = require("body-parser"),
	io = require("socket.io")(server),
	fs = require("fs"),
	os = require("os"),
	vm = require("vm"),
	crypto = require("crypto"),
	request = require("request"),
	jsplus = require("jsplus"),
	db = require("db"),
	use = require("use");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", "./views");

server.listen(process.env.PORT || 80);

process.on("uncaughtException", err => {
	fs.writeFileSync("./log.txt", err.stack);
	console.log(err);
});

function read(path) {
	return fs.readFileSync("./" + path + ".js", "utf8");
}

function browseEntity(path) {
	let dirs = fs.readdirSync(path).sort((a, b) => b.includes(".js"));

	for (let v of dirs) {
		if (v.endsWith(".js")) {
			let text = fs.readFileSync("./" + path + "/" + v);

			codeOModelsArr.push(v.slice(0, -3));
			codeModels += text;
		}
		else {
			browseEntity(path + "/" + v);
		}
	}
}

function browseObject(path) {
	let dirs = fs.readdirSync(path);

	codeOModelsArr.push(...dirs.map(v => v.slice(0, -3)));
}

function browseImg(path) {
	let dirs = fs.readdirSync(path);

	for (let v of dirs) {
		if (v.endsWith(".png")) {
			Img[v.slice(0, -4)] = 0;
		}
		else if (!v.includes(".")) {
			Img[v] = Array(fs.readdirSync(path + "/" + v).length).fill(0);
		}
	}
}

vm.runInThisContext(
	read("scripts/both/declrGlobal") +
	read("scripts/server/declrGlobal") +
	read("scripts/both/funcGlobal")
);

use("models/object/OCountry");
use("models/object/OArea");

browseEntity("./models/entity");
browseObject("./models/object");
// eval(read("scripts/server/build"));

browseImg("./public/img");

vm.runInThisContext(codeModels.replace(/(\r?\n)+\t*\/\/ client \{[\s\S]+?(\r?\n)+\t*\/\/ \}/gi, ""));
codeModels = codeModels.replace(/(\r?\n)+\t*\/\/ server \{[\s\S]+?(\r?\n)+\t*\/\/ \}/gi, "");

use("models/object/OModels");

eval(read("scripts/server/initGlobal"));

io.on("connection", socket => {
	let isLogged,
		me,
		userx = [],
		mapx = [],
		itemx = [];

	socket
		.on("register", (regObj = {}, callback) => {
			if (!isLogged) {
				let secretKey = "6Lf8cjQUAAAAAJlRevSFWoIpu2TUixId28NhO1JH",
					verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + regObj.captcha + "&remoteip=" + socket.request.connection.remoteAddress;

				if (users.some(v => v.name === regObj.name)) {
					callback(6);
				}
				else {
					request(verifyUrl, (err, res, body) => {
						body = JSON.parse(body);

						if (body.success) {
							let check =
								User.key.type(regObj.type) &&
								User.key.name(regObj.name) &&
								User.key.pass(regObj.pass) &&
								User.key.pass(regObj.repass) &&
								Hair.key.id(regObj.hairId) &&
								Coat.key.id(regObj.coatId) &&
								Pant.key.id(regObj.pantId) &&
								regObj.pass === regObj.repass &&
								regObj.agree;

							if (check) {
								me = new User([
									getInsertId(users),
									regObj.type,
									regObj.name,
									crypto.createHash("md5").update(SALT + regObj.pass).digest("hex"),
									10,
									10,
									0,
									-1,
									-1,
									-1,
									0,
									-1
								]);

								itemx = [
									new Hair([
										getInsertId(items),
										regObj.hairId,
										me.id,
										1
									]),
									new Coat([
										getInsertId(items) + 1,
										regObj.coatId,
										me.id,
										1
									]),
									new Pant([
										getInsertId(items) + 2,
										regObj.pantId,
										me.id,
										1
									])
								];

								me.hairItemId = itemx[0].id;
								me.coatItemId = itemx[1].id;
								me.pantItemId = itemx[2].id;

								users.push(me);
								items.push(itemx);

								callback();
							}
						}
					});
				}
			}
		})
		.on("registerCheckNameExist", (name, callback) => {
			callback(users.some(v => v.name === name) * 6);
		})
		.on("login", (name, pass, callback) => {
			if (!isLogged) {
				if (User.key.name(name) && User.key.pass(pass)) {
					pass = crypto.createHash("md5").update(SALT + pass).digest("hex");

					me = users.find(v => v.name === name);
					if (!me) {
						callback(8);
					}
					else if (me.pass !== pass) {
						callback(9);
					}
					else {
						isLogged = true;

						loggedFn(callback);
					}
				}
			}
		});

	function loggedFn(_callback) {
		me.socketId = socket.id;

		userx.splice(0, userx.length, ...users.filter(v => v.areaId === me.areaId));
		mapx = maps[me.areaId];
		itemx = items[me.id];

		_callback(
			0,
			me.id,
			userx.map(v => v.normalize()),
			mapx.map(v => v.normalize()),
			itemx.map(v => v.normalize())
		);

		socket
			.on("move", (...args) => {

			});
	}
});

app
	.get("/", (req, res) => {
		res.render("index", {
			codeModels,
			Img
		});
	})
	.get("/admin/:path(*)", (req, res) => {
		res.render("../admin/" + req.params.path);
	});
