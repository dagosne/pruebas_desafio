import { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar";
import HeadTitle from "../HeadTitle";
import UserContext from "../../context/UserContext";
import { useCookies } from "react-cookie";
import Login from '../Login'
import { useNavigate, useParams } from "react-router-dom";

function UsuariosAsignados() {
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const { user, setUser } = useContext(UserContext)
    const [logged, setLogged] = useState(false)
    const [usersData, setUsersData] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()
    

    useEffect(() => {
        if (cookies.session && user.name != "JsonWebTokenError") {
            setLogged(true)
        }
        console.log("session")
    },[])


    useEffect(() => {
        async function getUserAsigned() {
                const res = await fetch(`/getUsers`)
                const usersFinded = await res.json()
                setUsersData(usersFinded)
                console.log(usersFinded)
        }
        getUserAsigned();
    },[])
        
    const getAge= (birth_date)=>{
        let hoy = new Date()
        let fechaNacimiento = new Date(birth_date)
        return hoy.getFullYear() - fechaNacimiento.getFullYear()
    }

    if (logged) {
        return (<div className="Home">
           { <HeadTitle title={"Usuaria/os asignada/os"} />}
            <div className="grid">
                {usersData&&usersData.map((element, i)=>{
                    return(
                        <div className="user-card" onClick={()=>navigate(`/detalleUsuario/${element.id}`)} key={i}>
                            <img className="imgGrid" src={`http://localhost:5000/Images/${element.avatar}`} alt="Avatar" />
                            <p className="card-user-title">{element.first_name.split(" ")[0]}, {getAge(element.birth_date)}</p>
                            <p className="card-user-subtitle">{element.location}</p>
                            <p className="card-user-subtitle">{element.last_contact}</p>
                        </div>
                    )
                })
                }
            </div>
            <NavBar />
        </div>)
    } else {
        return <Login setLogged={setLogged} />
    }


}


export default UsuariosAsignados;