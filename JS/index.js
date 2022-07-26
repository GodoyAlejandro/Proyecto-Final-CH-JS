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
const selPages = document.getElementById('qtyHtmlPages');
//    Css
const checkboxCss = document.getElementById('Css');
//    Css responsive
const selCss = document.getElementById('qtyCss');
//    javascript
const jsCheckbox = document.getElementById('Js');
//    textarea
const comment = document.getElementById('textarea');
//capturo el contenedor
const main = document.querySelector('#conteiner main');
//aside
const aside = document.querySelector('.aside1');

const viewTickets = document.querySelector('.tickets');

//creo un elemento que va a servir para mostrar en pantalla lo ingresado
const div = document.createElement('div');

//validacion de formulario
const validation = new JustValidate('#formulario');


//variable de Luxon
let DateTime = luxon.DateTime;

//almacenar los datos
class datos{
    constructor(nombre, apellido, telefono, email, pais, presupuesto){
        this.nombre = nombre,
        this.apellido = apellido,
        this.pais = pais,
        this.telefono = telefono,
        this.email = email,
        this.presupuesto = presupuesto
    }

}

function LOCALSTRING (v) {
    return (v).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2})
}
            
const dt = DateTime.now();

//creo dos botones afuera del evento de la funcion para para que sean variables globales
const btnRemove = document.createElement('button');
btnRemove.textContent = "Remove";
const removeForm = () =>{                
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
            presupuesto.remove();
            aside.style.height = '100vh';
            Swal.fire({
                title: 'Formulario reseteado correctamente',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            })
        }
    })
    
}
const btnRemoveTicket = document.querySelector('.remove-tickets');
const cleanAsideAndLocalStorage = () =>{
    if (localStorage.getItem("ticket") === null){
        Swal.fire({
            title: 'No hay ningun ticket para eliminar',
            confirmButtonText: 'ok',
        })
    }else{
        Swal.fire({
            title: '¿eliminar tickets?',
            text: 'elos tickets se eliminaran y no se podran recuperar hasta que nos contactemos con usted',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'cancelar',
            confirmButtonText: 'borrar',
            confirmButtonColor: '#FF0000'
        }).then((r) =>{
            if(r.isConfirmed){
                localStorage.removeItem('ticket');
                viewTickets.remove();
                Swal.fire({
                    title: 'los tickets se elimaron exitosamente',
                    confirmButtonText: 'ok',
                    timer: 3000,
                    icon: 'success'
                })
            }
        })
    }

}

const btnSubmit = document.createElement('button');
btnSubmit.textContent = 'submit';

const submitForm = async (v) =>{
    v.preventDefault();
    const totalService = await calculateTotalService(); 
    const totalUsdService = calculateUsdTotalService(totalService);

    //este obj se va a guardar en el localStorage y tambien sirve para simplificar las propiedades del objeto a enviar por mail
    let data = new datos (inNombre.value, inApellido.value, inTel.value, inEmail.value, selPais.options[selPais.selectedIndex].text, ticket );

    console.log("data => ", data);
            
    //obj para el mailJs
    let sendMail = {
        to_name : `${data.nombre + data.apellido}`,
        email : `${data.email}`,
        tel: `${data.telefono}`,
        pais: `${data.pais}`,
        comment: `${comment.value}`,
        message: ''
    }
    //copia del presupuesto
    if(isAllServicesSelected()){
        sendMail.message = `<h1>Presupuesto entregado</h1>
        <p>Fecha: <strong>${dt.toLocaleString(DateTime.DATE_SHORT)}</strong></p>
        <p>Html x${selPages.value} páginas: ${LOCALSTRING(totalService.subtotalHtml)}/ ${Math.ceil(totalUsdService.htmlUsd)}USD</p>
        <p>Css x${selCss.value} pantallas responsive: ${LOCALSTRING(totalService.subtotalCss)}ARS/ ${Math.ceil(totalUsdService.cssUsd)}USD</p>
        <p>JavaScript: ${LOCALSTRING(totalService.subtotalJS)}ARS/ ${Math.ceil(totalUsdService.jsUsd)}USD</p>
        <p>subtotal sin iva: ${LOCALSTRING(totalService.total)}ARS/ ${Math.ceil(totalUsdService.tUsd)}USD</p>
        <p>Total con iva : ${LOCALSTRING(totalService.iva)}ARS/ ${Math.ceil(totalUsdService.ivaUsd)}USD</p>
        <p>este presupuesto se mantendra una semana y media: <strong>${dt.plus({days: 11}).toLocaleString(DateTime.DATE_SHORT)}</strong></p>`;
    }else{
        sendMail.message = 'no se realizo ningun presupuesto'
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
            const tickets = JSON.parse(localStorage.getItem('ticket')) || [];
            tickets.push(data);
            localStorage.setItem(`ticket`, JSON.stringify(tickets));
            updateViewTickets();
            emailjs.send("service_tbu0e1w", "template_mjj4b36", sendMail)
                .then( (r) =>{
                    Swal.fire({
                        title: 'El formulario se ha enviado correctamente',
                        text: 'el formulario se envio',
                        confirmButtonText: 'ok',
                        timer: 3000,
                        icon: 'success'
                    })
                }), (err) =>{
                        Swal.fire({
                            title: 'ha ocurrido un error',
                            text: `${err}`,
                            confirmButtonText: 'ok',
                            timer: 3000,
                            icon: 'error'
                        })};
            presupuesto.remove();
            aside.style.height = '100vh';
            conteiner.style.gridTemplateRows = '1fr 10fr 1fr';
            selPages.style.display = 'none';
            selCss.style.display = 'none';
            formulario.reset();
            }else if(R.isDismissed){
                Swal.fire({
                    title: 'Tomese su tiempo',
                    confirmButtonText: 'ok',
                    timer: 3000,
                    icon: 'info'
                })}
    })
}

const updateViewTickets = () => {
    const tickets = JSON.parse(localStorage.getItem('ticket')) || [];
    viewTickets.innerHTML = ''
    for (const i of tickets) {
        const styleTicket = `<style type="text/css"> 
        section{border-style: dotted; height: display:flex; flex-direction:column; border-radius: 1rem}
        section .title{border-bottom: 3px dotted black; margin: 1rem 2rem .5rem 2rem}
        section .title h1, h2{text-align: center; text-transform: uppercase; font-size: 2rem}        
        section p{font-size: 2rem; padding-left: .5rem; margin: .5rem; text-align: left}</style>`
        const divA = document.createElement('div');
        console.log(i);
        divA.innerHTML = `<h4> ticket realizado por ${i.nombre} ${i.apellido} </h4>
                        <template id="my-template">
                        <swal-html class="swal-html"> <section>${i.presupuesto}
                        ${styleTicket}</section>
                        </swal-html>
                        <swal-button type="confirm">ok</swal-button>
                        <swal-param name="customClass" value='{ "popup": "my-popup" }'/>
                        </template>`
        const btnTicket = document.createElement('button');
            btnTicket.textContent = "show content";
            btnTicket.classList.add('showTicket');
            divA.appendChild(btnTicket);
            btnTicket.onclick =() => {
                Swal.fire({
                    template: '#my-template',
                })
            }
        viewTickets.appendChild(divA)
        }
    
    }
    

updateViewTickets();