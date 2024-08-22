const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function generateDzi(inputPath, outputDir) {
	const outputName = path.basename(inputPath, path.extname(inputPath));
	const dziOutputPath = path.join(outputDir, `${outputName}.dzi`);
	const dziFolderPath = path.join(outputDir, `${outputName}_files`);

	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	try {
		await sharp(inputPath)
			.png()
			.tile({
				size: 256,
				overlap: 0,
				layout: "dz",
			})
			.toFile(dziOutputPath);

		console.log(`DZI generated at: ${dziOutputPath}`);
		console.log(`Tiles folder: ${dziFolderPath}`);
	} catch (error) {
		console.error("Error generating DZI:", error);
	}
}

const inputPath = "input.png"; // Substitua pelo caminho do seu arquivo PNG
const outputDir = "output"; // Substitua pelo caminho do diretório de saída

generateDzi(inputPath, outputDir);
