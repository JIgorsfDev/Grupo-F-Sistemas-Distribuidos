
import {
    mediaNotas,
    percentualFrequencia,
    situacaoAcademica,
    relatorioDesempenho,
    relatorioPorDisciplina,
    mediaGeralPorEstudante
} from "./calculo.js";


const estudantes = [];

const campoPesquisa = document.getElementById("campoPesquisa");
const filtroCurso = document.getElementById("filtroCurso");
const filtroSituacao = document.getElementById("filtroSituacao");

const listaEstudantes = document.getElementById("listaEstudantes");

const btnPesquisar = document.getElementById("btnPesquisar");
const btnLimpar = document.getElementById("btnLimpar");

const detalhesEstudante = document.getElementById("detalhesEstudante");


function atualizarIndicadores() {

    document.getElementById("totalEstudantes").textContent =
        estudantes.length;

    document.getElementById("estudantesAtivos").textContent =
        estudantes.filter(estudante => estudante.situacao === "Ativo").length;

    document.getElementById("estudantesInativos").textContent =
        estudantes.filter(estudante => estudante.situacao === "Inativo").length;

}

function carregarCursos() {

    filtroCurso.length = 1;

    const cursos = [
        ...new Set(estudantes.map(estudante => estudante.curso))
    ].filter(Boolean);

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

        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 6;
        celula.textContent = "Nenhum estudante encontrado.";

        linha.appendChild(celula);
        listaEstudantes.appendChild(linha);

        return;
    }

    dados.forEach(estudante => {

        const linha = document.createElement("tr");

        const valores = [
            estudante.matricula,
            estudante.nome,
            estudante.curso,
            `${estudante.semestre}º`,
            estudante.situacao
        ];

        valores.forEach(valor => {

            const celula = document.createElement("td");

            celula.textContent = valor ?? "-";

            linha.appendChild(celula);

        });

        const celulaAcoes = document.createElement("td");

        const btnVisualizar = document.createElement("button");

        btnVisualizar.textContent = "Visualizar";
        btnVisualizar.dataset.matricula = estudante.matricula;

        celulaAcoes.appendChild(btnVisualizar);
        linha.appendChild(celulaAcoes);

        listaEstudantes.appendChild(linha);

    });

}


function filtrarEstudantes() {

    const pesquisa = campoPesquisa.value.toLowerCase().trim();

    const cursoSelecionado = filtroCurso.value;

    const situacaoSelecionada = filtroSituacao.value;

    const resultado = estudantes.filter(estudante => {

        const nome = String(estudante.nome ?? "").toLowerCase();
        const matricula = String(estudante.matricula ?? "");

        const correspondePesquisa =
            nome.includes(pesquisa) ||
            matricula.includes(pesquisa);

        const correspondeCurso =
            cursoSelecionado === "" ||
            estudante.curso === cursoSelecionado;

        const correspondeSituacao =
            situacaoSelecionada === "" ||
            estudante.situacao === situacaoSelecionada;

        return (
            correspondePesquisa &&
            correspondeCurso &&
            correspondeSituacao
        );

    });

    exibirEstudantes(resultado);

}



function visualizarEstudante(matricula) {

    const estudante = estudantes.find(
        estudante => String(estudante.matricula) === String(matricula)
    );

    if (!estudante) return;


    detalhesEstudante.innerHTML = `
        <div class="secao-cabecalho">
            <h2>Detalhes do estudante</h2>
            <p>Informações individuais do estudante selecionado.</p>
        </div>

        <div class="informacoes-estudante">
            <p><strong>Matrícula:</strong> <span id="detalheMatricula"></span></p>
            <p><strong>Nome:</strong> <span id="detalheNome"></span></p>
            <p><strong>Curso:</strong> <span id="detalheCurso"></span></p>
            <p><strong>Semestre:</strong> <span id="detalheSemestre"></span></p>
            <p><strong>Situação:</strong> <span id="detalheSituacao"></span></p>
        </div>
    `;


    document.getElementById("detalheMatricula").textContent =
        estudante.matricula ?? "-";

    document.getElementById("detalheNome").textContent =
        estudante.nome ?? "-";

    document.getElementById("detalheCurso").textContent =
        estudante.curso ?? "-";

    document.getElementById("detalheSemestre").textContent =
        `${estudante.semestre ?? "-"}º`;

    document.getElementById("detalheSituacao").textContent =
        estudante.situacao ?? "-";

}



listaEstudantes.addEventListener("click", evento => {

    const botao = evento.target.closest("[data-matricula]");

    if (!botao) return;

    visualizarEstudante(botao.dataset.matricula);

});



btnPesquisar.addEventListener("click", filtrarEstudantes);

campoPesquisa.addEventListener("input", filtrarEstudantes);

filtroCurso.addEventListener("change", filtrarEstudantes);

filtroSituacao.addEventListener("change", filtrarEstudantes);


btnLimpar.addEventListener("click", () => {

    campoPesquisa.value = "";
    filtroCurso.value = "";
    filtroSituacao.value = "";

    filtrarEstudantes();

});

const itensMenu = document.querySelectorAll(".menu-item");

itensMenu.forEach(item => {

    item.addEventListener("click", () => {

        itensMenu.forEach(menu => {
            menu.classList.remove("ativo");
        });

        item.classList.add("ativo");

    });

});

atualizarIndicadores();

carregarCursos();

exibirEstudantes(estudantes);
