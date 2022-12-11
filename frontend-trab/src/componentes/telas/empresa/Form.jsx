import { useContext } from 'react'
import Alerta from '../../Alerta';
import EmpresaContext from './EmpresaContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta }
        = useContext(EmpresaContext);

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
                        <h5 className="modal-title" id="exampleModalLabel">Prédio</h5>
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
                                <label htmlFor="txtCnpj" className="form-label">
                                    CNPJ
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtCnpj"
                                    name="cnpj"
                                    value={objeto.cnpj}
                                    onChange={handleChange}
                                    maxLength="14"
                                    minLength={14}
                                    required
                                />
                                <div className="valid-feedback">
                                    CNPJ OK!
                                </div>
                                <div className="invalid-feedback">
                                    Verifique se o Cnpj foi Informado ou se possui 14 digitos
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
                                    Nome deve ser informada
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtRazaoSocial" className="form-label">
                                    Razão Social
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtRazaoSocial"
                                    name="razaosocial"
                                    value={objeto.razaosocial}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Razão Social OK!
                                </div>
                                <div className="invalid-feedback">
                                    Razão Social deve ser informada
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtSigla" className="form-label">
                                    Sigla
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtSigla"
                                    name="sigla"
                                    value={objeto.sigla}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" data-bs-dismiss="modal" >
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