import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import 'dotenv/config';

if (process.env.GOOGLE_GENAI_API_KEY) {
  console.log("API key == ok");
} else {
  console.log("API key == não encontrada");
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
let valorTeste;



async function image(valorTeste) {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });


  const contents = valorTeste + ' realista, fotografia, alta qualidade, 8k, ultra realista, foco nítido, iluminação dramática, composição equilibrada, cores vibrantes, detalhes intrincados, perspectiva única, atmosfera envolvente';
  console.log(contents);

  console.log("\n === passo 02 ===")
  // Set responseModalities to include "Image" so the model can generate  an image
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      const nome_arquivo = Math.floor(Math.random() * 10000) + ".png";
      // Ensure the directory exists
      if (!fs.existsSync("./resultados")) {
        fs.mkdirSync("./resultados");
      }
      fs.writeFileSync("./resultados/" + nome_arquivo, buffer);
      console.log("Image saved as ./resultados/" + nome_arquivo);
    }
  }
}
// main();

async function texto() {
  const prompt = "crie um prompt com uma ideia (seja direto na sugestão) de imagem aleatória (NÃO FAÇA POLVOS, ASTRONALTAS, FAROIS, capivaras OU URSOS)";
  console.log("=== passo 01 ===")

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
  });

  valorTeste = response.text;
  await image(valorTeste);
}

texto();
