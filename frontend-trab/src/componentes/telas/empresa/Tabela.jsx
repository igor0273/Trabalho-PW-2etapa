import { useContext } from 'react'
import Alerta from '../../Alerta';
import EmpresaContext from './EmpresaContext';

function Tabela() {

    const btnStyle = {
        margin: '5px'
    };

    const { setObjeto, alerta, setAlerta, listaObjetos, remover, setEditar, recuperar } = useContext(EmpresaContext);
    return (

        <div style={{ padding: '20px' }}>
            <h1>Empresas</h1>

            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({ codigo: 0, cnpj: "", nome: "", razaosocial: "", sigla: "" })
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-pencil-square"></i>
            </button>

            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhuma empresa encontrada</h1>}

            {listaObjetos.length > 0 && (
                <table className="table">

                    <thead>

                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">CNPJ</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Razão Social</th>
                            <th scope="col">Sigla</th>
                        </tr>

                    </thead>

                    <tbody>

                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>

                                <td align="center">

                                    <button className="btn btn-info marginRight-10" style={btnStyle} data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.codigo);
                                            setEditar(true);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>

                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>

                                </td>

                                <td>{objeto.codigo}</td>

                                <td>{objeto.cnpj}</td>

                                <td>{objeto.nome}</td>

                                <td>{objeto.razaosocial}</td>

                                <td>{objeto.sigla}</td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;