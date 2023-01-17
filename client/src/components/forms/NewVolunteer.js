import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadTitle from "../HeadTitle";
import NavBar from "../NavBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function NewVolunteer() {
    
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [birth_date, setBirth_date] = useState("")
    const [location, setLocation] = useState("")
    const [postal_code, setPostal_code] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [passError, setPassError] = useState(false)
    const [availability, setAvailability] = useState("workdays")
    const [studies, setStudies] = useState("No studies")
    const [car, setCar] = useState(false)
    const [volunteer_since, setVolunteer_since] = useState("")
    const [comments, setComments] = useState("")
    const navigate = useNavigate()
    const [imagen, setImagen] = useState(null);





    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("file", imagen.file);
        if (pass === pass2) {
            const responseImage = await fetch("/upload", {
                method: "POST",
                body: formData,
            });
            const operation = await responseImage.json()
            console.log(operation)
            if(operation.status){
                var avatar = operation.path
            }
            
            const body = { first_name, last_name, birth_date, location, postal_code, phone_number, email, pass, availability, studies, car, volunteer_since, comments, avatar }
            const response = await fetch("/volunteer-register", {
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

        } else {
            setPassError(true)
        }
    }

    const checkCarSi = () => {
        const carNo = document.getElementById("car-no")
        carNo.checked = false
        setCar(true)
    }
    const checkCarNo = () => {
        const carSi = document.getElementById("car-si")
        carSi.checked = false
        setCar(false)
    }
    const setEnable = (value) => {
        const button = document.getElementById("btn-register-volunteer")
        if (value) {
            button.disabled = false;
            setEnabled(true)
        } else { button.disabled = true }

    }
    const [enabled, setEnabled] = useState(false)
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        setImagen({
            file: file,
            //Esta url sirve para mostrar una previsualización de la imagen en la etiqueta <img>
            imagePreviewUrl: URL.createObjectURL(file)
        });
    }


    return (<div className="Home">
        <HeadTitle title="Formulario voluntaria/os" />
        <div className="form">
        <div>
                < div className="centrado marginadoTop">
                    <label className="centrado">
                        <input
                            hidden
                            required
                            type="file"
                            className="form-control"
                            id="imagen"
                            placeholder=""
                            onChange={handleImageChange}
                        />
                        <div className="centrado upload">
                            <FontAwesomeIcon icon={faUpload} className="iconoupload" />
                            <p>Elige una imagen</p>
                        </div>
                    </label>
                </div>
                {imagen && <div className="form-group centrado marginadoTop">
                    <h4>Previsualización</h4>
                    <img src={imagen.imagePreviewUrl} alt="Preview" className="imgPreview" />
                </div>}
            </div>
            <div className="form-group">
                <label className="">Nombre</label>
                <input type="text" onChange={(e) => setFirst_name(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Apellidos</label>
                <input type="text" onChange={(e) => setLast_name(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Fecha de nacimiento</label>
                <input type="date" onChange={(e) => setBirth_date(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Dirección</label>
                <input type="text" onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Código postal</label>
                <input type="number" onChange={(e) => setPostal_code(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Teléfono</label>
                <input type="text" onChange={(e) => setPhone_number(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Contraseña</label>
                <input type="password" onChange={(e) => setPass(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Repetir contraseña</label>
                <input type="password" onChange={(e) => setPass2(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Disponibilidad</label>
                <select onChange={(e) => setAvailability(e.target.value)}>
                    <option value="workdays" key="1">Diario</option>
                    <option value="weekends" key="2">Fin de semana</option>
                </select>
            </div>
            <div className="form-group">
                <label className="">Estudios</label>
                <select onChange={(e) => setStudies(e.target.value)}>
                    <option value="No studies" key="1">Sin estudios</option>
                    <option value="Primary School" key="2">Primaria</option>
                    <option value="High School" key="3">Secundaria</option>
                    <option value="Bachelors" key="4">Grado universitario</option>
                    <option value="Masters" key="5">Masters</option>
                </select>
            </div>
            <div className="form-group">
                <label className="">¿Dispone de coche propio?</label>
                <div className="check-car">
                    <div className="check-group">
                        <p className=" sinmargenP">Si</p>
                        <input type="checkbox" id="car-si" onClick={checkCarSi} />
                    </div>
                    <div className="check-group">
                        <p className=" sinmargenP" >No</p>
                        <input type="checkbox" id="car-no" onClick={checkCarNo} />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label className="">Fecha de incorporación</label>
                <input type="date" onChange={(e) => setVolunteer_since(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="">Comentarios</label>
                <textarea onChange={(e) => setComments(e.target.value)} />
            </div>
            <div className="form-group">
                <div className="check-group">
                    <input type="checkbox" id="car-si" onClick={(e) => setEnable(e.target.checked)} />
                    <p style={{ fontWeight: "200", fontSize: "12px" }}>Acepto la</p><a href="" style={{ color: "red", fontWeight: "200", fontSize: "12px", textDecoration: "underline" }}>Politica de privacidad de datos</a>
                </div>
            </div>
        </div>
        <div className="centrado">
            {enabled ?
                <button className="centrado" id="btn-register-volunteer" onClick={handleSubmit}>Añadir</button>
                :
                <button className="centrado" id="btn-register-volunteer" onClick={handleSubmit} disabled>Añadir</button>
            }

        </div>
        <div className="bottom-margin"></div>
        <NavBar />
    </div>)
}


export default NewVolunteer;