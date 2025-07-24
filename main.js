import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import 'dotenv/config';

// Valida a chave da API no início
if (!process.env.GOOGLE_GENAI_API_KEY) {
  console.error("Erro: Chave da API (GOOGLE_GENAI_API_KEY) não encontrada no .env");
  process.exit(1); // Encerra o processo se a chave não for encontrada
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
const RESULTADOS_DIR = "./resultados"; // Constante para o diretório de resultados

/**
 * Gera uma imagem com base em um prompt fornecido.
 * @param {string} promptImagem - O prompt para a geração da imagem.
 */
async function gerarImagem(promptImagem) {
  console.log("\n--- Gerando Imagem ---");

  // Prompt aprimorado para a imagem, focando em unicidade e estilo
  const enhancedPrompt = `${promptImagem}, obra de arte digital, estilo surrealista, iluminação cinematográfica, paleta de cores vibrantes, composição dinâmica, detalhes intrincados, perspectiva única, atmosfera etérea, alta resolução, 8k, ultra detalhado, foco nítido`;
  console.log("Prompt final para imagem:", enhancedPrompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: enhancedPrompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log("Texto gerado:", part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const nomeArquivo = `${Math.floor(Math.random() * 10000)}.png`;

        // Garante que o diretório 'resultados' existe
        if (!fs.existsSync(RESULTADOS_DIR)) {
          fs.mkdirSync(RESULTADOS_DIR);
        }

        fs.writeFileSync(`${RESULTADOS_DIR}/${nomeArquivo}`, buffer);
        console.log(`Imagem salva em ${RESULTADOS_DIR}/${nomeArquivo}`);
      }
    }
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
  }
}

/**
 * Gera um prompt de imagem aleatório usando o modelo de texto e, em seguida, gera a imagem.
 */
async function main() {
  console.log("--- Gerando Prompt de Imagem ---");
  // Prompt aprimorado para o texto, pedindo ideias mais criativas e específicas
  const promptTexto = "Crie um prompt com uma ideia de imagem aleatória, única e altamente criativa. Pense em conceitos abstratos, cenários futuristas ou elementos fantásticos. Evite faróis, capivaras e animais em geral. Seja direto na sugestão, com no máximo uma frase.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: promptTexto,
    });

    const promptGerado = response.text;
    console.log("Prompt gerado para imagem:", promptGerado);
    await gerarImagem(promptGerado);
  } catch (error) {
    console.error("Erro ao gerar prompt de texto:", error);
  }
}

main(); // Inicia a execução do script