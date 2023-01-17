import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadTitle from "../HeadTitle";

function CrearEventos() {
const navigate = useNavigate()

const [events, setEvents] = useState(false);
useEffect(()=>{
    async function getEvents() {
            const res = await fetch(`/getEvents`)
            const eventsFinded = await res.json();
            console.log(eventsFinded)
            setEvents(eventsFinded)
    }
    getEvents();
    console.log("ddd")
},[])

        return (<div className="Home">
            <HeadTitle title={"Gestionar eventos"}/>
            <div className="crear-evento" onClick={()=>{navigate("/newEvent")}}>
               <FontAwesomeIcon icon={faCirclePlus} className="btn-plus"/>
               <p>Crear evento</p>
            </div>

        </div>)
    }


export default CrearEventos;