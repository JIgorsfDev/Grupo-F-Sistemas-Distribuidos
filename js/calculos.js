export const CONFIG = {
    mediaAprovacao: 7,
    frequenciaMinima: 0.75,
};

function verificaNumero(valor) {
    return typeof valor === "number" && Number.isFinite(valor);
}

export function mediaNotas(notas) {
    let soma = 0;
    let qtde_notas = 0;

    for (const nota of notas) {
        if (verificaNumero(nota)) {
            soma += nota;
            qtde_notas += 1;
        }
    }

    if (qtde_notas === 0) {
        return null;
    }

    return soma / qtde_notas;
}

export function percentualFrequencia(presente, aulasMinistradas) {
    if (!verificaNumero(presente) || !verificaNumero(aulasMinistradas)) {
        return null;
    }

    if (aulasMinistradas <= 0) {
        return null;
    }

    return presente / aulasMinistradas;
}

export function situacaoAcademica(media, frequencia, cfg = CONFIG) {
    if (frequencia != null && frequencia < cfg.frequenciaMinima) {
        return "REPROVADO_FALTA";
    }

    if (media != null && media < cfg.mediaAprovacao) {
        return "REPROVADO_MEDIA";
    }

    if (media == null || frequencia == null) {
        return "INCOMPLETO";
    }

    return "APROVADO";
}

export function relatorioDesempenho({ estudantes, disciplinas, matriculas, frequencias, notas }, cfg = CONFIG) {
    const resultado = [];

    for (const matricula of matriculas) {

        let nomeEstudante = "Estudante " + matricula.estudante_id;
        for (const estudante of estudantes) {
            if (estudante.id === matricula.estudante_id) {
                nomeEstudante = estudante.nome;
            }
        }

        let nomeDisciplina = matricula.disciplina_codigo;
        let aulasMinistradas = null;
        for (const disciplina of disciplinas) {
            if (disciplina.codigo === matricula.disciplina_codigo) {
                nomeDisciplina = disciplina.nome;
                aulasMinistradas = disciplina.aulas_ministradas;
            }
        }

        let presente = null;
        for (const frequencia of frequencias) {
            if (frequencia.estudante_id === matricula.estudante_id &&
                frequencia.disciplina_codigo === matricula.disciplina_codigo) {
                presente = frequencia.presente;
            }
        }

        const listaNotas = [];
        let avaliacoesLancadas = 0;
        for (const nota of notas) {
            if (nota.estudante_id === matricula.estudante_id &&
                nota.disciplina_codigo === matricula.disciplina_codigo) {
                listaNotas.push(nota.nota10);
                if (verificaNumero(nota.nota10)) {
                    avaliacoesLancadas += 1;
                }
            }
        }

        const media = mediaNotas(listaNotas);
        const percentual = percentualFrequencia(presente, aulasMinistradas);
        const situacao = situacaoAcademica(media, percentual, cfg);

        resultado.push({
            matriculaId: matricula.id,
            semestre: matricula.semestre,
            estudanteId: matricula.estudante_id,
            estudante: nomeEstudante,
            disciplinaCodigo: matricula.disciplina_codigo,
            disciplina: nomeDisciplina,
            media: media,
            frequencia: percentual,
            situacao: situacao,
            avaliacoesLancadas: avaliacoesLancadas,
        });
    }

    return resultado;
}

export function relatorioPorDisciplina(registros) {

    const codigos = [];
    for (const registro of registros) {
        if (!codigos.includes(registro.disciplinaCodigo)) {
            codigos.push(registro.disciplinaCodigo);
        }
    }

    const relatorio = [];

    for (const codigo of codigos) {
        let nomeDisciplina = "";
        let totalAlunos = 0;
        let aprovados = 0;
        let reprovadosPorMedia = 0;
        let reprovadosPorFalta = 0;
        let incompletos = 0;
        const medias = [];
        const frequencias = [];
        const reprovados = [];

        for (const registro of registros) {
            if (registro.disciplinaCodigo !== codigo) {
                continue;
            }

            nomeDisciplina = registro.disciplina;
            totalAlunos += 1;

            if (verificaNumero(registro.media)) {
                medias.push(registro.media);
            }

            if (verificaNumero(registro.frequencia)) {
                frequencias.push(registro.frequencia);
            }

            if (registro.situacao === "APROVADO") {
                aprovados += 1;
            } else if (registro.situacao === "INCOMPLETO") {
                incompletos += 1;
            } else if (registro.situacao === "REPROVADO_MEDIA") {
                reprovadosPorMedia += 1;
            } else if (registro.situacao === "REPROVADO_FALTA") {
                reprovadosPorFalta += 1;
            }

            if (registro.situacao === "REPROVADO_MEDIA" || registro.situacao === "REPROVADO_FALTA") {
                reprovados.push({
                    estudante: registro.estudante,
                    media: registro.media,
                    frequencia: registro.frequencia,
                    motivo: registro.situacao,
                });
            }
        }

        let maiorMedia = null;
        let menorMedia = null;
        for (const media of medias) {
            if (maiorMedia === null || media > maiorMedia) {
                maiorMedia = media;
            }
            if (menorMedia === null || media < menorMedia) {
                menorMedia = media;
            }
        }

        relatorio.push({
            disciplinaCodigo: codigo,
            disciplina: nomeDisciplina,
            totalAlunos: totalAlunos,
            mediaTurma: mediaNotas(medias),
            maiorMedia: maiorMedia,
            menorMedia: menorMedia,
            frequenciaMedia: mediaNotas(frequencias),
            aprovados: aprovados,
            reprovadosPorMedia: reprovadosPorMedia,
            reprovadosPorFalta: reprovadosPorFalta,
            incompletos: incompletos,
            semNota: totalAlunos - medias.length,
            reprovados: reprovados,
        });
    }

    return relatorio;
}


export function mediaGeralPorEstudante(registros) {

    const ids = [];
    for (const registro of registros) {
        if (!ids.includes(registro.estudanteId)) {
            ids.push(registro.estudanteId);
        }
    }

    const resultado = [];

    for (const id of ids) {
        let nome = "";
        const medias = [];

        for (const registro of registros) {
            if (registro.estudanteId !== id) {
                continue;
            }

            nome = registro.estudante;

            if (verificaNumero(registro.media)) {
                medias.push(registro.media);
            }
        }

        resultado.push({
            estudanteId: id,
            estudante: nome,
            mediaGeral: mediaNotas(medias),
        });
    }

    return resultado;
}
