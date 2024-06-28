import Corpo from "./Corpo";
import './admin.css';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase.js";
import { useNavigate , redirect  } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Admin(){
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(false)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              console.log('Usuario Logado')
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
            {loginStatus ? <Corpo/> : null}
        </div>
    )
}