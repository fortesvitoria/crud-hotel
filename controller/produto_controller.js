/*Este arquivo intercepta requisições HTTP, extrai dados do body/params
e delega ao Service, retornando respostas JSON com tratamento de erros.*/

const hotelService = require('../service/cliente_service');

class HotelController {

    // CLIENTES

    // CREATE
    async createCliente(req, res) {
        try {
            const resultado = await hotelService.createCliente(req.body);
            res.status(201).json(resultado);

        } catch (e) {
            res.status(400).json({ erro: e.message });
        }
    }

    // READ
    async getClientes(req, res) {
        try {
            const resultado = await hotelService.getClientes();
            res.json(resultado);

        } catch (e) {
            res.status(500).json({ erro: "Erro ao buscar clientes." });
        }
    }

    // UPDATE
    async updateCliente(req, res) {
        try {
            const resultado = await hotelService.updateCliente(
                req.params.cpf,
                req.body
            );

            res.json(resultado);

        } catch (e) {
            res.status(400).json({ erro: e.message });
        }
    }

    // DELETE
    async deleteCliente(req, res) {
        try {
            const resultado = await hotelService.deleteCliente(req.params.cpf);
            res.json(resultado);

        } catch (e) {
            res.status(400).json({ erro: e.message });
        }
    }
}

module.exports = new HotelController();
