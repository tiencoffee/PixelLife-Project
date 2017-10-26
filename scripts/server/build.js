{
	let line = read("models/object/OModels").split(os.EOL),
		line1 = "",
		index;

	codeOModelsArr = codeOModelsArr.filter(v => v !== "OModels");

	if (line[1].trim()) {
		line[1] += ", ";
	}

	for (let v of codeOModelsArr) {
		if (!line[1].includes(v + ", ")) {
			line1 += v + ", ";
		}
	}
	line[1] = (line[1] + line1).slice(0, -2);

	fs.writeFileSync("./models/object/OModels.js", line.join(os.EOL));
}
