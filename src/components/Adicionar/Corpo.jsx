import Formulario from "./Formulario";
import { Link } from 'react-router-dom';

export default function Corpo() {
    return (
        <>
            <div className="divTopEDT">
                <div className="divTituloEDT">
                    <h1>Editar Modelos</h1>
                </div>
                <div className="divSairEDT">
                    <Link to="/admin"><button id="sairEDT">Voltar</button></Link>
                </div>
            </div>
            <div className="CorpoADD">
                <Formulario />
            </div>
        </>
    )
}