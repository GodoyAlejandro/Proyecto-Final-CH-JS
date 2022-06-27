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

//capturando los datos del fomulario
const inNombre = document.getElementById('nombre');
const inApellido = document.getElementById('apellido');
const inEdad = document.getElementById('edad');
const selPais = document.getElementById('pais');

//almacenar los datos
class datos{
    constructor(nombre, apellido, edad, pais){
        this.nombre = nombre,
        this.apellido = apellido,
        this.edad = edad,
        this.pais = pais
    }
}
class almacen{
    constructor(){
        this.list = []
    }
    almacenarData(data){
        this.list.push(data)
    }
}
const dataAlmacenada = new almacen()

//creo un elemento que va a servir para mostrar en pantalla lo ingresado
const div = document.createElement('div');
//capturo el contenedor
const main = document.querySelector('#conteiner main')
//capturo el formulario y creo el evento submit
let formulario = document.getElementById('formulario')
    formulario.addEventListener("submit", (validar) => {
        validar.preventDefault();
        div.innerHTML = `<h1>Estos son los datos que ingresaste</h1>
                        <p>el nombre que ingresate fue: <strong>${inNombre.value} ${inApellido.value}</strong>  </p>
                        <p> tu edad es: <strong>${inEdad.value}</strong> </p>
                        <p> naciste y/o recides en: <strong>${selPais.options[selPais.selectedIndex].text}</strong> </p>`
        const btnRemove = document.createElement('button');
        btnRemove.textContent = "Remove";
        btnRemove.onclick = () =>{
            div.remove()
        }
        const btnSubmit = document.createElement('button');
        btnSubmit.textContent = 'submit';
        btnSubmit.onclick = () =>{
            let data = new datos (inNombre.value, inApellido.value, inEdad.value, selPais.options[selPais.selectedIndex].text );
            dataAlmacenada.almacenarData(data)
            div.remove()
            //los datos almacenados en el array se muestran por consola
            console.log(dataAlmacenada);
        }
        div.appendChild(btnRemove);
        div.appendChild(btnSubmit);
        main.appendChild(div);
    });
    