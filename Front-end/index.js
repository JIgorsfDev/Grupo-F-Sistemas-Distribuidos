const estudantes = [];

const campoPesquisa = document.getElementById("campoPesquisa");
const filtroCurso = document.getElementById("filtroCurso");
const filtroSituacao = document.getElementById("filtroSituacao");

const listaEstudantes = document.getElementById("listaEstudantes");

const btnPesquisar = document.getElementById("btnPesquisar");
const btnLimpar = document.getElementById("btnLimpar");

function atualizarIndicadores() {

    document.getElementById("totalEstudantes").textContent = estudantes.length;

    document.getElementById("estudantesAtivos").textContent =
        estudantes.filter(estudante => estudante.situacao === "Ativo").length;

    document.getElementById("estudantesInativos").textContent =
        estudantes.filter(estudante => estudante.situacao === "Inativo").length;

}

function carregarCursos() {

    const cursos = [...new Set(estudantes.map(estudante => estudante.curso))];

    cursos.forEach(curso => {

        const opcao = document.createElement("option");

        opcao.value = curso;
        opcao.textContent = curso;

        filtroCurso.appendChild(opcao);

    });

}

function exibirEstudantes(dados) {

    listaEstudantes.innerHTML = "";

    if (dados.length === 0) {

        listaEstudantes.innerHTML = `
            <tr>
                <td colspan="6">Nenhum estudante encontrado.</td>
            </tr>
        `;

        return;
    }

    dados.forEach(estudante => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${estudante.matricula}</td>
            <td>${estudante.nome}</td>
            <td>${estudante.curso}</td>
            <td>${estudante.semestre}º</td>
            <td>${estudante.situacao}</td>
            <td>
                <button onclick="visualizarEstudante('${estudante.matricula}')">
                    Visualizar
                </button>
            </td>
        `;

        listaEstudantes.appendChild(linha);

    });

}

function filtrarEstudantes() {

    const pesquisa = campoPesquisa.value.toLowerCase();

    const cursoSelecionado = filtroCurso.value;

    const situacaoSelecionada = filtroSituacao.value;

    const resultado = estudantes.filter(estudante => {

        const correspondePesquisa =
            estudante.nome.toLowerCase().includes(pesquisa) ||
            estudante.matricula.includes(pesquisa);

        const correspondeCurso =
            cursoSelecionado === "" || estudante.curso === cursoSelecionado;

        const correspondeSituacao =
            situacaoSelecionada === "" || estudante.situacao === situacaoSelecionada;

        return correspondePesquisa && correspondeCurso && correspondeSituacao;

    });

    exibirEstudantes(resultado);

}

function visualizarEstudante(matricula) {

    const estudante = estudantes.find(
        estudante => estudante.matricula === matricula
    );

    if (!estudante) return;
    document.getElementById("detalhesEstudante").innerHTML = `
        <h2>Detalhes do estudante</h2>
        <p><strong>Matrícula:</strong> ${estudante.matricula}</p>
        <p><strong>Nome:</strong> ${estudante.nome}</p>
        <p><strong>Curso:</strong> ${estudante.curso}</p>
        <p><strong>Semestre:</strong> ${estudante.semestre}º</p>
        <p><strong>Situação:</strong> ${estudante.situacao}</p>
    `;

}

btnPesquisar.addEventListener("click", filtrarEstudantes);
campoPesquisa.addEventListener("input", filtrarEstudantes);
filtroCurso.addEventListener("change", filtrarEstudantes);
filtroSituacao.addEventListener("change", filtrarEstudantes);
btnLimpar.addEventListener("click", function () {

    campoPesquisa.value = "";
    filtroCurso.value = "";
    filtroSituacao.value = "";

    filtrarEstudantes();
});

atualizarIndicadores();
carregarCursos();
irEstudantes(estudantes);
