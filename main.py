import webview
from pathlib import Path
from api.client import APIClient

api = APIClient("http://127.0.0.1:8000")
"""
Exemplo de uso:

estudantes = api.listar_estudantes()
print(estudantes)
"""

frontend = Path(__file__).parent / "Front-end" / "index.html"

webview.create_window(
    title="Sistema A+ Acadêmico",
    url=frontend.resolve().as_uri(),
    width=1200,
    height=800,
    min_size=(900, 600)
)

webview.start()
