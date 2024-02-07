import React, { useState, useEffect } from 'react'
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom"
import {paths} from "../../paths"
import './navbar.css'
import axios from '../../utils/axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = () => {
    const navigate = useNavigate()
    const [invisible, setInvisible] = useState(true)
    const [email, setEmail] = useState()
    const [isAuth, setIsAuth] = useState(false)
    const [userId, setUserId] = useState()
const handle = () => {
    !invisible ? setInvisible(true) : setInvisible(false)
}

useEffect(()=> {
        const fetchUsers = async () => {
        await axios.get('https://hopnextgames-api.onrender.com/api/users/getme')
        .then((res) => {
            if (res.data.token) {
                setIsAuth(true)
                setEmail(res.data.user.email)
                setUserId(res.data.user._id)
            }
            if (res.data.message) {
                window.localStorage.removeItem('token')
                setIsAuth(false)
            }
        });
    };
    fetchUsers();
}, );

useEffect(() => {
    document.addEventListener("click", function(e){
        if (e.target.id !== 'th') setInvisible(true);
  });
})
const logoutHandler = () => {
    window.localStorage.removeItem('token')
    setIsAuth(false)
    toast("Выход из аккаунта выполнен")
    console.log("Выход из аккаунта выполнен")
    navigate(`${paths.home}`)
}
    
    return (
        <div className="create">
        <div className="flexContainerRow">
        <div className="navbar">
            <div className="case">
                <div className="navbar__header"><NavLink to={paths.home} className="link"><h3>HOPNEXTGAMES</h3></NavLink> </div>

                <div className="navbar__login"><button type="button" className="navbar_button" onClick={() => navigate(paths.bookcreate)}>Добавить книгу</button></div>

                <div className="navbar__login"><button id="th" type="button" onClick={() => !invisible ? setInvisible(true) : setInvisible(false)} className="navbar_button"><i className="fa-regular fa-user"></i></button></div>

                <Outlet />
            </div>

            {!invisible ?
                        <div className="sideright">
                           <div className="navbar_row">
                                <Link to={paths.game} className="link"><h6>GamePage</h6></Link>
                            </div>

                            {!isAuth ? (
                            <div className="navbar_row">
                                <Link to={`${paths.register}`} className="link"><h6>Регистрация</h6></Link>
                            </div>
                             ) : ( null )}
                            <div style={{color:'green'}}>
                                {isAuth ? (
                                    <div className="navbar_row">
                                        <Link to={`${paths.account}/${userId}`} className="link"><h6>Account</h6></Link>
                                    </div>
                                ) : null}
                            </div>

                            <div style={{color:'red'}}>
                                {isAuth ? (

                                 <div className="navbar_row">
                                 <a className="link" onClick={logoutHandler}><h6>Выйти</h6></a>
                                 </div>
                                ) : (
                                 <div className="navbar_row">
                                    <Link to={`${paths.login}`} className="link"><h6>Войти</h6></Link>
                                  </div>
                                )}
                            </div>
                        </div>
                :
                null}
        </div>
        </div>
        </div>
    );
};

export default Navbar