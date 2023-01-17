import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import ReportOverlay from "../ReportOverlay";

function DetalleUsuario() {
    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState("")
    const { id } = useParams()
    const [interests, setInterests] = useState("")
    useEffect(() => {
        if (userData) {
            const interests_ = JSON.parse(userData.interests)
            const filteredKeys = Object.keys(interests_).filter(key => interests_[key] === true);
            setInterests(filteredKeys.join(', '));
        }
    })

    useEffect(() => {
        async function getUserData() {
            console.log(userData)
            if (!userData) {
                const res = await fetch(`/getUser/${id}`)
                const userDataf = await res.json()
                console.log(userDataf)
                setUserData(userDataf)
            }
        }
        getUserData();
    })

    const getAge = (birth_date) => {
        let hoy = new Date()
        let fechaNacimiento = new Date(birth_date)
        return hoy.getFullYear() - fechaNacimiento.getFullYear()
    }

    const handleShow = () => {
        setShow(true)
    }

    return (<div className="Home">
        {show && <ReportOverlay setShow={setShow} id={id} />}
        <img className="img-usuario-detalle" src={`http://localhost:5000/Images/${userData.avatar}`} alt="Avatar" />
        <div className="banner-user">
            <p className="banner-user-name">{userData.first_name}, {getAge(userData.birth_date)}</p>
            <p className="banner-user-lastname">{userData.last_name}</p>
        </div>
        <div className="user-functions">
            <button className="centrado" onClick={handleShow}>REPORTAR</button>
            <a href={`tel:${userData.phone_number}`}><button className="centrado">LLAMAR</button></a>
            <button className="centrado btn-invisible"></button>
        </div>
        <div className="detail-group">
            <label>Dirección</label>
            <p>{userData.location}</p>
        </div>
        {userData && <div className="btn-map">
            <a style={{ color: "#E20613" }} href={`https://www.google.es/maps/place/${userData.location.replace(" ", "+")}/`}>
                <FontAwesomeIcon icon={faLocationArrow} />
            </a>
        </div>}
        <div className="detail-group">
            <label>Teléfono</label>
            <p>{userData.phone_number}</p>
        </div>
        <div className="detail-group">
            <label>Intereses</label>
            <p>{interests +"."}</p>
        </div>
        <div className="detail-group">
            <label>Enfermedades o dolencias</label>
            <p>{userData.health_issues}</p>
        </div>
        <div className="detail-group">
            <label>Necesita coche</label>
            <p>{userData.car ? "si" : "no"}</p>
        </div>
        <div className="detail-group">
            <label>Comentarios</label>
            <p>{userData.comments}</p>
        </div>
        <NavBar />
    </div>)
}


export default DetalleUsuario;