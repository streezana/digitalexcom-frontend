import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { Input } from "../components/input/input"
import "../style/loginregpage.css"
import { paths } from "../paths"
import { toast } from 'react-toastify'

export const LoginUser = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState([])
    const [pass, setPass] = useState(true)

    const showHidePassword = () => {
        if (pass) {
        setPass(false)
        }
        else {
            setPass(true) 
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        try {
            const { data } = await axios.post('https://hopnextgames-api.onrender.com/api/users/login', {
                email,
                password,
            })
            if (data.email_message) {
                setErr(data.email_message)
                console.log(data.email_message)
            }
            if (data.password_message) {
                setErr(data.password_message)
                console.log(data.password_message)
            }
            if (data.token) {
                window.localStorage.setItem('token', data.token)
                navigate((-1))
                toast(data.message)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
          navigate(paths.home)
        }
        }, [])

    return (
        <div className='create'>

            <form onSubmit={handleSubmit} className='form'>

                <h1 className='title'>Страница авторизации</h1>
                <div className="flex-cont">
                <div className="full">
                <Input
                    type='text'
                    name="email"
                    className="gray-input"
                    placeholder="Введите email"
                />
                </div>
                </div>   
                
                <div className="flex-cont">
                <div className="child left">
                <Input
                    type={pass ? 'password' : 'text'}
                    name="password"
                    className="gray-input"
                    placeholder="Введите пароль"
                />
                </div>
                <div className="child righted">
                    <div className="look_button" onClick={showHidePassword}>
                    {pass ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>}
                        </div>
                    </div>
                </div>

                <div className='error'>
                    {err ? err : null}
                </div>

                <button type={"submit"} className="buttonCont">Готово!</button>
                <h3 className="logcont">Нет аккаунта?  <Link className="link" to={`${paths.register}`}>Зарегистрироваться</Link></h3>

            </form>
        </div>
    )
}