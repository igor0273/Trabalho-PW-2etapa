const { pool } = require('../config');
const { request, response } = require('express');

const getFuncionario = (request, response) => {
    pool.query('SELECT * from funcionario order by id desc',
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: error,
                    message: 'Erro ao consultar funcionario: ' + error
                })
            }
            response.status(200).json(results.rows);
        })
}

const addFuncionario = (request, response) => {
    const { cpf, nascimento, nome, rg,empresa } = request.body;

    pool.query('insert into funcionario (cpf, nascimento, nome,rg,empresa) values ($1,$2,$3,$4,$5) returning id, cpf, nascimento,nome,rg,empresa',
        [cpf, nascimento, nome, rg,empresa],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: error,
                    message: "Erro ao adicionar um funcionario " + error
                })
            }
            response.status(200).json(results.rows[0])
        })
}

const updateFuncionario = (request, response) => {
    const { id, nome, cpf, rg } = request.body;

    pool.query('UPDATE funcionario SET nome=$1, cpf=$2, rg=$3 where id = $4 returning id,nome,cpf,rg',
        [nome, cpf, rg, id],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: error,
                    message: 'Erro ao alterar o funcionario: ' + error
                })
            }
            response.status(200).json({
                status: 'success', message: "Funcionario alterado!",
                objeto: results.rows[0]
            });
        })
}

const deleteFuncionario = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM funcionario WHERE id = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao remover o funcionario:  ' + error
                })
            }

            response.status(200).json({
                status: 'success', message: 'Funcionario Removisa'
            });
        })
}


const getFuncionarioPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM funcionario WHERE id=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao recuperar o funcionario!'
                });
            }
            response.status(200).json(results.rows[0]);
        }
    )
}

module.exports = {getFuncionario,addFuncionario,updateFuncionario,deleteFuncionario,getFuncionarioPorCodigo}
