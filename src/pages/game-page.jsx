import React from "react"
import "../style/loginregpage.css"
import GameFruits from '../img/fruits_0104.apk'

export const GamePage = () => {

    return (
        <div className='create'>
            <div className='form'>
                <h1 className='title'>Игра ComboFruits</h1>

                <div>
                    <h3 className="logcont"><a href={GameFruits} download="ComboFruits" style={{ marginRight: '8px' }}>Скачать</a>для  Android</h3>

                    {/* <button type="button" className="but-control"><a href={GameFruits} download="ComboFruits" style={{ textDecoration: 'none', color: 'white' }}>Download</a></button> */}
                </div>

            </div>
        </div>
) }
