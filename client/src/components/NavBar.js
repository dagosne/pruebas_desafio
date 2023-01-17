import { useEffect, useState , useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faPeopleGroup, faListCheck, faPalette, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import NavBarVolunt from "./NavBarVolunt";
import UserContext from "../context/UserContext";
import { useCookies } from "react-cookie";

function NavBar() {
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const { user, setUser } = useContext(UserContext)
    const [logged, setLogged] = useState(false)
  
    useEffect(() => {
      if (cookies.session && user.name != "JsonWebTokenError") {
        setLogged(true)
      }
    })
  
    useEffect(() => {
      async function getUser() {
        if (!user) {
          const res = await fetch("/getLogged")
          const userData = await res.json()
          setUser(userData)
        }
      }
      getUser();
    })

    if(user.rol==="Technical"){
    return (
    <div>
        <div className="bottom-margin"></div>
    
    <div className="NavBar">
        <Link to={"/"}>
            <div className="btn-NavBar">
                <FontAwesomeIcon icon={faHouseUser} />
                <p className="sub-btn-NavBar">Home</p>
                <div className="over-btn" id="over-btn-home"></div>
            </div>
        </Link>
        <Link to={"/usuariosAsignados"}>
            <div className="btn-NavBar">
                <FontAwesomeIcon icon={faPeopleGroup} />
                <p className="sub-btn-NavBar">Usuarios/as</p>
                <div className="over-btn" id="over-btn-usuarios"></div>
            </div>
        </Link>
        <Link to={"/talleres"}>
            <div className="btn-NavBar">
                <FontAwesomeIcon icon={faPalette} />
                <p className="sub-btn-NavBar">Talleres</p>
                <div className="over-btn" id="over-btn-talleres"></div>
            </div>
        </Link>
        <Link to={"/agenda"}>
            <div className="btn-NavBar">
                <FontAwesomeIcon icon={faCalendar} />
                <p className="sub-btn-NavBar">Agenda</p>
                <div className="over-btn" id="over-btn-tareas"></div>
            </div>
        </Link>
    </div></div>)
    } else if (user.rol ==="Non-technical"){
        return <NavBarVolunt user={user}/>
    }
}


export default NavBar;