import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import LineChart from '../components/LineChart';

function Home() {
    const [name, setName] = useState("");
    const limit = 20;
    const [resultado, setResult] = useState([]);
    const [tempo, setTempo] = useState();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (tempo) {
            axios.post("http://localhost:8080/cities", {
                nameCity: tempo.city.name,
                weatherId: tempo.list[0].weather[0].id,
                temperature: tempo.list[0].main.temp,
                temperature_min: tempo.list[0].main.temp_min,
                temperature_max: tempo.list[0].main.temp_max,
                pressure: tempo.list[0].main.pressure,
                humidity: tempo.list[0].main.humidity,
                windSpeed: tempo.list[0].wind.speed,
                pop: tempo.list[0].pop,
                feels_like: tempo.list[0].main.feels_like
            });
        }
    }, [tempo]);

    const search = (e) => {
        e.preventDefault();

        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=${limit}&appid=cd167360712f9406b8262a06d1b7f628`).then(result => setResult(result.data));
    }

    const latlong = (lat, lng) => {
        setResult([]);
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=cd167360712f9406b8262a06d1b7f628`).then(tempo => {
            setTempo(tempo.data);

            setUserData({
                labels: tempo.data.list.map(day => getDate(day.dt_txt)),
                datasets: [
                    {
                        label: "Temperatura",
                        data: tempo.data.list.map(p => (p.main.feels_like - 273.15).toFixed(2)),
                        backgroundColor: "red"
                    }
                ]
            });
        });
    }

    const getDate = (date) => {
        let day = new Date(date);
        let dia = day.getDate();
        dia = dia.toString();
        let meses = day.getMonth() + 1;
        meses = meses.toString();
        let ano = day.getFullYear();
        ano = ano.toString();
        let horas = day.getHours();
        horas = horas.toString();
        let minutos = day.getMinutes();
        minutos = minutos.toString();
        let data = horas + ":" + minutos + " " + dia + "/" + meses + "/" + ano
        return data;
    }

    return (
        <div className="App">
            <main>
                <div>
                    <form onSubmit={search}>
                        <h1 class="title">INFORMAR A LOCALIZAÇÃO</h1>
                        <input type="text" onChange={e => setName(e.target.value)} value={name} />
                        <input type="submit" value="Buscar" />
                    </form>

        <Link class = "link" to="/cities"><h2>RESULTADOS ANTERIORES</h2></Link>

                    <div> {resultado.map((city, index) => {
                            return <div key={index} onClick={() => latlong(city.lat, city.lon)} data-lat={city.lat} data-lng={city.lon}>
                                <button className="option">{city.name} - {city.state}</button>
                            </div>;
                        })}
                    </div>
                    {tempo && (
                        <div id="tempo">
                                <div>
                                    <h1>{tempo.city.name}</h1>
                                    <h2>Sensação térmica: {(tempo.list[0].main.feels_like - 273.15).toFixed(2)}°</h2>
                                </div>
                                <div className="hj">
                                    <p><span class="til">Temperatura Máxima:</span><br /> {Math.floor(tempo.list[0].main.temp_max - 273.15)}°</p>
                                    <p><span class="til">Temperatura Mínima:</span><br /> {Math.floor(tempo.list[0].main.temp_min - 273.15)}°</p>
                                    <p><span class="til">Pressão:</span><br /> {tempo.list[0].main.pressure}Pa</p>
                                    <p><span class="til">Umidade:</span><br /> {tempo.list[0].main.humidity}%</p>
                                    <p><span class="til">Velocidade do vento:</span><br /> {Math.floor(tempo.list[0].wind.speed * 1.60934)}km/h</p>
                                    <p><span class="til">Precipitação:</span><br /> {Math.floor(tempo.list[0].pop * 100)}%</p>
                                </div>
                            <br />
                            <h2>PRÓXIMOS TRÊS DIAS</h2>
                            {tempo.list.map((dia, index) => {
                                if (index !== 0) {
                                    return <div key={index} className="dias">
                                        <h4>Data e Hora: {getDate(dia.dt_txt)}</h4>
                                        <p><span class="til">Temperatura Máxima:</span><br /> {Math.floor(tempo.list[0].main.temp_max - 273.15)}°</p>
                                        <p><span class="til">Temperatura Mínima:</span><br /> {Math.floor(tempo.list[0].main.temp_min - 273.15)}°</p>
                                        <p><span class="til">Pressão:</span><br /> {tempo.list[0].main.pressure}Pa</p>
                                        <p><span class="til">Umidade:</span><br /> {tempo.list[0].main.humidity}%</p>
                                        <p><span class="til">Velocidade do vento:</span><br /> {Math.floor(tempo.list[0].wind.speed * 1.60934)}km/h</p>
                                        <p><span class="til">Precipitação:</span><br /> {Math.floor(tempo.list[0].pop * 100)}%</p>
                                    </div>
                                }
                                return false;
                            })}
                        </div>
                    )}

                    {tempo && (
                        <div class = "mapa">
                            <LineChart charData={userData} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;