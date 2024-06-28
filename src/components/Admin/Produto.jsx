import {useState} from 'react';
import { Link } from 'react-router-dom';
import {getDownloadURL, ref, uploadBytesResumable, deleteObject} from 'firebase/storage'
import {storage} from '../../firebase';
import modeloService from '../../services/modeloService';

export default function Produto(props){
    const [imgURL, setImgURL] = useState("");

    const deleteHandler = async (e) => {
        const refStorage = ref(storage, imgURL);
        modeloService.deleteModelo(props.id);
        deleteObject(refStorage);
        props.func();
    }
    const fetchURL = ()=>{
        const IURL = props.imagem;
        const clearURL = IURL.split("?alt=")[0];
        console.log(clearURL)
        fetch(clearURL).then( async function(response){
            const dados = await response.json();
            setImgURL(dados.name);
        })
    }
    fetchURL();
    console.log(imgURL);

    return(
        <div className="Produto">
            <div className="ProdutoImg">
                <img src={props.imagem} alt=''/>  
            </div>
            <div className="ProdutoName">
                <h4>Modelo</h4>
                <p>{props.modelo}</p>
            </div>
            <div className="ProdutoDesc">
                <h4>Valor</h4>
                <p>{props.valor}</p>
            </div>
            <div className="ProdutoButton">
                <Link to={"/editar/"+props.id}><button id="editar">EDITAR </button></Link>
                <button onClick={deleteHandler} id="deletar">DELETAR</button>
            </div>
        </div>
    )
}