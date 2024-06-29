import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import modeloService from '../../services/modeloService';
import Corpo from './Corpo';

export default function DetalheProduto(props){
    const [modelo, setModelo] = useState([]);

    const idModelo = useParams().modeloId;

    useEffect(()=>{
        getModelo(idModelo);
        console.log(idModelo)
    },[])

    const getModelo =  async (idModelo) => {
        const data = await modeloService.getModelo(idModelo);
        //console.log(data.docs);
        setModelo(data.data())
    };
    console.log(modelo)
    return(
        <div className="DetalheProduto">
            <div className="DetalheOps">
                <div className="OpsImg">
                    <div>
                        <img src={modelo.imagem} alt="">{props.id}</img>
                    </div>
                </div>
                <div className='nomeValor'>
                    <h2>{modelo.modelo}</h2>
                    
                    <p>R$: {modelo.valor}</p>
                </div>
            </div>
        </div>
    )
}