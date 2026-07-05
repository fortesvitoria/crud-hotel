/* Este arquivo centraliza os controllers de relatórios, aplicando validações 
de dados de entrada e de regras de negócio antes de acionar o banco. */

const relatorioService = require('../service/relatorio_service');

function handleError(res, err) {
    const status = err?.status || 500;
    return res.status(status).json({
        error: err?.message || 'Erro interno'
    });
}

// relatório 1

// Substitua apenas a função 'listarEstadiasPorCliente' no seu controller por esta:
async function listarEstadiasPorCliente(req, res) {
    try {
        const cpf = req.query.cpf;
        
        let mes = undefined;
        if (req.query.mes) {
            mes = Number(req.query.mes);
            if (isNaN(mes) || mes < 1 || mes > 12) {
                return res.status(400).json({
                    error: "O parâmetro 'mes' deve ser un número inteiro entre 1 e 12."
                });
            }
        }

        let ano = undefined;
        if (req.query.ano) {
            ano = Number(req.query.ano);
            if (isNaN(ano) || ano < 1900) {
                return res.status(400).json({
                    error: "O parâmetro 'ano' deve ser um número de ano válido (ex: 2026)."
                });
            }
        }

        const resultado =
            await relatorioService.listarEstadiasPorCliente(cpf, mes, ano);

        // REGRA ADICIONADA: Se a busca não encontrar nada, avisa o usuário com uma mensagem clara
        if (resultado.length === 0) {
            return res.status(404).json({
                message: "Nenhuma estadia foi encontrada com os filtros informados."
            });
        }

        res.json(resultado);

    } catch (err) {
        handleError(res, err);
    }
}


// relatório 2
async function listarConsumoPorEstadia(req, res) {
    try {
        const idEstadia = Number(req.params.id);

        // 1. Validação de formato (Garante que é um número válido)
        if (isNaN(idEstadia) || idEstadia <= 0) {
            return res.status(400).json({
                error: "O ID da estadia fornecido na URL deve ser um número inteiro válido."
            });
        }

        // valida se a estadia informada existe no banco de dados
        const existe = await relatorioService.verificarEstadiaExiste(idEstadia);
        if (!existe) {
            return res.status(404).json({
                error: "A estadia informada não foi encontrada no sistema."
            });
        }

        //lista os consumos se a estadia existir de fato
        const resultado =
            await relatorioService.listarConsumoPorEstadia(idEstadia);

        res.json(resultado);

    } catch (err) {
        handleError(res, err);
    }
}

module.exports = {
    listarEstadiasPorCliente,
    listarConsumoPorEstadia
};
