import { useContext, useEffect, useState } from "react";
import CardHome from "./CardHome";
import usuarios_asignados from '../images/usuarios_asignados.png'
import talleres from '../images/talleres.png'
import agenda from '../images/agenda.png'
import UserContext from "../context/UserContext";


function VolunteerHome() {
    const {user} = useContext(UserContext)

    return (<div className="VolunteerHome">
        <CardHome title="Usuaria/os asignada/os" subtitle="Mira a quién te hemos asignado" image={usuarios_asignados} view={`usuariosAsignados/${user.id}`}/>
        <CardHome title="Talleres y eventos" subtitle="Asiste y pasa un buen rato" image={talleres} view={`talleres`}/>
        <CardHome title="Agenda" subtitle="Todas tus actividades en un sitio" image={agenda} view={`agenda/${user.id}`}/>

    </div>)
}


export default VolunteerHome;