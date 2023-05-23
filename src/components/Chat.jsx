import React, { useState } from 'react';
import './styles/ChatComponent.css';
import { enviarMensaje } from '../actions';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [respuestas, setRespuestas] = useState([]);

  const recibirRespuesta = (respuesta) => {
    setRespuestas([...respuestas,respuesta]);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAudioLoaded = () => {
    // Reproducir el audio cuando esté cargado
    const audioElement = document.getElementById('audioElement');
    audioElement.play();
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
        enviarMensaje(inputValue,recibirRespuesta)
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className="message">
              {message}
          </div>
        ))}
        {respuestas.map((res, index) => (
          <div key={index} className="res">
              {res}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;
