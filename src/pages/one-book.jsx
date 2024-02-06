import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { paths } from "../paths"
import axios from "axios"
import {jwtDecode} from 'jwt-decode'
import { toast } from 'react-toastify'
import { Input } from "../components/input/input"

export const BookPage = () => {
    const navigate = useNavigate();
    const params = useParams()
    const bookId = params.id
    const [tokenUserId, setTokenUserId] = useState()
    const [userId, setUserId] = useState()
    const [textSize, setTextSize] = useState('18')
    // const [book, setBook] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [bookImage, setBookImage] = useState('')
    const [notes, setNotes] = useState(false)
    const [showFullscreen, setShowFullscreen] = useState(false)
    const [showDisplay, setShowDisplay] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [mp3File, setMp3File] = useState('')
    const [audioDB, setAudioDB] = useState('')
   
    let fontChangeIncrease = () => {
        let style = parseInt(textSize);
        for (let i = 6; i < 71; i++) {
          (style > 70 ? style = 70 : setTextSize(style + 2));
          break;
        }
      }
      let fontChangeDecrease = () => {
        let style = parseInt(textSize);
        for (let i = 10; i < 11; i++) {
          (style < 14 ? style = 14 : setTextSize(style - 2));
          break;
        }
      }
useEffect(()=> {
        const fetchBook = async () => {
             return await axios.get(`/api/books/${bookId}`)
             .then(res => {
                // setBook(res.data[0])
                setTitle(res.data[0].title)
                setDescription(res.data[0].description)
                setContent(res.data[0].content)
                setBookImage(res.data[0].bookImage)
                setUserId(res.data[0].userId)
                setNotes(res.data[0].notes) 
              })
          };
    fetchBook();
}, [bookId]); 

useEffect(()=> {
  const fetchAudios = async () => {
       return await axios.get(`/api/audiofiles`)
       .then(res => {
        setAudioDB(res.data.find(item => item.bookId == bookId))
       })
        .catch(error => {
        throw(error)
       })
    }
    fetchAudios()
}, [bookId])

useEffect(() => {
  if (window.localStorage.getItem('token')) {
    try {
      setTokenUserId(jwtDecode(localStorage.getItem('token')).id)
    } catch(error) {
      console.log('invalid token format')
    }
  }
  }, [])

const deleteHandler = () => {
   const deleteAudio = async (audio_id) => {
      try {
        await axios.delete(`/api/audiofiles/delete/${audio_id}`)
        return (
          console.log('Аудио файл успешно удален')
          )
      } catch(error){
          console.log(error);
      }
    }
 const deleteBook = async () => {
  try {
    await axios.delete(`/api/books/${bookId}`)
    return (
      navigate(`${paths.account}/${tokenUserId}`),
      toast('Книга успешно удалена'),
      console.log('Книга успешно удалена')
      )
  } catch(error){
      console.log(error);
  }
 }
 deleteBook()
 if (audioDB && audioDB._id) return deleteAudio(audioDB._id)
}
const fullscreenHandler = async () => {
  showFullscreen ? setShowFullscreen(false) : setShowFullscreen(true)
}
const displayHandler = async () => {
  audioDB && audioDB.audioFile ?
  (showDisplay ? setShowDisplay(false) : setShowDisplay(true))
  : toast('Аудиозапись пока не загружена')
}
const showInputFile = () => {
  showInput ? setShowInput(false) : setShowInput(true)
}
const handleSubmitAudio = async (e) => {
  e.preventDefault()
  if (!mp3File) return;
  let fileName = 'audioFile-' + bookId + ".mp3"
  const formData = new FormData()
  formData.append("audioFile", mp3File, fileName)
  formData.append("bookId", bookId)
  try {
    const { data } = await axios.post('/api/audiofiles/create', formData)
  
   if (data.authorization) {
      console.log(data.authorization.message)
      toast(data.authorization.message)
   }
   if (data.audioFile) {
    console.log(data.audioFile.message)
    toast(data.audioFile.message)
   }
   if (data.tooBigSize) {
    console.log(data.tooBigSize.message)
    toast(data.tooBigSize.message)
   }
  if (data.success) {
    navigate(`${paths.books}`)
    console.log(data)
    toast(data.success)
  }
    return data
  } catch(error){
      console.log(error);
  }
  };

return (
  <>
 {!showFullscreen ?
      <div className="create">
          <div id="cont" className="flexContainerRow">
          
          <div className="rowbar">
            <button type="button" className="lowerbuttons" onClick={fullscreenHandler}><i className="fa-solid fa-expand"></i></button>
                  <button type="button" className="lowerbuttons" onClick={fontChangeIncrease}> A+ </button>
                  <button type="button" className="lowerbuttons" onClick={fontChangeDecrease}> A- </button>
                  <button type="button" className="lowerbuttons" onClick={displayHandler}><i className="fa fa-play-circle" aria-hidden="true"></i></button>
            </div>

          {tokenUserId && tokenUserId == userId ?
          <>
            <div className="rowbar">
              <button type="button" className="lowerbuttons" onClick={() => navigate(`${paths.edit}/${bookId}`)} style={{ width: 'auto' }}><h5>Редактировать книгу</h5></button>

              <button type="button" className="lowerbuttons" onClick={deleteHandler} style={{ width: 'auto' }}><h5>Удалить книгу</h5></button>

              <button type="button" className="lowerbuttons" onClick={showInputFile} style={{ width: 'auto', float: 'right' }}><h5>Загрузить аудио-версию</h5></button>
            </div>
            { showInput 
            ?
            <div className="centertext"> 
            <form onSubmit={handleSubmitAudio}>
                    <Input
                    type="file"
                    name="mp3File"
                    className="form-control"
                    placeholder="Выберите audio File"
                    onChange={(e) => setMp3File(e.target.files[0])}
                  />
            <button type={"submit"} className="buttonCont">Загрузить!</button>
              </form>
              </div>
              :
              null }
</>
            : null}

              <div className="row">
                  {bookImage && <img src={bookImage} alt="" height="90" />}
              </div>
              <h2 className="centertext">{title}</h2>
              
              <div className="row"><h4>{description}</h4></div>

              <div className="result" style={{ fontSize: `${textSize}px` }} dangerouslySetInnerHTML={{ __html: `<p>${content.replace(/\n/g, '</p><p>')}</p>` }}></div>

        {tokenUserId && tokenUserId == userId
          ?
          <div className="inputfields">

            <div className="buttonsleft">
              <input id="checkbox" type="checkbox" name="scales" checked={notes ? true : false} readOnly placeholder="Снимите галочку, чтобы опубликовать на главной странице" />
            </div>
            <h6 style={{ float: 'left' }}>{notes ? "Книга сохранена как черновик и не будет опубликована на главной странице" : "Книга будет опубликована на главной странице"}</h6>
          </div>
          :
          null}
      </div>
      </div>
: 
<div id="child"> 
<div className="rowbar">
<button type="button" className="lowerbuttons" onClick={fullscreenHandler}><i className="fa-solid fa-compress"></i></button>
    <button type="button" className="lowerbuttons" onClick={fontChangeIncrease}> A+ </button>
    <button type="button" className="lowerbuttons" onClick={fontChangeDecrease}> A- </button>
    <button type="button" className="lowerbuttons" onClick={displayHandler}><i className="fa fa-play-circle" aria-hidden="true"></i></button>  
</div> 
<div>    
   <div style={{fontSize: `${textSize}px`}} dangerouslySetInnerHTML={{__html: `<p>${content.replace(/\n/g, '</p><p>')}</p>`}}></div>
</div>
</div>
}

<div className="parentContainer">
<div className="playerContainer" style={{ display: !showDisplay ? "block" : "none" }}>
<figure>
  {audioDB && audioDB.audioFile && <audio src={audioDB.audioFile} type="audio/mp3" className="figure" controls controlsList="nodownload">
</audio> }
</figure>
</div>
</div>
</>
 )
}