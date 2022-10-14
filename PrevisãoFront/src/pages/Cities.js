import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cities() {

    const [tempo, setTempo] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/cities").then(res => setTempo(res.data));
    }, []);

    return(
    <main>
        <div className="App">
            <Link class="link" to="/">VOLTAR</Link>
                {tempo && tempo.map((time, index) => {
                    return (
                        <div key={index}>
                            <div class="dias">
                                <div>
                                    <h1>{time.nameCity}</h1>
                                    <h2>Sensação térmica: {(time.feels_like.$numberDecimal - 273.15).toFixed(2)}°</h2>
                                    <p><span class="til">Consulta feita em:</span> {new Date(time.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p><span class="til">Temperatura Máxima:</span><br /> {Math.floor(time.temperature_max.$numberDecimal - 273.15)}°</p>
                                    <p><span class="til">Temperatura Mínima:</span><br /> {Math.floor(time.temperature_min.$numberDecimal - 273.15)}°</p>
                                    <p><span class="til">Pressão:</span><br /> {time.pressure.$numberDecimal}Pa</p>
                                    <p><span class="til">Umidade:</span><br /> {time.humidity}%</p>
                                    <p><span class="til">Velocidade do vento:</span><br /> {Math.floor(time.windSpeed.$numberDecimal * 1.60934)}km/h</p>
                                    <p><span class="til">Precipitação:</span><br /> {Math.floor(time.pop * 100)}%</p>
                                </div>
                            </div>
                            <br />
                        </div>
                    );
                })
            }
        </div>
    </main>
);
};