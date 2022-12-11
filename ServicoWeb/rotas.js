const { Router }  = require('express');

const controleEmpresa = require("./controladores/empresa");
const controleFuncionario = require("./controladores/funcionario");

const rotas = new Router();

rotas.route('/empresa')
.get(controleEmpresa.getEmpresa)
.post(controleEmpresa.addEmpresa)
.put(controleEmpresa.updateEmpresa);

rotas.route('/funcionario')
.get(controleFuncionario.getFuncionario)
.post(controleFuncionario.addFuncionario)
.put(controleFuncionario.updateFuncionario)

rotas.route('/funcionario/:id')
.get(controleFuncionario.getFuncionarioPorCodigo)
.delete(controleFuncionario.deleteFuncionario)

rotas.route('/empresa/:codigo')
.get(controleEmpresa.getEmpresaPorCodigo)
.delete(controleEmpresa.deleteEmpresa)

module.exports = rotas