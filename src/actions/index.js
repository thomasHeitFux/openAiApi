export async function enviarMensaje(mensaje, recibirRespuesta) {
    const opciones = {
      method: 'POST',
      body: JSON.stringify({ message: mensaje }),
      headers: {
        accept: "application/json",
        'Content-Type': 'application/json'
      }
    };
  
    const url = 'https://openaichat.fly.dev/prueba';
  
    try {
      const response = await fetch(url, opciones);
      const data = await response.json();
      const answer = data.answer;
      recibirRespuesta(answer);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // Manejar el error adecuadamente
    }
    
        // if (typeof response === "string") {
          // console.log(response);
          // recibirRespuesta(response);
        // }
        // else{
          // const blob = await response.blob()
          // const audioUrl = URL.createObjectURL(blob);
          // console.log(audioUrl);
          // const respuesta = {
            // contenido: audioUrl,
            // tipo: 'audio'
          // };
          // recibirRespuesta(respuesta);
        }
      // }
        
        
  
      
     
  