import { useEffect, useRef, useState } from 'react'
import React from 'react'
import './App.css'
import userImage from './assets/user.png';
import robotImage from './assets/robot.png';

function App() {
  const [data,setData]= useState(()=>{
   const savedData=localStorage.getItem("data");
   return savedData?JSON.parse(savedData):[];
  });

  //save message whenever data changes
  useEffect(()=>{
   localStorage.setItem("data",JSON.stringify(data));
  },[data]);
  return (
    <div className='appcontainer'>
     <ChatMessages data={data}/>
      <Chatinput data={data} setData={setData}/>
    </div>
  )
}
function Chatinput({data,setData}){
   const [inputText,setInputText]=React.useState('');
    function sendmessage(){
    setData(data=>[...data,{
      message: inputText,
      person: 'user',
      id: crypto.randomUUID()
    }]);
    const response=Chatbot.getResponse(inputText);
    setData(data=>[...data,{
      message: response,
      person: 'robot',
      id: crypto.randomUUID()
    }]);
  }
  return(
    <>
    <div className='inputarea'>
        <input id='inputbox' placeholder='Send a message to Chatbot' size='30' onChange={(event)=>{
          setInputText(event.target.value)
        }} value={inputText}></input>
     <button className='sendbutton' onClick={()=>{
      sendmessage();
      setInputText('');
     }}>Send</button>
    </div>
  
    </>
  )
}
function ChatMessages(props){
 const chat=useRef(null);
 useEffect(()=>{
  chat.scrollTop=chat.scrollHeight;
  console.log(chat);
    console.log("Rendered");
 },[props.data]);
  return(
    <div className='chatbox' ref={chat}>
     {props.data.map((chatMessage)=> {
        return (
        <ChatMessage key={chatMessage.id} message={chatMessage.message} person={chatMessage.person} />
        )
     })}
    </div>
  )
}
function ChatMessage({message,person}){
 
  return (
    <>
    <div className='person' id={person}>
      {person=='robot' && <img src={robotImage} alt='robot' width='50px'></img>}
        <span id='text'>{message}</span>
        {person=='user'&&<img src={userImage} alt='user' width='50px'></img>}
    </div>
   
    </>
  )
}

export default App
