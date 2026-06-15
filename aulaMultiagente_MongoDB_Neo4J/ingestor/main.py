"""Ingestor de cotações — ESQUELETO INICIAL.

Este arquivo existe apenas para o serviço subir e validar a infraestrutura
(`docker compose up` deve funcionar desde o primeiro commit).

O Agente Engenheiro de Dados deve SUBSTITUIR este conteúdo conforme
`docs/05_desenvolvimento_ingestao_modulo.md`:
    coleta na AwesomeAPI -> filtro de qualidade -> carga_mongo + carga_neo4j
"""
import os
import time

INTERVALO = int(os.getenv("INTERVALO_SEGUNDOS", "300"))


def main() -> None:
    print("[ingestor] esqueleto ativo — aguardando implementacao dos agentes.", flush=True)
    while True:
        print(f"[ingestor] ciclo placeholder; proximo em {INTERVALO}s.", flush=True)
        time.sleep(INTERVALO)


if __name__ == "__main__":
    main()
