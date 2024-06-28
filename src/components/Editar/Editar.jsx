import Corpo from "./Corpo";
import "./editar.css"
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase';
import Login from "../Login/Login";
import { useNavigate , redirect  } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Adicionar(){
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(false)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              console.log('Usuario Logado')
              const uid = user.uid;
              setLoginStatus(true);
              // ...
            } else {
              //alert('Usuario não esta logado')
              navigate('/login/admin');
              // User is signed out
              // ...
            }
          });
    },[])
    return(
        <div>
            {loginStatus ?
            <>   
            <Corpo/>
            </>
            : null}
        </div>
    )
}