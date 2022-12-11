import { useState, useEffect } from 'react';
import EmpresaContext from './EmpresaContext';
import Tabela from './Tabela';
import Form from './Form';

function Empresa() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({

        codigo: "", cnpj: "", nome: "", razaosocial: "" ,sigla : ""

    })

    const recuperar = async codigo => {    
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/empresa/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log(err))
    }

    /**
     * Realiza a ação de cadastrar ou atualizar
     * um registro de empresa
     * @param e 
     */
    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/empresa`, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objeto),
            }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                });
        } catch (err) {
            console.error(err.message);
        }       
        recuperaEmpresas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }     

    /**
     * Recupera as empresas para ser exibidas 
     * na tabela de empresas
     */
    const recuperaEmpresas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/empresa`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    /**
     * Consome o serviço para remover 
     * um registro da empresa
     * @param {*} objeto 
     */
    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/empresa/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaEmpresas();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaEmpresas();
    }, []);

    return (
        <EmpresaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,               
                recuperaEmpresas,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange
            }
        }>
            <Tabela />
            <Form />
        </EmpresaContext.Provider>
    );
}

export default Empresa;