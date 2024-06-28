import { Link } from 'react-router-dom';

export default function Container(props){
       
    return(
        <div className="Container">
            <div className="ContainterImg">
                <img src={props.imagem} alt="" />  
            </div>
            <div className="TextComponet">
                <div className="ContainerName">
                    <h1>{props.modelo}</h1>
                    <p>R$: {props.valor}</p>
                </div>
                <div className="ContainerButton">
                    <Link to={"/detalhes/" + props.id} >
                        <button>Ver mais </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}