import 'bootstrap/dist/css/bootstrap.min.css'

import '@popperjs/core/dist/cjs/popper.js'

import 'bootstrap/dist/js/bootstrap.min.js'

import 'bootstrap-icons/font/bootstrap-icons.css' 

import Menu from './componentes/Menu'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import React from 'react';
import Empresa from './componentes/telas/empresa/Empresa'
import Funcionario from './componentes/telas/funcionario/Funcionario'

function App() {

  return (
    <Router>
        <Menu/>

        <Routes>

          <Route exact path="/" element={<Home/>}/>
          <Route exact path='/empresa' element={<Empresa/>}/>
          <Route exact path='/funcionario' element={<Funcionario/>}/>
        </Routes>
    </Router>
  );
}

export default App;