//capturo el contenedor principal
const conteiner = document.getElementById('conteiner')
//creo el evento para cambiar de colores la pagina
let button = document.getElementById('btn')
button.onclick = () => {
        // conteiner.classList.toggle('contenedor-dark')
        if(conteiner.className == 'light'){
            return conteiner.className = 'dark'
        }else if(conteiner.className = 'dark'){
            return conteiner.className = 'light'
        }
    }