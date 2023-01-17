import { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import VolunteerHome from "./VolunteerHome";
import TecnicoHome from "./TecnicoHome";
import avatar from '../images/avatar.jpg'
import UserContext from "../context/UserContext";
import { useCookies } from "react-cookie";
import Login from './Login'

function Home() {
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
    console.log(user)
  })


  if (logged) {
    return (
      <div className="Home">
        {user.avatar ? <img className="avatar-home" src={`http://localhost:5000/Images/${user.avatar}`} alt="avatar" /> : <img className="avatar-home" src={avatar} alt="avatar" />}
        <p className="nombre-home">Hola {user.first_name}</p>
        {user.rol === "Non-technical" && <VolunteerHome />}
        {user.rol === "Technical" && <TecnicoHome />}
        <div className="bottom-margin"></div>
        <NavBar />
      </div>)
  } else {
    return <Login setLogged={setLogged} />
  }


}


export default Home;