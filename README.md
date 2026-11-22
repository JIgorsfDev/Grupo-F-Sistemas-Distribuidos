# Sistema de Desempenho Acadêmico

## Sobre o Projeto

Este projeto está sendo desenvolvido como atividade prática da disciplina de **Sistemas Distribuídos**, do Instituto Federal de Educação, Ciência e Tecnologia do Ceará (IFCE) – Campus Tianguá.

A aplicação tem como objetivo consumir uma API mock desenvolvida pelo Grupo E, responsável por disponibilizar dados acadêmicos fictícios, como estudantes, disciplinas, matrículas, avaliações, notas e frequência.

O Grupo F é responsável pelo desenvolvimento da aplicação cliente, que deverá interpretar, padronizar e apresentar essas informações por meio de um painel de desempenho acadêmico.

## Objetivos

- Consumir dados disponibilizados pela API do Grupo E.
- Apresentar informações sobre estudantes e disciplinas.
- Calcular médias acadêmicas.
- Identificar possíveis reprovações.
- Gerar relatórios de desempenho por disciplina.
- Tratar diferenças na representação de notas e informações incompletas.
- Aplicar conceitos de representação de dados e interoperabilidade.

## Tecnologias Utilizadas

- **Python:** linguagem utilizada na aplicação.
- **PyWebView:** criação da janela da aplicação desktop.
- **HTML5:** estrutura da interface.
- **CSS3:** estilização da interface.
- **JavaScript:** interações e funcionalidades da aplicação.
- **Requests:** comunicação HTTP com a API.
- **JSON:** formato de representação de dados, sujeito ao acordo com o Grupo E.
- **Git e GitHub:** controle de versão e colaboração.

## Estrutura do Projeto

```text
Grupo-F-Sistemas-Distribuidos/
│
├── src/
│   ├── main.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── client.py
│   ├── interoperability/
│   │   ├── __init__.py
│   │   └── normalization.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── academic.py
│   └── frontend/
│       ├── index.html
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── script.js
│       └── assets/
│           └── images/
│
├── docs/
│   ├── relatorio-integracao.md
│   └── documentacao-api.md
│
├── screenshots/
│
├── tests/
│   ├── test_api.py
│   ├── test_interoperability.py
│   └── test_academic.py
│
├── requirements.txt
├── .gitignore
└── README.md
```

## Funcionalidades

- [ ] Consulta de estudantes.
- [ ] Consulta de disciplinas.
- [ ] Visualização de matrículas.
- [ ] Consulta de notas e avaliações.
- [ ] Consulta de frequência.
- [ ] Padronização de notas em diferentes escalas.
- [ ] Tratamento de informações incompletas.
- [ ] Cálculo de médias.
- [ ] Identificação de reprovações.
- [ ] Relatórios por disciplina.

## Integração com a API

A aplicação consumirá os dados disponibilizados pelo Grupo E, responsável pela implementação do servidor mock.

As informações sobre os endpoints, formato de representação, estrutura das respostas e demais especificações serão documentadas após o alinhamento entre os grupos.

### API utilizada

- **Grupo responsável:** Grupo E.
- **Formato de dados:** A definir em conjunto com o Grupo E.
- **Endereço do servidor:** A definir.
- **Documentação dos endpoints:** A definir.

## Instalação e Execução

### 1. Pré-requisitos

- Python instalado.
- Git instalado.
- Visual Studio Code ou outro editor de código.
- Servidor da API mock do Grupo E disponível para integração.

### 2. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 3. Entrar na pasta do projeto

```bash
cd Grupo-F-Sistemas-Distribuidos
```

### 4. Criar um ambiente virtual

```bash
python -m venv venv
```

### 5. Ativar o ambiente virtual

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

### 6. Instalar as dependências

```bash
pip install -r requirements.txt
```

### 7. Executar a aplicação

```bash
python src/main.py
```

## Relatório de Integração

O relatório de integração documentará:

- Processo de comunicação com a API.
- Problemas encontrados durante a integração.
- Decisões sobre os padrões de interoperabilidade.
- Padronização das notas e identificadores.
- Tratamento de informações incompletas.
- Adaptações realizadas na aplicação cliente.

O documento estará disponível na pasta `docs/`.

## Screenshots

As capturas de tela da aplicação em funcionamento serão armazenadas na pasta `screenshots/`.

## Equipe — Grupo F

**Disciplina:** Sistemas Distribuídos  
**Instituição:** IFCE – Campus Tianguá  
**Professor:** Dr. Nécio de Lima Veras  
**Estudo de Caso:** 3 – Integração entre Sistemas Acadêmicos  
**Grupo parceiro:** Grupo E – API Mock

### Integrantes

- Pessoa 1 – Integração com a API.
- Pessoa 2 – Tratamento e interoperabilidade.
- Pessoa 3 – Desenvolvimento da interface.
- Pessoa 4 – Funcionalidades e cálculos.
- Pessoa 5 – Documentação e organização.

## Demonstração

A aplicação será apresentada por meio de uma demonstração prática de consumo da API mock, evidenciando a comunicação entre os sistemas e o tratamento dos dados acadêmicos.

## Disciplina

Sistemas Distribuídos – 2026.2
