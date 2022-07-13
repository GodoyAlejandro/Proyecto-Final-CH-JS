
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
//capturo el contenedor
const main = document.querySelector('#conteiner main');

//variable de Luxon
let DateTime = luxon.DateTime;
// clase para productos
// class productos{
//     constructor(id, price){
//         this.id = id,
//         this.price = price
//     }

// }
// const html = new productos('html', 3500);
// const css = new productos('css', 2500);
// const javaScript = new productos('javaScript', 1200);
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




function subtotalPerPag(select, price){
    let subtotal = 0
    subtotal = price * select
    return subtotal
}
function LOCALSTRING (v) {
    return (v).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2});
}
const products = [];

//capturo el formulario y creo el evento submit
let formulario = document.getElementById('formulario')
formulario.addEventListener("submit", async (validar) => {
    try {
        validar.preventDefault();
        
        let res = await fetch("JS/modules/products.json"),
            prods = await res.json();
        //ARS
        const subtotalHtml = subtotalPerPag(selPages.value , prods[0].price);
        const subtotalCss = subtotalPerPag(selCss.value , prods[1].price);
        const subtotalJS = subtotalPerPag(1 , prods[2].price);
        const total = subtotalHtml + subtotalCss + subtotalJS;
        const iva = total * 1.21
        console.log(subtotalHtml, subtotalCss, subtotalJS, total, iva);
        //USD
        const htmlUsd = subtotalHtml / 135;
        const cssUsd = subtotalCss / 135;
        const jsUsd = subtotalJS / 135;
        const tUsd = htmlUsd + cssUsd + jsUsd;
        const ivaUsd = tUsd * 1.21
            
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
            <p>Html x${selPages.value} páginas: ${LOCALSTRING(subtotalHtml)}/ ${Math.ceil(htmlUsd)}USD</p>
            <p>Css x${selCss.value} pantallas responsive: ${LOCALSTRING(subtotalCss)}ARS/ ${Math.ceil(cssUsd)}USD</p>
            <p>JavaScript: ${LOCALSTRING(subtotalJS)}ARS/ ${Math.ceil(jsUsd)}USD</p>
            <p>subtotal sin iva: ${LOCALSTRING(total)}ARS/ ${Math.ceil(tUsd)}USD</p>
            <p>Total con iva : ${LOCALSTRING(iva)}ARS/ ${Math.ceil(ivaUsd)}USD</p>
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
        const btnSubmit = document.createElement('button');
        btnSubmit.textContent = 'submit';
        btnSubmit.onclick = () =>{
                
                let data = new datos (inNombre.value, inApellido.value, inTel.value, inEmail.value, selPais.options[selPais.selectedIndex].text );
                if(checkboxHtml.checked == true){
                    // html['cantidad'] = selPages.value;
                    products.push(`${prods[0].name} pages: ${selPages.value}`);
                    data['product'] = products;
                }if(checkboxCss.checked == true){
                    // css['cantidad'] = selCss.value;
                    products.push(`${prods[1].name} pages: ${selCss.value}`);
                    data['product'] = products;
                }if(jsCheckbox.checked == true){
                    products.push(`${prods[2].name}: yes`);
                    data['product'] = JSON.stringify(products) ;
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
                        const dataStorage = JSON.stringify(data);
                        localStorage.setItem(`${data.nombre} ${data.apellido}`, dataStorage);
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

        div.appendChild(btnRemove);
        div.appendChild(btnSubmit);
        main.appendChild(div);
        } catch (err) {}
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
