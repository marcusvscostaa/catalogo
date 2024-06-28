import Container from "./Container";
import ModeloService from '../../services/modeloService';

// src/components/YourComponent.js
import React, { useState, useEffect } from 'react';

export default function Corpo(){

    const [modelos, setModelos] = useState([]);

    useEffect(()=>{
        getModelos();
    },[])

    const getModelos =  async () => {
        const data = await ModeloService.getAllModelos();
        //console.log(data.docs);
        setModelos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };
    //console.log(data)

    return(
        < >
            <div className="Corpo">
                {
                    modelos.map((doc, index) => {
                        return(<Container imagem={doc.imagem} modelo={doc.modelo} valor={doc.valor} id={doc.id} />)
                    })
                }
            </div> 
        </>
    )
}