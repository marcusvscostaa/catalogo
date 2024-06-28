import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getDownloadURL, ref, uploadBytesResumable, deleteObject} from 'firebase/storage'
import modeloService from '../../services/modeloService';
import {storage} from '../../firebase';

export default function Formulario(){
    const [modeloData, setModeloData] = useState([]);
    const [modeloVar, setModeloVar] = useState('');
    const [imgURL, setImgURL] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
    const [imagemPrev, setImagemPrev] = useState(null)
    const [dataOld, setDataOld] = useState([]);

    const [imagemName, setImagemName] = useState('');
    const [valorVar, setValorVar] = useState('');
    const idModelo = useParams().modeloId;

    useEffect(()=>{
        getModelo(idModelo);
        console.log(idModelo);
        /*  */
    },[])

    const deleteImagem = () =>{
        const IURL = dataOld.imagem;
        const clearURL = IURL.split("?alt=")[0];
        console.log(clearURL)
        fetch(clearURL).then( async function(response){
            const dados = await response.json();
            setImagemName(dados.name);
            const refStorageDelete = ref(storage, dados.name);
            deleteObject(refStorageDelete);
        })
        }

    const getModelo =  async (idModelo) => {
        const data = await modeloService.getModelo(idModelo);
        console.log(data.data());
        setModeloData(data.data())
        if(dataOld.length === 0){
            setDataOld(data.data())
            console.log(dataOld)
        }else{
            console.log("Modelo Iamgem: " + dataOld)
        }
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();
        const image = imagemPrev;
        console.log(image)
        console.log("file")
        
        if(image !== null){
            const refStorage = ref(storage, `imagens/${image.name}`);
            const uploadTask = uploadBytesResumable(refStorage, image);

            uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPorgessPorcent(progress);
            },
            (erro) =>{
                alert(erro)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImgURL(downloadUrl)
                    salvarDado(downloadUrl)
                    deleteImagem();
                })
            }
            ) 
        }else{
            console.log("Imagem não atualizada");
            salvarDado(dataOld.imagem);
            console.log(dataOld.imagem)
        }
    }

    const salvarDado = (imagemURL)=>{
        const imagem = imagemURL;
        console.log(imagem)
        let modelo = '';
        let valor = '';
        if(modeloVar ===''){
            modelo = dataOld.modelo;
            console.log("Modelo não atualizado" + modelo)
        }else{
            modelo = modeloVar;
        };
        if(valorVar ===''){
            valor = dataOld.valor;
            console.log("Valor não atualizado")
        }else{
            valor = valorVar;
        };
        try{ 
            if(imagem !== '' || imagem !== null){
                const newModelo = {
                    imagem,
                    modelo,
                    valor
                }
            console.log(newModelo);
            modeloService.updateModelo(idModelo, newModelo)
            setModeloVar('')
            setValorVar('')
            console.log("a variavel não esta vazia");
            }
        }catch{

            
        }
    }
    return(
    <div id="areaEDT">
        <div className="formDivEDT">
            <form onSubmit={handleSubmit}>
                <div className="modeloDivEDT">
                <label>
                    <p>Modelo:</p>
                    <input  type="text" 
                            defaultValue={modeloData.modelo} 
                            name="name" 
                            placeholder="Nome..."
                            onChange={(e) => setModeloVar(e.target.value)}
                            />
                </label>
                <label>
                    <p>Valor:</p>
                    <input  type="text" 
                            defaultValue={modeloData.valor} 
                            name="name" 
                            placeholder="Nome..." 
                            onChange={(e) => setValorVar(e.target.value)}
                            />
                </label>
                </div>
                <div className="formImgEDT">
                    <div>
                        { imagemPrev ? <img src={URL.createObjectURL(imagemPrev)} alt=''/>
                            : <img src={dataOld.imagem} alt=''/>
                        }   
                    </div>
                    <div className='BotaoImg'>
                        <label class="inputFileEDT">
                        Enviar Imagem
                            <input type="file" name="imagem" onChange={(e) => 
                                {setImagemPrev(e.target.files[0])}}/>
                        </label>
                    </div>                   
                </div>
                <div className="formButtonEDT">
                    <input onClick={handleSubmit} type="submit" value="Atualizar" />
                </div>
            </form>
        </div>
    </div>
    )
}