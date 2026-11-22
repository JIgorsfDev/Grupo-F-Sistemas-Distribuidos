import webview
from pathlib import Path

frontend = Path(__file__).parent / "Front-end" / "index.html"

webview.create_window(
    title="Sistema A+ Acadêmico",
    url=frontend.resolve().as_uri(),
    width=1200,
    height=800,
    min_size=(900, 600)
)

webview.start()
