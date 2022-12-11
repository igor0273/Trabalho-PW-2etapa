import { useContext } from 'react'
import Alerta from '../../Alerta';
import FuncionarioContext from './FuncionarioContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaEmpresas }
        = useContext(FuncionarioContext);

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (

        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Funcionarios</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodigo" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodigo"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtCpf" className="form-label">
                                    CPF
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtCpf"
                                    name="cpf"
                                    maxLength="11"
                                    minLength="11"
                                    value={objeto.cpf}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    CPF Ok
                                </div>
                                <div className="invalid-feedback">
                                Cpf não foi informado ou não possui 11 digitos
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Nome OK!
                                </div>
                                <div className="invalid-feedback">
                                    Nome deve ser informado
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtRg" className="form-label">
                                    RG
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtRg"
                                    name="rg"
                                    value={objeto.rg}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    RG OK!
                                </div>
                                <div className="invalid-feedback">
                                  Rg não foi informado ou não possui 8 digitos
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectEmpresa" className="form-label">
                                    Empresa
                                </label>
                                <select
                                    required
                                    className="form-control"
                                    id="selectEmpresa"
                                    value={objeto.empresa}
                                    name="empresa"
                                    onChange={handleChange}>
                                    <option disable="true" value="">(Selecione o Empresa)</option>
                                    {listaEmpresas.map((empresa) => (
                                        <option key={empresa.codigo} value={empresa.codigo}>
                                            {empresa.nome}
                                        </option>
                                    ))}
                                </select>
                            
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;