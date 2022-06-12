import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import "./Chat.css";
import socketIO from "socket.io-client";
import sendLogo from '../images/send.png';
import Message from '../Message/Message';
import ReactScrolltoBottom from 'react-scroll-to-bottom';
import closeIcon from '../images/closeIcon.png'

let socket;
const ENDPOINT = "http://localhost:4000/";

const Chat = () => {

    const [id, setid] = useState("");
    const [messages, setmessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = " ";
    }

  useEffect(() => {
     socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("Connected");
      setid(socket.id)
    });


    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
        setmessages([...messages,data]);
        console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
        setmessages([...messages,data]);
        console.log(data.user, data.message);
    })

    socket.on('leave', (data) => {
        setmessages([...messages,data]);
        console.log(data.user, data.message);
    })

    return () => {
        socket.on('disconnect');
        socket.off();
    };
  }, []);

  useEffect(() => {
      socket.on('sendMessage', (data) => {
        setmessages([...messages,data]);
        console.log(data.user, data.message, data.id);
      })
      return () => {
          socket.off();
      };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
            <h2>CHAT APP</h2>
            <a href="/"><img src={closeIcon} alt="Close" /></a>
        </div>
        <ReactScrolltoBottom className="chatBox">
           {messages.map((item,i) => <Message user={item.id === id ? '' : item.user}  message={item.message} classs={item.id=== id?'right':'left' } />)}
        </ReactScrolltoBottom>
        <div className="inputBox">
            <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
            <button onClick={send} className="sendBtn"><img src = {sendLogo} alt ="Send" /></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
