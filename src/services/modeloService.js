/* eslint-disable import/no-anonymous-default-export */
import {useNavigate, Link } from 'react-router-dom';
import {db} from '../firebase'
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  
const doc_refs = collection(db, 'produto');

class ModeloDataService{
    addModelo = (newModelo) => {
        return addDoc(doc_refs, newModelo);
    };
    
    updateModelo = (id, updateModelo) => {
        const ModeloDoc = doc(db, "produto", id);
        return updateDoc(ModeloDoc, updateModelo);
    };
    
    deleteModelo = (id) => {
        const ModeloDoc = doc(db, "produto", id);
        return deleteDoc(ModeloDoc);
    };
    
    getAllModelos = () =>{
        return getDocs(doc_refs)
    }

    getModelo = (id) => {
        const modeloDoc = doc(db, 'produto', id);
        return getDoc(modeloDoc);
    }
}

export default new ModeloDataService();