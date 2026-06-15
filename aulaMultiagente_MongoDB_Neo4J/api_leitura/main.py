"""API de leitura — ESQUELETO INICIAL.

Sobe um FastAPI mínimo para validar a infraestrutura e a integração com o Grafana.
Acesse http://localhost:8000/health e http://localhost:8000/docs

O Agente Engenheiro de Dados deve implementar os endpoints reais conforme
`docs/04_contratos_de_api.md` (ex.: /mongo/serie, /mongo/resumo, /neo4j/grafo,
/neo4j/caminho).
"""
from fastapi import FastAPI

app = FastAPI(title="API de Leitura — Câmbio NoSQL", version="0.1.0")


@app.get("/health")
def health():
    return {"status": "ok", "detalhe": "esqueleto — endpoints reais pendentes"}
