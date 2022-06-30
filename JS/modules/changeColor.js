//capturo el contenedor principal
const conteiner = document.getElementById('conteiner')
//creo el evento para cambiar de colores la pagina
let button = document.getElementById('btn')
button.onclick = () => {
        // conteiner.classList.toggle('contenedor-dark')
        if(conteiner.className == 'contenedor-light'){
            return conteiner.className = 'contenedor-dark'
        }else if(conteiner.className = 'contenedor-dark'){
            return conteiner.className = 'contenedor-light'
        }
    }