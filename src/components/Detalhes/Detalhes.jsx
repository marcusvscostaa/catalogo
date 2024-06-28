import { Link } from 'react-router-dom';
import Corpo from './Corpo';
import './Detalhes.css'

export default function Detalhes(){
    return(
        <div>
            <Link to="/">Inicio</Link>
            <Corpo />
        </div>      
    )
}