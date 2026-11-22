
import requests


class APIClient:

    def __init__(self, base_url):
        self.base_url = base_url.rstrip("/")

    def get(self, endpoint):
        """
        Realiza uma requisição GET à API.
        """
        url = f"{self.base_url}/{endpoint.lstrip('/')}"

        try:
            resposta = requests.get(url, timeout=10)
            resposta.raise_for_status()

            return resposta.json()

        except requests.exceptions.RequestException as erro:
            print(f"Erro na comunicação com a API: {erro}")
            return None
          
    # Abaixo, estão os métodos que acessam os Endpoints
    
    def verificar_api(self):
        return self.get("/")

    def listar_estudantes(self):
        return self.get("/estudantes")

    def buscar_estudante(self, id):
        return self.get(f"/estudantes/{id}")

    def listar_disciplinas(self):
        return self.get("/disciplinas")

    def buscar_disciplina(self, codigo):
        return self.get(f"/disciplinas/{codigo}")

    def listar_matriculas(self):
        return self.get("/matriculas")

    def buscar_matricula(self, id):
        return self.get(f"/matriculas/{id}")

    def listar_avaliacoes(self):
        return self.get("/avaliacoes")

    def buscar_avaliacao(self, id):
        return self.get(f"/avaliacoes/{id}")

    def listar_notas(self):
        return self.get("/notas")

    def buscar_nota(self, id):
        return self.get(f"/notas/{id}")

    def listar_frequencias(self):
        return self.get("/frequencias")

    def buscar_frequencia(self, id):
        return self.get(f"/frequencias/{id}")
