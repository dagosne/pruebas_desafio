import { useEffect, useState } from "react";
import CardHome from "./CardHome";
import usuarios_asignados from '../images/usuarios_asignados.png'
import altaVoluntarios from '../images/altaVoluntarios.png'
import crearEventos from '../images/crearEventos.png'
import asignarTareas from '../images/asignarTareas.png'
import verReportes from '../images/verReportes.png'


function TecnicoHome() {


    return (<div className="TecnicoHome">
        <CardHome title="Dar de alta voluntario/as" subtitle="" image={altaVoluntarios} view={"/nuevoVoluntario"}/>
        <CardHome title="Dar de alta usuario/as" subtitle="" image={usuarios_asignados} view={"/nuevoUsuario"} />
        <CardHome title="Crear eventos" subtitle="" image={crearEventos} view={"/crearEventos"} />
        <CardHome title="Ver reportes de voluntario/as" subtitle="" image={verReportes} view={"/verReportes"}/>

    </div>)
}


export default TecnicoHome;