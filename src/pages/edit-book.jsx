import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { paths } from "../paths"
import { Input } from "../components/input/input"
import axios from "axios"
import { toast } from 'react-toastify'
import "../style/loginregpage.css"
import {jwtDecode} from 'jwt-decode'

export const EditBookPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const bookId = params.id
  const [tokenUserId, setTokenUserId] = useState()
  const [bookImage, setBookImage] = useState(null)
  const [imageBl, setImageBl] = useState(null)
  const [notes, setNotes] = useState(false)
  const [errTitle, setErrTitle] = useState()
  const [errContent, setErrContent] = useState()
  const [exemplar, setExemplar] = useState('')
  const [bookImagePath, setBookImagePath] = useState("")
  const [status, setStatus] = useState()

  useEffect(()=> {
    const fetchBook = async () => {
         return await axios.get(`https://hopnextgames-api.onrender.com/api/books/${bookId}`)
         .then(res => {
          setExemplar(res.data[0])
          setBookImagePath(res.data[0].bookImage+"")
          setNotes(res.data[0].notes)
          })
      };
fetchBook();
if (window.localStorage.getItem('token')) {
  try {
    setTokenUserId(jwtDecode(localStorage.getItem('token')).id)
  }
  catch(error) {
    console.log('invalid token format')
  }
} else {
  setStatus('Пожалуйста, войдите или зарегистрируйтесь')
  if (status) { 
  toast(status);
  navigate(paths.login)
  }
}
}, [bookId, status]); 
useEffect(() => {
  // fetch(`${bookImagePath.split('http://localhost:8000')[1]}`)
  fetch(`${bookImagePath.split(paths.host)[1]}`)
  .then((res) => res.blob())
  .then((img) => setImageBl(img))
  .catch(error => {
    throw(error)
  })
}, [bookImagePath])

const handleImageFile = (e) => {
setBookImage(e.target.files[0])
}
const handleCheckbox = () => {
  notes ? setNotes(false) : setNotes(true)
}

const handleSubmit = async (e) => {
e.preventDefault();
const formData = new FormData();
formData.append("title", e.target.elements.title.value.trim());
formData.append("description", e.target.elements.description.value);
formData.append("content", e.target.elements.content.value);
formData.append("bookImage", bookImage || imageBl, bookImagePath.split(`${paths.host}/static/`)[1])
//formData.append("bookImage", bookImage || imageBl,`${bookImagePath.split('http://localhost:8000/static/')[1]}`)
formData.append("userId", exemplar.userId);
formData.append("notes", notes);
try {
  const { data } = await axios.put(`https://hopnextgames-api.onrender.com/api/books/edit/${bookId}`, formData)

  if (data.title) {
    setErrTitle(data.title.message)
    console.log(data.title.message)
}
if (data.content) {
  setErrContent(data.content.message)
  console.log(data.content.message) 
}
if (data.uniqueBook && data.uniqueBook._id==!bookId) {
  setErrTitle('Книга с таким названием уже есть. Дайте другое название, например: "Гензель и Гретель. Авторы: Братья Гримм. Перевод П.Н.Полевой"')
  console.log('Книга с таким названием уже есть. Дайте другое название, например: "Гензель и Гретель. Авторы: Братья Гримм. Перевод П.Н.Полевой"')
}
if (data.success) {
  toast(data.success)
  navigate(`${paths.books}/${bookId}`) 
}
   return data
} catch(error){
    console.log(error);
}
};

return (
  <div className='create'>
      <div className="flexContainerRow">
 {tokenUserId && tokenUserId==exemplar.userId ?     
    <form onSubmit={handleSubmit} className='form-book'>
        <h1 className='title'>Страница редактирования книги</h1>

        <Input
          type="file"
          name="bookImage"
          className="form-control"
          placeholder="Выберите изображение"
          onChange={handleImageFile}
        />
        <h4 style={{ marginLeft: 40 }}>Название книги</h4>
        <Input
          name="title"
          className="form-control"
          placeholder="Название книги"
          defaultValue={exemplar.title}
        />
        <div className='error'>
        {errTitle ? errTitle : null}
        </div>

        <h4 style={{ marginLeft: 40 }}>Описание</h4>
        <Input
          name="description"
          className="form-control"
          placeholder="Описание книги"
          defaultValue={exemplar.description}
        />

        <h4 style={{ marginLeft: 40 }}>Содержимое</h4>
        <div className="fit-content" >
          <textarea name="content" type="text" placeholder="Введите текст книги" defaultValue={exemplar.content}></textarea>
        </div>
        <div className='error'>
        {errContent ? errContent : null}
        </div>

        <div className="inputfields">
        <h4 style={{ marginLeft: 40 }}>Сохранить как черновик</h4>
        <div className="buttonsleft">
          <input id="checkbox" type="checkbox" name="scales" checked={notes ? true : false} onChange={handleCheckbox} placeholder="Снимите галочку, чтобы опубликовать на главной странице"/>
         </div>
         <h6 style={{ float:'left' }}>Уберите галочку, чтобы опубликовать на главной странице</h6>
         </div>

        <div className="buttonCenter">
        
        <button type={"submit"} className="buttonCont">Готово!</button>
       
        </div>
      </form>
      : 
      <div className='buttonCenter'>
      <div className='form'>
      <h3 className='title'>Пожалуйста, войдите или зарегистрируйтесь</h3>
      </div>      
      </div>
       } 
    </div>
  </div>
  )
}