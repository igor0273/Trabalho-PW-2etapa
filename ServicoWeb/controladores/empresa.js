const { pool } = require('../config');
const { request, response } = require('express');

const getEmpresa = (request, response) => {
    pool.query('SELECT * from empresa order by id desc',
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: error,
                    message: 'Erro ao consultar a empresa: ' + error
                })
            }
            response.status(200).json(results.rows);
        })
}

const addEmpresa = (request, response) => {
    const { cnpj, nome, razaosocial } = request.body;

    pool.query('insert into empresa (cnpj, nome, razaosocial) values ($1,$2,$3) returning id, cnpj, nome, razaosocial',
        [cnpj, nome, razaosocial],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao inserir a empresa!'
                })
                
            }
            response.status(200).json({
                status : 'success' , message : "Empresa criada!",
                objeto : results.rows[0]
            });
        }
   )
}

const updateEmpresa = (request, response) => {
    const {id, nome, razaosocial, cnpj } = request.body;
    pool.query(`UPDATE predios SET  nome=$1, razaosocial=$2, cnpj=$3
	            WHERE id=$4 returning id, nome, razaosocial, cnpj`, 
                [nome, razaosocial, cnpj, id] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao alterar a empresa! ' + error
            });
        }
        response.status(200).json({
            status : 'success' , message : "Empresa alterada!",
            objeto : results.rows[0]
        });
    })
}

const deleteEmpresa = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`DELETE FROM empresa WHERE id=$1`, 
                [id] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover a Empresa! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Empresa removido!"
        });
    })
}

const getEmpresaPorCodigo = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM empresa WHERE id=$1`, 
                [id] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar a empresa'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = {getEmpresa, addEmpresa, updateEmpresa, deleteEmpresa, getEmpresaPorCodigo}