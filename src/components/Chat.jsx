import React, { useState } from 'react';
import './styles/ChatComponent.css';
import { enviarMensaje } from '../actions';

const ChatComponent = () => {
  const [conversations, setConversations] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async (message) => {
    try {
      const respuesta = await enviarMensaje(message);
      const newConversation = { message, respuesta };
      setConversations((prevConversations) => [...prevConversations, newConversation]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e.target.value);
      setInputValue('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {conversations.map((conversation, index) => (
          <div key={index} className="conversation">
            <div className="message">{conversation.message}</div>
            <div className="respuesta">{conversation.respuesta}</div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={() => handleSendMessage(inputValue)}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;

