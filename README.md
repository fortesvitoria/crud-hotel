# 🏨 Sistema de Gestão de Hotel
> Projeto Prático desenvolvido para a disciplina de **Desenvolvimento de Serviços e APIs**.

---

## 📋 Sobre o Projeto

O Sistema de Gestão para Hotel é uma API desenvolvida para auxiliar a administração de hotéis no controle de reservas, hospedagens e consumo de produtos pelos hóspedes durante a estadia.

O projeto foi desenvolvido com o objetivo de aplicar conceitos de desenvolvimento de APIs REST, banco de dados, autenticação de usuários e regras de negócio.

### ⚠️ O Problema

Atualmente, o hotel parceiro realiza o controle de reservas e estadias de forma manual, utilizando anotações em papel.

Esse processo apresenta diversos problemas:

* Dificuldade na organização das informações;
* Maior possibilidade de erros operacionais;
* Risco de overbooking (duas reservas para o mesmo quarto no mesmo período);
* Falhas no controle de consumo de produtos pelos hóspedes;
* Dificuldade na geração de relatórios e acompanhamento das hospedagens.

### 🎯 Objetivos
Desenvolver uma API para gestão hoteleira que permita:

1. Gerenciar reservas de quartos;
2. Controlar check-in e check-out dos hóspedes;
3. Administrar informações de clientes;
4. Controlar o consumo de produtos durante a hospedagem;
5. Gerenciar produtos e categorias;
6. Gerar relatórios de hospedagem e consumo;
7. Garantir autenticação e segurança dos usuários do sistema.

---

## 🛠️ Funcionalidades do Sistema e Arquitetura do Escopo

A API está estruturada em módulos de CRUD (*Create, Read, Update, Delete*) e Regras de Negócio (RN) complexas, divididas estrategicamente entre a equipe para cobrir os seguintes requisitos:

### 🛏️ 1. Gerenciamento de Quartos e Categorias
* **1.1 CRUD Tipo de Quarto:** 

* Nome do tipo (Simples, Duplo, Suíte);
* Capacidade máxima de hóspedes.

#### Endpoints

* Criar Tipo de Quarto
* Listar Tipos de Quarto
* Buscar Tipo de Quarto
* Atualizar Tipo de Quarto
* Remover Tipo de Quarto

* **1.2 CRUD de Quartos:** 

* Número do quarto;
* Tipo do quarto;
* Valor da diária por pessoa;
* Status:

  * Disponível
  * Reservado
  * Ocupado

#### Endpoints

* Criar Quarto
* Listar Quartos
* Buscar Quarto
* Atualizar Quarto
* Remover Quarto

### 👤 2. Gestão de Clientes
* **CRUD de Clientes:** 

* Nome completo;
* CPF;
* Telefone;
* E-mail.

#### Endpoints

* Criar Cliente
* Listar Clientes
* Buscar Cliente
* Atualizar Cliente
* Remover Cliente

### 📦 3. Gestão de Categorias de Produtos
* **3.1 CRUD de Categoria de Produtos:** 

* Nome;
* Descrição.

#### Endpoints

* Criar Categoria
* Listar Categorias
* Buscar Categoria
* Atualizar Categoria
* Remover Categoria


* **3.2 CRUD de Produtos:** 

* Nome;
* Categoria;
* Preço unitário.

#### Endpoints

* Criar Produto
* Listar Produtos
* Buscar Produto
* Atualizar Produto
* Remover Produto

---

### Fluxo Operacional e Regras de Negócio (RN)

#### 📅 1. Reserva de Quartos

Permite registrar:

* Data e hora da reserva;
* Cliente;
* Quarto;
* Quantidade de hóspedes;
* Data de entrada;
* Data de saída.

* 🛡️ **RN1 – Controle de disponibilidade:** 
Não é permitido reservar um quarto que já possua reserva ativa para o mesmo período (Prevenção de Overbooking).

* 🛡️ **RN2 – Capacidade do quarto:** 
O sistema impede estritamente que a quantidade de pessoas na reserva exceda a capacidade máxima configurada para o tipo daquele quarto.

#### 🔑 2. Hospedagem (Check-in & Check-out)

* **Check-in** 
Permite registrar:

* Data e hora do check-in;
* Cliente;
* Quarto;
* Valor da diária.

* **Check-out** 
Permite registrar:

* Data e hora da saída.

    * ⚙️ **RN - Faturamento:** 
    O sistema deve calcular automaticamente o valor total da hospedagem utilizando:

    Valor Total = Valor da Diária × Quantidade de Dias

#### 🍫 3. Consumo de Produtos

Permite registrar:

* Número da estadia;
* Número do quarto;
* Produtos consumidos;
* Quantidade consumida de cada produto.

    * ⚙️ **RN3 - Cálculo automático do consumo:** 
    O valor total do consumo deve ser calculado automaticamente através da soma:

    Valor Total = Σ (Preço do Produto × Quantidade Consumida)

---

## 📊 Relatórios 

### Relatório de Estadias por Cliente

Permite consultar:

* Todas as hospedagens de um cliente;
* Filtro por cliente;
* Filtro por mês;
* Filtro por ano.

A consulta deve considerar a data de entrada da hospedagem.

### Relatório de Consumo por Estadia

Permite consultar:

* Todos os produtos consumidos em uma estadia;
* Quantidade consumida;
* Valor total consumido.

---

## 🔐 Autenticação de Usuários

O sistema possui cadastro e autenticação para usuários do hotel.

Dados cadastrados:

* Nome completo;
* E-mail;
* Senha.

Funcionalidades:

* Cadastro de usuário;
* Login;
* Controle de acesso aos endpoints protegidos.

---

## 🚀 Tecnologias Sugeridas para o Projeto
* **Ambiente de Execução:** [Node.js](https://nodejs.org/)
* **Framework Web:** [Express](https://expressjs.com/pt-br/)
* **Linguagem:** JavaScript (ES6+)
* **Banco de Dados:** * PostgreSQL.
* **Autenticação:** JWT (JSON Web Tokens).
* **Documentação da API:** Swagger.

---

## 👥 Desenvolvedores
* **Julia Saraiva**
* **Vitoria Fortes**
* **Yago Ramos**

---

*Este projeto faz parte da avaliação da disciplina de Desenvolvimento de Serviços e APIs - 2026.*