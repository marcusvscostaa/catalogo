/* eslint-disable jsx-a11y/anchor-is-valid */
import "./login.css"
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase"
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const rotaId = useParams().rotaId;
    const navigate = useNavigate();
    
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!email) return alert('Digite um email')
        if(!password) return alert('Digite uma senha')
            signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate(`/${rotaId}`)
        alert('Logado com sucesso')
        // ...
         })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Login ou Senha Errado Tente Novamente')
        });
        
    }
   
    return(
    <div className="divAll">
        
    <div className="CorpoLg">
        <h1>Login</h1>
        <div id="area">
            <div className="formDiv"> 
                <form>
                    <div className="modeloDivLg">
                    <label>
                        <p>Email:</p>
                        <input 
                                type="text" 
                                name="name" 
                                placeholder="Exemple@exemple.com"
                                onChange={(e) => setEmail(e.target.value)}
                                />
                    </label>
                    <label>
                        <p>Senha:</p>
                        <input  type={mostrarSenha?"text":"password" }
                                name="name" 
                                value={password}
                                placeholder="senha..."
                                onChange={(e) => setPassword(e.target.value)}                                
                                />
                        
                    </label>
                        <div  id="MostraSenha">
                            <a onClick={(e) => { e.preventDefault()
                                mostrarSenha ? setMostrarSenha(false)
                                : setMostrarSenha(true)
                            }
                                } href="" >{mostrarSenha ? "Esconder Senha" :' Mostrar Senha'}</a>
                        </div>
                    </div>
                    <div className="formButtonLg">
                        <input onClick={handleSubmit} type="submit" value="Entrar" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
    )
}