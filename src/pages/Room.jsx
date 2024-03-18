import React, {useState, useEffect} from 'react'
import {databases, DATABASE_ID,COLLECTION_ID_MESSAGES} from '../appwriteConfig.js'
import {ID,} from 'appwrite'

const Room = () => {

  const [messages, setMessages]=useState([])
  const [messageBody , setMessageBody]=useState('')

useEffect(() =>{
  getMessages()

},[])

  const handleSubmit=async (e)=>{
    e.preventDefault()

    let payload={
      body:messageBody  
    }

    let response=await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    )
    console.log('Created!' ,response)
      setMessages(prevState =>[response, ...prevState])
      setMessageBody('')
  }

  const getMessages=async()=>{
     const response =await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      )
     console.log('RESPONSE:',response)
     setMessages(response.documents)
  }
  return (
    <main className='container'>
      <div className='room--container'>
      <form id="message--form" onClick={handleSubmit}>
        <div>
          <textarea
          requiredmaxlength="1000"
          placeholder="say something"
          onChange={(e => {setMessageBody(e.target.value)})}
          value={messageBody}
          >

          </textarea>
        </div>
        <div className="send-btn--wrapper">
          <input className="btn btn--secondary" type="submit" value="send">
          </input>
        </div>
      </form>
      <div>
     {messages.map(messages=>(
      <div key={messages.$id} className='message--wrapper'>
        <div className='message--header'>
          <small className='message-timestamp'>{messages.$createdAt}</small>
          </div>
        <div className='message--body'>
          <span>{messages.body}</span>
        </div>

      </div>
     ))}
      </div>
      </div>
    </main>
  )
}

export default Room