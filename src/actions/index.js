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
  // const url = "http://localhost:8080/";

  try {
    const response = await fetch(url + 'prueba', opciones);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      const audioUrl = new URL(data.audioUrl, url).toString();
      return audioUrl;
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
}






