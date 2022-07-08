
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
const jsCheckbox = document.getElementById('javaScript');

//variable de Luxon
let DateTime = luxon.DateTime;

//clase para productos
class productos{
    constructor(id, price){
        this.id = id,
        this.price = price
    }
    subtotalPerPag(select){
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
function desplegar(ID, selId, row){
    (ID).addEventListener('click', () =>{
        if(ID.defaultChecked){
            (selId).style.display = "none";
        }
        else if(ID.checked){
            (selId).style.display = "block";
            conteiner.style.gridTemplateRows = row;
        }else{
            (selId).style.display = "none";
            (selId).value = 0;
            conteiner.style.gridTemplateRows = '1fr 9fr 1fr';
        }
    })
}
desplegar(checkboxHtml, selPages, '1fr 10fr 1fr')
desplegar(checkboxCss, selCss, '1fr 11fr 1fr')



const products = [];

//capturo el contenedor
const main = document.querySelector('#conteiner main')

//capturo el formulario y creo el evento submit
let formulario = document.getElementById('formulario')
    formulario.addEventListener("submit", (validar) => {
        validar.preventDefault();
        //ARS
        const subtotalHtml = (html.subtotalPerPag(selPages.value)).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2});

        const subtotalCss = (css.subtotalPerPag(selCss.value)).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2});

        const subtotalJS = (javaScript.price).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2});

        const total = (html.subtotalPerPag(selPages.value) + css.subtotalPerPag(selCss.value) + javaScript.price).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2});

        const iva = ((html.subtotalPerPag(selPages.value) + css.subtotalPerPag(selCss.value) + javaScript.price) * 1.21).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2});
        //USD
        const stHtmlUsd = html.subtotalPerPag(selPages.value) / 135;
        const stCssUsd = css.subtotalPerPag(selCss.value) / 135;
        const stJsUsd = javaScript.price / 135;
        const totalUsd = stHtmlUsd + stCssUsd + stJsUsd;
        const ivaUsd = totalUsd * 1.21;
        
        const ARS = (e) => {e.toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2})} 

        const dt = DateTime.now();

        if(checkboxHtml.checked == true && checkboxCss.checked == true && jsCheckbox.checked == true){

            conteiner.style.gridTemplateRows = '1fr 26fr 1fr';
            //const div
            div.style.height = '145vh';
            div.innerHTML = `<h1>Estos son los datos que ingresaste para que nos contactemos con usted</h1>
            <p>Fecha: <strong>${dt.toLocaleString(DateTime.DATE_SHORT)}</strong></p>
            <p>Nombre Completo: <strong>${inNombre.value} ${inApellido.value}</strong></p>
            <p>pais de residencia: <strong>${selPais.options[selPais.selectedIndex].text}</strong></p>
            <p>telefono celular: <strong>${inTel.value}</strong></p>
            <p>e-mail: <strong>${inEmail.value}</strong></p>
            <h2>Aqui esta su presupuesto</h2>
            <p>Html x${selPages.value} páginas: ${subtotalHtml}/ ${Math.ceil(stHtmlUsd)}USD</p>
            <p>Css x${selCss.value} pantallas responsive: ${subtotalCss}ARS/ ${Math.ceil(stCssUsd)}USD</p>
            <p>JavaScript: ${subtotalJS}ARS/ ${Math.ceil(stJsUsd)}USD</p>
            <p>subtotal sin iva: ${total}ARS/ ${Math.ceil(totalUsd)}USD</p>
            <p>Total con iva : ${iva}ARS/ ${Math.ceil(ivaUsd)}USD</p>
            <p>este presupuesto se mantendra una semana y media: <strong>${dt.plus({days: 11}).toLocaleString(DateTime.DATE_SHORT)}</strong></p>`

        }else{
            conteiner.style.gridTemplateRows = '1fr 19fr 1fr';
            div.style.height = '100vh';
            div.innerHTML = `<h1>Estos son los datos que ingresaste para que nos contactemos con usted</h1>
            <p>Fecha: <strong>${dt.toLocaleString(DateTime.DATE_SHORT)}</strong></p>
            <p>Nombre Completo: <strong>${inNombre.value} ${inApellido.value}</strong></p>
            <p>pais de residencia: <strong>${selPais.options[selPais.selectedIndex].text}</strong></p>
            <p>telefono celular: <strong>${inTel.value}</strong></p>
            <p>e-mail: <strong>${inEmail.value}</strong></p>
            <h2>Debido a la poca info que se recopila de las opciones seleccionadas, el presupuesto a mostrar puede ser muy inexacto, por eso mismo nos contactaremos con</h2>`
        }

        div.appendChild(btnRemove);
        div.appendChild(btnSubmit);
        main.appendChild(div);
    });

//creo dos botones afuera del evento de la funcion para para que sean variables globales
const btnRemove = document.createElement('button');
        btnRemove.textContent = "Remove";
        btnRemove.onclick = () =>{
            
            Swal.fire({
                title: '¿Esta seguro de que desea remover el contenido del formulario?',
                icon: 'question',
                text: 'Al presionar "ok", el formulario será reseteado',
                showCancelButton: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Si'
            }).then((R) =>{
                if(R.isConfirmed){
                    conteiner.style.gridTemplateRows = '1fr 9fr 1fr';
                    formulario.reset();
                    div.remove()
                    Swal.fire({
                        title: 'Formulario reseteado correctamente',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false
                    })
                }
            })
        }

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
    
    Swal.fire({
        title: '¿Desea enviar los datos del formulario?',
        text: 'Puede revisarlo de nuevo antes de enviarlo',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'revisar',
        confirmButtonText: 'enviar',
    }).then((R) =>{
        if(R.isConfirmed){
            const dataStorage = JSON.stringify(data)
            localStorage.setItem(`${data.nombre} ${inApellido.value}`, dataStorage)
            div.remove()
            conteiner.style.gridTemplateRows = '1fr 9fr 1fr';
            selPages.style.display = 'none';
            selCss.style.display = 'none';
            formulario.reset();
            Swal.fire({
                title: 'El formulario se ha enviado correctamente',
                text: 'En las proximas 72hs se estaran comunicando con usted',
                confirmButtonText: 'ok',
                timer: 3000,
                icon: 'success'
            })
        }else if(R.isDismissed){
            Swal.fire({
                title: 'Tomese su tiempo',
                confirmButtonText: 'ok',
                timer: 3000,
                icon: 'info'
            })
        }
    })
}