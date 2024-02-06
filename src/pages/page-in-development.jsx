import React from "react"
import { useNavigate } from "react-router-dom"

export const DevelopmentPage = () => {
  const navigate = useNavigate()

return (
    <div className='create'>
      <div className='form'>
      <h3 className='title'>Страница в разработке</h3>
      <button type="button" className="lowerbuttons" onClick={() => navigate(-1)}  style={{ width:'120px', height:'40px' }}><h5>Назад</h5></button>
      </div>
    </div>
  )
}