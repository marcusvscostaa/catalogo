import DetalheProduto from "./DetalheProduto";

export default function Corpo(props){
    return(
        <div>
            <h1>{props.name}</h1>
            <div className="CorpoDet">                
                <DetalheProduto/>
            </div>
        </div>
    )
}