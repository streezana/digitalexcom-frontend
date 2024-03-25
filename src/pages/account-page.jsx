import React, { useState, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import axios from "axios"
import "../style/loginregpage.css"
import { paths } from "../paths"
import { toast } from 'react-toastify'
import {jwtDecode} from 'jwt-decode'

const PersonalAccount = () => {
    const navigate = useNavigate()
    const params = useParams()
    const userId = params.id
    const [books, setBooks] = useState([])
    const [tokenUserId, setTokenUserId] = useState()

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
          try {
            setTokenUserId(jwtDecode(localStorage.getItem('token')).id)
          } catch(error) {
            console.log('invalid token format')
          }
        }
        }, []) 
    useEffect(()=> {
          const fetchBooks = async () => {
               return await axios.get(`https://hopnextgames-api.onrender.com/api/books`)
                .then(res => res.data)
                .then(data => setBooks(data))
            };
          fetchBooks();
        }, );
  const newBooksArr = books.filter(item => {
          if (item.userId==tokenUserId) return item;
      })

const deleteHandler = async (idBook) => {
        console.log('Book deleted - '+idBook)
   try {
          await axios.delete(`https://hopnextgames-api.onrender.com/api/books/${idBook}`)
          return (
            navigate(`${paths.account}/${tokenUserId}`),
            toast('Книга успешно удалена'),
            console.log('Книга успешно удалена')
            )
        } catch(error){
            console.log(error);
        }
    }

return (
  <div className='create'>
    { tokenUserId && tokenUserId==userId ?
       <div id="cont" className="flexContainerRow">

            <div className='result'>
            <div className='form-control'>
                <div>
                    <h3 className="logcont">Личный кабинет: <Link className="link" to={`${paths.developmentpage}`}>Посмотреть или изменить данные</Link></h3>
                </div>
             </div>
            </div>

  {newBooksArr && newBooksArr.map((item, index) =>
    <div className="result" key={index}>
       <div>
          <div className="rowbut">
            <Link to={`${paths.books}/${item._id}`}>
              <h3>{item.title.substr(0, 100) + '.. '}</h3>
            </Link>
          </div>
          <div className="rowbar">
            <button type="button" className="lowerbuttons" onClick={() => navigate(`${paths.edit}/${item._id}`)} style={{ width: 'auto' }}><h5>Редактировать книгу</h5></button>
            <button type="button" className="lowerbuttons" onClick={() => deleteHandler(item._id)} style={{ width: 'auto', float: 'right' }}><h5>Удалить книгу</h5></button>
          </div>
      
     <h5>{item.description.substr(0,220)+'.. '}</h5>
         <h4>{item.content.substr(0,250)+'.. '}</h4>

<div className="row">
 <div className="inputfields">
  <div className="buttonsleft">
  <input id="checkbox" type="checkbox" name="scales" checked={item.notes ? true : false} readOnly />
  </div>
<h6 style={{ float: 'left' }}>{item.notes ? "Черновик" : 'Книга опубликована на главной странице'}</h6>
</div>
</div>
     </div>
    </div>
   )}
  
</div>
:
<div className='error' style={{marginTop: '50px', textAlign: 'center', alignItems: 'center'}}>
<h3>Пожалуйста, войдите или зарегистрируйтесь</h3>
</div>
} 
</div>
 )
}

export default PersonalAccount