const { pool } = require('../config');
const { request, response } = require('express');

const getEmpresa = (request, response) => {
    pool.query('SELECT * from empresa order by codigo desc',
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
    const { cnpj, nome, razaosocial, sigla } = request.body;

    pool.query('insert into empresa (cnpj, nome, razaosocial,sigla) values ($1,$2,$3,$4) returning codigo, cnpj, nome, razaosocial,sigla',
        [cnpj, nome, razaosocial, sigla],
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
    const {codigo, nome, razaosocial, cnpj ,sigla} = request.body;
    pool.query(`UPDATE empresa SET  nome=$1, razaosocial=$2, cnpj=$3, sigla=$4
	            WHERE codigo=$5 returning codigo, nome, razaosocial, cnpj,sigla`, 
                [nome, razaosocial, cnpj,sigla ,codigo] , 
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
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM empresa WHERE codigo=$1`, 
                [codigo] , 
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
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM empresa WHERE codigo=$1`, 
                [codigo] , 
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