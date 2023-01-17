import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function LogOut() {
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const [hide, setHide] = useState(false)
    const navigate = useNavigate()
    const handleLogOut = () => {
        console.log("Me vooooooooooy")
        removeCookie("session");
        navigate("/")
        window.location.reload()
    }
    useEffect(() => {
        function isLogged() {
            if (document.cookie) {
                setHide(false)
            } else {
                setHide(true)
                console.log("owowo")
            }
        }
        isLogged()
    })
    if(!hide){return <button className="log-out"><FontAwesomeIcon icon={faPowerOff} onClick={handleLogOut} /></button>}

}

export default LogOut