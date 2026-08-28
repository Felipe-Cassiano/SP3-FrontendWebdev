from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import json
import base64
import os

load_dotenv()
app = Flask(__name__)

# Libera o CORS para aceitar requisições do front-end React (Vite / Next)
CORS(app, resources={r"/api/*": {"origins": "*"}})

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/api/analisar", methods=["POST"])
def iaRequest():
    try:
        if "arquivo" not in request.files:
            return jsonify({"error": "Nenhum arquivo enviado"}), 400

        fotoDropada = request.files["arquivo"]
        fotoBase64 = base64.b64encode(fotoDropada.read()).decode("utf-8")
        fotoTipo = fotoDropada.content_type or "image/jpeg"

        resposta = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=[
                {
                    "parts": [
                        {
                            "inline_data": {
                                "mime_type": fotoTipo,
                                "data": fotoBase64
                            }
                        },
                        {
                            "text": """
Você é um especialista em edição de fotografia. Analise a imagem enviada e retorne um JSON indicando 
quais alterações são necessárias para melhorar a qualidade da imagem.
Retorne APENAS um JSON válido, sem nenhum texto adicional, sem explicações, sem markdown, sem ```json.
Neste formato exato:

{
  "alteracoes": {
    "brilho":      { "precisa": true,  "valor": 60 },
    "contraste":   { "precisa": true,  "valor": 45 },
    "saturacao":   { "precisa": false, "valor": 50 },
    "temperatura": { "precisa": false, "valor": 50 },
    "matiz":       { "precisa": false, "valor": 50 },
    "desfoque":    { "precisa": false, "valor": 0  }
  }
}

Regras:
- "precisa" é true somente se a imagem realmente precisa dessa alteração
- "valor" vai de 0 a 100, sendo 50 o valor padrão neutro
- Se "precisa" for false, retorne o "valor" padrão neutro
- Retorne APENAS o JSON, sem explicações
"""
                        }
                    ]
                }
            ]
        )

        texto_resposta = resposta.text.strip()
        # Limpa possíveis tags markdown da resposta da IA
        if texto_resposta.startswith("```"):
            lines = texto_resposta.split("\n")
            texto_resposta = "\n".join(lines[1:-1]) if lines[-1].startswith("```") else "\n".join(lines[1:])
        
        dados = json.loads(texto_resposta)
        return jsonify(dados)

    except Exception as e:
        print(f"Erro na requisição: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Roda a API Flask na porta 5000
    app.run(host="0.0.0.0", port=5000, debug=True)