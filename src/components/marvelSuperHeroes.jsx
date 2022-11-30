import Row from 'react-bootstrap/Row';
const { useEffect, useState } = require("react");

function MarvelSuperHeroes (){
    const [superheros, setSuperHeros] = useState([]);
    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("Superheros") === null) {
                setSuperHeros("Loading...")
            } else {
                setSuperHeros(localStorage.getItem("Superheros"));
            }
        } else{
        fetch("https://gateway.marvel.com:443/v1/public/characters?apikey=4bf47ce7ef0d15bb3f4139be2a12dd2c&ts=hola&hash=c4e51dc55b7086f79547ec5133d8055e",{
            method: "GET",
              Headers: {
                "Content-Type": "application/json"
              }
        })
        .then(data => data.json()).then(data => {
            setSuperHeros(data.data.results);
        })
     }
    }, []);
    const coleccion=()=>{
        return(
            <Row>
            {superheros.map(superheroe => (
            <><p key={superheroe.id}>{superheroe.name}</p><p key={superheroe.id}>{superheroe.description}</p></>
            ))}  
            </Row>)
       }
        return(
            <div>
                <h1>superheroes</h1>
            <Row>
                {coleccion()}
            </Row>
        </div>
    )
}
export default MarvelSuperHeroes;