import React, { useState } from 'react';
import './styles/ChatComponent.css';
import { enviarMensaje } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


const ChatComponent = () => {

  const [conversations, setConversations] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);


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

  const handleSpeech = () => {
    console.log('hola');
    // Verificar la compatibilidad del navegador con la API SpeechRecognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // Crear una instancia de SpeechRecognition
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
      // Establecer opciones de configuración
      recognition.lang = 'es-ES'; // Idioma de reconocimiento, en este caso, español
  
      // Evento que se dispara cuando se detecta un resultado de reconocimiento
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Texto reconocido:', transcript);
        handleSendMessage(transcript);
      };
  
      // Evento que se dispara cuando se termina la captura de voz
      recognition.onend = () => {
        setIsRecording(false);
        console.log('Captura de voz finalizada');
      };
  
      // Iniciar la captura de voz al hacer clic en el botón de audio
      recognition.start();
      console.log('Capturando voz...');
      setIsRecording(true);
    } else {
      console.error('La API SpeechRecognition no es compatible con este navegador');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {conversations.map((conversation, index) => (
          <div key={index} className="conversation">
            <div className="message">{conversation.message}</div>
            {conversation.respuesta?<audio autoPlay controls className="respuesta">
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
        <button onClick={()=>handleSpeech()}>
          <FontAwesomeIcon icon={!isRecording ? faMicrophone : faCircle} /></button>
        <button onClick={() => handleSendMessage(inputValue)}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;

