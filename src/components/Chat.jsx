import React, { useState } from 'react';
import './styles/ChatComponent.css';
import { enviarMensaje } from '../actions';

const ChatComponent = () => {

  const [conversations, setConversations] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async (message) => {
    try {
      const newConversation = { message, respuesta: null };
      setConversations((prevConversations) => [...prevConversations, newConversation]);
  
      const respuesta = await enviarMensaje(message);
      console.log(respuesta);
      newConversation.respuesta = respuesta;
  
      // Esperar unos segundos antes de actualizar la conversación con la respuesta
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      setConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        const index = updatedConversations.findIndex((c) => c === newConversation);
        updatedConversations[index] = newConversation;
        return updatedConversations;
      });
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
            {conversation.respuesta?<audio controls className="respuesta">
              <source src={conversation.respuesta} type="audio/mpeg" />
            </audio>:null}
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

