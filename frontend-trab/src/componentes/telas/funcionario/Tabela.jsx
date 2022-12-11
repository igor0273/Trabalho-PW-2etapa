import { useContext } from "react";
import FuncionarioContext from "./FuncionarioContext";
import Alerta from "../../Alerta";

function Tabela() {

    const btnStyle = {
        margin: '5px'
    };

    const { setObjeto, alerta, setAlerta, listaObjetos, remover,
        setEditar, recuperar } =
        useContext(FuncionarioContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Funcionarios</h1>
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({codigo:0 ,cpf: "", nome: "",
                     rg : "", empresa: 0 })
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-pencil-square"></i>
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum Funcionario encontrada</h1>}
            {listaObjetos.length > 0 &&

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">CPF</th>
                            <th scope="col">NOME</th>
                            <th scope="col">RG</th>
                            <th scope="col">EMPRESA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info" style={btnStyle}
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.codigo);
                                            setEditar(true);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto.codigo); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.cpf}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.rg}</td>
                                <td>{objeto.empresa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

        </div>
    )
}

export default Tabela;