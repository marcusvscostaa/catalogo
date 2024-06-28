import {useState} from 'react';
import {storage} from '../../firebase';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import ModeloService from '../../services/modeloService';
import modeloService from '../../services/modeloService';

export default function Formulario(){
    const [imgURL, setImgURL] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
    const [image, setImage] = useState(null)

    const [imagem, setImagem] = useState('');
    const [modelo, setModelo] = useState('');
    const [valor, setValor] = useState('');
        
        const handleSubmit = async (event)=>{
          event.preventDefault();
          console.log("file")
          if(!image) return alert("Adicione uma imagem");
          if(!modelo) return alert("Adicione uma Modelo");
          if(!valor) return alert("Adicione uma Valor");

          const refStorage = ref(storage, `imagens/${image.name}`)
          const uploadTask = uploadBytesResumable(refStorage, image)

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
                })
            }
          )
         
         
        }

        const salvarDado = (imagem)=>{
            try{ 
                if(imagem !== '' || imagem !== null){
                    const newModelo = {
                        imagem,
                        modelo,
                        valor
                    }
                console.log(newModelo);
                modeloService.addModelo(newModelo)
                setImage('')
                setModelo('')
                setValor('')
                console.log("a variavel não esta vazia");
                alert("Enviado com Sucesso!")
                }
            }catch{

                
            }
        }
    return(
    <div id="area">
        <div className="formDiv">
            <form>
                <div className="modeloDiv">
                <label>
                    <p>Modelo:</p>
                    <input 
                            type="text" 
                            name="name" 
                            placeholder="Nome..."
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            />
                </label>
                <label>
                    <p>Valor:</p>
                    <input  type="text" 
                            value={valor}
                            name="name" 
                            placeholder="Valor..." 
                            onChange={(e) => setValor(e.target.value)}
                            />
                </label>
                </div>
                <div className="formImg"> 
                    <div>
                        { image ? <img src={URL.createObjectURL(image)} alt=''/>
                            : <img src="https://st.depositphotos.com/3538103/5151/i/450/depositphotos_51514387-stock-photo-photograph-icon.jpg" alt=''/>
                        }
                    </div>
                    <div className='BotaoImg'>
                        <label class="inputFile">
                            Enviar Imagem
                            <input type="file" name="imagem" accept="image/*" onChange={(e) => 
                            { setImage(e.target.files[0])}}/> 
                        </label>
                    </div>             
                </div>
                {/*image ? <progress value={progressPorcent}/> : <p></p>*/} 
                <div className="formButton">
                    <input onClick={handleSubmit} type="submit" value="Enviar" />
                </div>
            </form>
        </div>
    </div>
    )
}