import { useState, useEffect } from "react";
import FuncionarioContext from "./FuncionarioContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Funcionario() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo : "", cpf : "",
                nome : "", rg: "",empresa: ""});
    const [listaEmpresas, setListaEmpresas] = useState([]);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionario/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log('Erro: ' + err))
    }      
    
    const acaoCadastrar = async e => {
        e.preventDefault();
    
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionario`,
            {
                method : metodo,
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(objeto)
            })
            .then(response => response.json())
            .then(json => {
                setAlerta({status : json.status, message : json.message});
                setObjeto(json.objeto);
                if (!editar){
                    setEditar(true);
                }
            })
        } catch(err) {
            console.log(err.message);
        }
        recuperaFuncionarios();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaFuncionarios = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionario`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }    
 
    const recuperaEmpresas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/empresa`)
            .then(response => response.json())
            .then(data => setListaEmpresas(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        console.log(objeto)
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionario/${objeto}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json =>
                        setAlerta({ status: json.status, message: json.message }))
                        recuperaFuncionarios();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaFuncionarios();
        recuperaEmpresas();
    }, []);

    return (
        <FuncionarioContext.Provider value={ 
            {
                alerta, setAlerta, 
                listaObjetos, setListaObjetos,
                recuperaEmpresas,
                remover,
                objeto, setObjeto, 
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange, listaEmpresas
            }
        }>
            <Tabela/>
            <Form/>
        </FuncionarioContext.Provider>
    )


}

export default Funcionario;