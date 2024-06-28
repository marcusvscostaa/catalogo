import React from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import Corpo from './Corpo';
import './home.css'

export default function Home(){
    return(
        <div className="App">
            <Cabecalho/>
            <Corpo/>
       </div>
    )
}