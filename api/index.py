from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import json
import base64
import os

load_dotenv()
app = Flask(__name__)
CORS(app)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/api/analisar", methods=["POST"])
def iaRequest():
    fotoDropada = request.files["arquivo"]
    fotoBase64 = base64.b64encode(fotoDropada.read()).decode("utf-8")
    fotoTipo = fotoDropada.content_type

    resposta = client.models.generate_content(
        model="gemini-2.5-flash-lite",
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
    "saturacao":   { "precisa": false, "valor": 0  },
    "temperatura": { "precisa": false, "valor": 0  },
    "matiz":       { "precisa": false, "valor": 0  },
    "desfoque":    { "precisa": false, "valor": 0  }
  }
}

Regras:
- "precisa" é true somente se a imagem realmente precisa dessa alteração
- "valor" vai de 0 a 100, sendo 50 o valor normal
- Se "precisa" for false, "valor" deve ser 0
- Retorne APENAS o JSON, sem explicações
"""
                    }
                ]
            }
        ]
    )

    texto_resposta = resposta.text
    texto_resposta = texto_resposta.replace("```json", "").replace("```", "").strip()
    dados = json.loads(texto_resposta)
    return jsonify(dados)