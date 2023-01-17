import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadTitle from "../HeadTitle";
import NavBar from "../NavBar";

function NewEvent() {

    const [name_, setName] = useState("")
    const [location, setLocation] = useState("")
    const [postal_code, setPostal_code] = useState("")
    const [date_, setDate] = useState("")
    const [description_, setDescription] = useState("")
    const [theme, setTheme] = useState("")
    const [juegos, setJuegos] = useState(false)
    const [reuniones, setReuniones] = useState(false)
    const [musica, setMusica] = useState(false)
    const [baile, setBaile] = useState(false)
    const [cocina, setCocina] = useState(false)
    const [manualidades, setManualidades] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        function getThemes() {
            const themes = { juegos, reuniones, musica, baile, cocina, manualidades }
            const filteredKeys = Object.keys(themes).filter(key => themes[key] === true);
            setTheme(filteredKeys.join(', '));
        }
        getThemes();
    }, [juegos, reuniones, musica, baile, cocina, manualidades])

    const handleSubmit = async () => {

        const body = { name_, location, date_, theme, description_ }
        const response = await fetch("/newEvent", {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const status = await response.json()
        console.log(status)
        if (status) {
            navigate("/")
        } else {
            alert("Algo no ha ido bien.")
        }

    }

    //Esto limita la fecha programada a partir de hoy.
    const today = new Date().toISOString().split(".")[0]


    return (<div className="Home">
        <HeadTitle title="Nuevo evento" />
        <div className="form">
            <div className="form-group">
                <label className="">Título</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Localización</label>
                <input type="text" onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Código postal</label>
                <input type="text" onChange={(e) => setPostal_code(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Fecha programada</label>
                <input type="datetime-local" min={today} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="form-group">
                <label className="">Descripción</label>
                <textarea onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Temática</label>
                <div className="check-interest">
                    <div className="check-group-interest">
                        <input type="checkbox" onClick={(e) => setJuegos(e.target.checked)} />
                        <p className=" sinmargenP">Juegos de mesa</p>
                    </div>
                    <div className="check-group-interest">
                        <input type="checkbox" onClick={(e) => setReuniones(e.target.checked)} />
                        <p className=" sinmargenP" >Reuniones</p>
                    </div>
                    <div className="check-group-interest">
                        <input type="checkbox" onClick={(e) => setMusica(e.target.checked)} />
                        <p className=" sinmargenP">Música</p>
                    </div>
                    <div className="check-group-interest">
                        <input type="checkbox" onClick={(e) => setBaile(e.target.checked)} />
                        <p className=" sinmargenP" >Baile</p>
                    </div>
                    <div className="check-group-interest">
                        <input type="checkbox" onClick={(e) => setCocina(e.target.checked)} />
                        <p className=" sinmargenP">Cocina</p>
                    </div>
                    <div className="check-group-interest">
                        <input type="checkbox" onClick={(e) => setManualidades(e.target.checked)} />
                        <p className=" sinmargenP" >Manualidades</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="btn-centrado">
            <button className="centrado" id="btn-register-user" onClick={handleSubmit}>Añadir</button>
        </div>
        <div className="bottom-margin"></div>
        <NavBar />
    </div >)
}


export default NewEvent;