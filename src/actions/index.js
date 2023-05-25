export async function enviarMensaje(mensaje) {

    const opciones = {
      method: 'POST',
      body: JSON.stringify({ message: mensaje }),
      headers: {
        accept: "application/json",
        'Content-Type': 'application/json'
      }
    };
  
    const url = 'https://openaichat.fly.dev/';
  
    try {
      const response = await fetch(url+'prueba', opciones);
      console.log(response);
      if (response.ok) {
      const data = await response.json();
      const audioUrl = url + data.audioUrl;
      console.log(audioUrl);
      return audioUrl
    }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  }
        


  
      
     
  