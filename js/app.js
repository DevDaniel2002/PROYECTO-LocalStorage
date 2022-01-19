// variables    
const formulario = document.querySelector('#formulario');
const listaTweet = document.querySelector('#lista-tweets');
let tweets = [];

// event listener
eventListeners();

function eventListeners(){
    // Cuando el user agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}




// Funciones
function agregarTweet(e) {
    e.preventDefault()

    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');

        return; // evita que se ejecuten mas lines de codigo
    }   

    const tweetOBj = {
        id: Date.now(),
        tweet
    }

    // Anadir al arreglo de tweets
    tweets = [...tweets, tweetOBj];

    // vamos a crear el HTML
    crearHTML();

    // Reiniciar el form
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    
    // insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 seg
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


// Muestra un listado de los twt
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {
            // agregar un btn
            const bntEliminar = document.createElement('a');
            bntEliminar.classList.add('borrar-tweet');
            bntEliminar.innerText = 'X'

            // anadir la funcion de eliminar
            bntEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // crear html
            const li = document.createElement('li');

            // Anadir el text
            li.innerText = tweet.tweet;

            // Asignar el boton
            li.appendChild(bntEliminar);

            // insertarlo en el HTML
            listaTweet.appendChild(li)
        });
    }

    sincronizarStorage();

}

// Agrega los twt actuales a Local Storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    
    crearHTML();
}


// limpiar el html
function limpiarHTML() {
    while (listaTweet.firstChild){
        listaTweet.removeChild(listaTweet.firstChild);
    }
}