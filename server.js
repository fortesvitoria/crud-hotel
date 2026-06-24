/*Responsável único por escutar a porta de rede e ligar a API localmente.*/

const app = require('./app'); // Carrega a configuração do arquivo app.js da raiz
const PORT = 3000; // Define a porta padrão do servidor web local

// Liga o servidor para escutar requisições de rede na porta definida
app.listen(PORT, () => {
    console.log(`API do Hotel iniciada com sucesso. Escutando na porta: ${PORT}`);
});
