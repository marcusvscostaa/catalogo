import Produto from "./Produto";
import { Link } from 'react-router-dom';
import ModeloService from '../../services/modeloService';
import { getAuth, signOut } from "firebase/auth";
import {auth} from "../../firebase.js";

// src/components/YourComponent.js
import React, { useState, useEffect } from 'react';


export default function Corpo(){
    const [modelos, setModelos] = useState([]);

    useEffect(()=>{
        getModelos();
    },[])

    const handerSair = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
 
    const getModelos =  async () => {
        const data = await ModeloService.getAllModelos();
        //console.log(data.docs);
        setModelos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };
    return(
        <div>
            <div className="divTop">
                <div className="divTitulo">
                    <h1>Painel de Produtos</h1>
                </div>
                <div className="divSair">
                    <button id="sair" onClick={handerSair}>SAIR</button>
                </div>    
            </div>
            <div className="CorpoAdm"> 
            {
                modelos.map((doc, index) => {
                    return(<Produto imagem={doc.imagem} modelo={doc.modelo} valor={doc.valor} id={doc.id} func={getModelos} />)
                })
            }           
        
            </div>
            <div className="divADD">
                <div>                
                    <Link to="/adicionar"><button id="buttonADD">Adicionar +</button></Link>
                </div>
            </div>
        </div>
    )
}