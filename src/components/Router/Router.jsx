import { useState } from "react";
import React from 'react';

import {
    createBrowserRouter, RouterProvider
  } from "react-router-dom";

import Home from "../Home/Home.jsx";
import Admin from "../Admin/Admin.jsx";
import Detalhes from "../Detalhes/Detalhes.jsx";
import Editar from "../Editar/Editar.jsx";
import Adicionar from "../Adicionar/Adicionar.jsx";
import Login from "../Login/Login.jsx";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase.js";

/* const checkLogin = async () =>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      alert('Usuario Logado' + user.uid)
      const uid = user.uid;
      return true;
      // ...
    } else {
      alert('Usuario não esta logado')
      return false;
      // User is signed out
      // ...
    }
  });
}
 */

const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>
    },
    {
        path: "/admin",
        element: <Admin/>
    },
    {
        path: "/detalhes/:modeloId",
        element: <Detalhes />
    },
    {
        path: "/editar/:modeloId",
        element: <Editar/>
    },
    {
        path: "/adicionar",
        element: <Adicionar/>
    },
    {
        path: "/Login/:rotaId",
        element: <Login/>
    }
  ]);


function Routes(){
   return(
        <RouterProvider router={router} />
   )
}

export default Routes;