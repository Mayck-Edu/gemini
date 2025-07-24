# Gemini Image Generator

Este projeto utiliza a API do Google Gemini para gerar prompts de imagens e criar imagens realistas automaticamente, salvando o resultado localmente.

## Funcionalidades

- Gera sugestões de prompts para imagens de forma aleatória (com restrições de temas).
- Utiliza o modelo Gemini para criar imagens realistas a partir dos prompts.
- Salva a imagem gerada como `gemini-native-image.png` no diretório do projeto.

## Pré-requisitos

- Node.js 18+
- Uma chave de API do Google Gemini (defina em uma variável de ambiente `GOOGLE_GENAI_API_KEY`)

## Instalação

1. Clone este repositório:
   ```powershell
   git clone https://github.com/Mayck-Edu/gemini.git
   cd gemini
   ```

2. Instale as dependências:
   ```powershell
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API:
   ```
   GOOGLE_GENAI_API_KEY=sua_chave_aqui
   ```

## Uso

Execute o script principal:
```powershell
node main.js
```

O prompt gerado e a imagem criada serão exibidos no terminal e salvos como `gemini-native-image.png`.

## Observações

- O prompt evita temas como polvos, astronautas, faróis ou ursos.
- O projeto utiliza os modelos `gemini-2.5-pro` e `gemini-2.0-flash-preview-image-generation`.

---

Desenvolvido por [Mayck-Edu](https://github.com/Mayck-Edu)
