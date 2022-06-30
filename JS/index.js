//capturando los datos del fomulario
//    nombre
const inNombre = document.getElementById('nombre');
//    apellido
const inApellido = document.getElementById('apellido');
//    telefono
const inTel = document.getElementById('tel');
//    Pais
const selPais = document.getElementById('pais');
//    mail
const inEmail = document.getElementById('email');
//    HTML
const checkboxHtml = document.getElementById('HTML');
//    HTML paginas
const selPages = document.getElementById('paginas');
//    Css
const checkboxCss = document.getElementById('Css');
//    Css responsive
const selCss = document.getElementById('cssRespo');
//    javascript
const jsCheckbox = document.getElementById('javaScript')

//clase para productos
class productos{
    constructor(id, price){
        this.id = id,
        this.price = price
    }
    calc(select){
        let subtotal = 0
        subtotal = this.price * select
        return subtotal
    }
}
const html = new productos('html', 3500);
const css = new productos('css', 2500);
const javaScript = new productos('javaScript', 1200);
//almacenar los datos
class datos{
    constructor(nombre, apellido, telefono, email, pais){
        this.nombre = nombre,
        this.apellido = apellido,
        this.pais = pais,
        this.telefono = telefono,
        this.email = email
    }
}

//creo un elemento que va a servir para mostrar en pantalla lo ingresado
const div = document.createElement('div');

//desplegar los select de HTML/Css
function desplegar(ID, selId){
    (ID).addEventListener('click', () =>{
        if(ID.defaultChecked){
            (selId).style.display = "none";
        }
        else if(ID.checked){
            (selId).style.display = "block";
        }else{
            (selId).style.display = "none";
            (selId).value = 0
        }
    })
}
desplegar(checkboxHtml, selPages)
desplegar(checkboxCss, selCss)

//creo dos botones afuera del evento de la funcion para para que sean variables globales
const btnRemove = document.createElement('button');
        btnRemove.textContent = "Remove";
        btnRemove.onclick = () =>{
            div.remove()
        }

const products = [];

const btnSubmit = document.createElement('button');
btnSubmit.textContent = 'submit';
btnSubmit.onclick = () =>{
    
    let data = new datos (inNombre.value, inApellido.value, inTel.value, inEmail.value, selPais.options[selPais.selectedIndex].text );
    if(checkboxHtml.checked == true){
        html['cantidad'] = selPages.value;
        products.push(`${html.id} pages: ${html.cantidad}`);
        data['product'] = JSON.stringify(products);
    }if(checkboxCss.checked == true){
        css['cantidad'] = selCss.value;
        products.push(`${css.id} pages: ${css.cantidad}`);
        data['product'] = JSON.stringify(products);
    }if(jsCheckbox.checked == true){
        products.push(`${javaScript.id}: yes`);
        data['product'] = JSON.stringify(products);
    }

    const dataStorage = JSON.stringify(data)
    localStorage.setItem(`${data.nombre} ${inApellido.value}`, dataStorage)
    div.remove()
}

//capturo el contenedor
const main = document.querySelector('#conteiner main')

//capturo el formulario y creo el evento submit
let formulario = document.getElementById('formulario')
    formulario.addEventListener("submit", (validar) => {
        validar.preventDefault();
        //const div
        div.innerHTML = `
        <h1>Estos son los datos que ingresaste para que nos contactemos con usted</h1>
        <p>Nombre Completo: <strong>${inNombre.value} ${inApellido.value}</strong></p>
        <p>pais de residencia: <strong>${selPais.options[selPais.selectedIndex].text}</strong></p>
        <p>telefono celular: <strong>${inTel.value}</strong></p>
        <p>e-mail: <strong>${inEmail.value}</strong></p>`
        
        div.appendChild(btnRemove);
        div.appendChild(btnSubmit);
        main.appendChild(div);
    });
    