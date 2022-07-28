//funcion ejecutable despúes de validado del form, mostrara en el DOM el resultado
const submitForm = async () => {
    try {
        const totalService = await calculateTotalService(); 
        const usdValue = await usd()
        const totalUsdService = calculateUsdTotalService(totalService, usdValue);
        if(isAllServicesSelected()){
            aside.style.height = '280vh';
            conteiner.style.gridTemplateRows = '1fr 28fr 1fr';
            disableSelect(true)
            //const div
            ticket.style.height = '155vh';
            ticketContent = `<div class="title"><h1>Estos son los datos que ingresaste para que nos contactemos con usted</h1></div>
            <p>Fecha: <strong>${dateTimeNow.toLocaleString(DateTime.DATE_SHORT)}</strong></p>
            <p>Nombre Completo: <strong>${inputName.value} ${inputLastName.value}</strong></p>
            <p>pais de residencia: <strong>${selectedCountry.options[selectedCountry.selectedIndex].text}</strong></p>
            <p>telefono celular: <strong>${inputPhone.value}</strong></p>
            <p>e-mail: <strong>${inputEmail.value}</strong></p>
            <div class="title"><h2>Aqui esta su presupuesto</h2></div>
            <p>Html x${quantityHtmlPages.value} páginas: ${convertPrice(totalService.subtotalHtml)}/ ${Math.ceil(totalUsdService.htmlUsd)}USD</p>
            <p>Css x${quantityCssResponsive.value} pantallas responsive: ${convertPrice(totalService.subtotalCss)}ARS/ ${Math.ceil(totalUsdService.cssUsd)}USD</p>
            <p>JavaScript: ${convertPrice(totalService.subtotalJS)}ARS/ ${Math.ceil(totalUsdService.jsUsd)}USD</p>
            <p>subtotal sin iva: ${convertPrice(totalService.total)}ARS/ ${Math.ceil(totalUsdService.tUsd)}USD</p>
            <p>Total con iva : ${convertPrice(totalService.iva)}ARS/ ${Math.ceil(totalUsdService.ivaUsd)}USD</p>
            <p>este presupuesto se mantendra una semana y media: <strong>${dateTimeNow.plus({days: 11}).toLocaleString(DateTime.DATE_SHORT)}</strong></p>`
            ticket.innerHTML = ticketContent

        }else{
            aside.style.height = '210vh';
            conteiner.style.gridTemplateRows = '1fr 21fr 1fr';
            checkboxHtml.checked = false;
            checkboxCss.checked = false;
            jsCheckbox.checked = false;
            disableSelect(true);
            quantityCssResponsive.style.display = "none";
            quantityHtmlPages.style.display = "none";
            awarnesNote.style.display = "none";
            ticket.style.height = '110vh';
            ticketContent =`<div class="title"><h1>Estos son los datos que ingresaste para que nos contactemos con usted</h1></div>
            <p>Fecha: <strong>${dateTimeNow.toLocaleString(DateTime.DATE_SHORT)}</strong></p>
            <p>Nombre Completo: <strong>${inputName.value} ${inputLastName.value}</strong></p>
            <p>pais de residencia: <strong>${selectedCountry.options[selectedCountry.selectedIndex].text}</strong></p>
            <p>telefono celular: <strong>${inputPhone.value}</strong></p>
            <p>e-mail: <strong>${inputEmail.value}</strong></p>
            <div class="title"><h2>Debido a la poca info que se recopila de las opciones seleccionadas, el presupuesto a mostrar puede ser muy inexacto, por eso mismo nos contactaremos a la brevedad</h2></div>`
            ticket.innerHTML = ticketContent
        }
        ticket.appendChild(btnRemove);
        ticket.appendChild(btnSubmit);
        main.appendChild(ticket);
    } catch (err) {
        Swal.fire({
            title: 'algo sucedio mal',
            text: `${err}`,
            confirmButtonText: 'ok',
            icon: 'error'
        })
    }
}
//btnRemoveForm funcion para resetear por completo el formulario
const removeTicket = () =>{                
    Swal.fire({
        title: '¿Esta seguro de que desea remover el contenido del formulario?',
        icon: 'question',
        text: 'Al presionar "ok", el formulario será reseteado',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
    }).then((R) =>{
        if(R.isConfirmed){
            conteiner.style.gridTemplateRows = '1fr 10fr 1fr';
            disableSelect(false)
            quantityCssResponsive.style.display = "none";
            quantityHtmlPages.style.display = "none";
            awarnesNote.style.display = "none";
            formulario.reset();
            ticket.remove();
            aside.style.height = '110vh';
            Swal.fire({
                title: 'Formulario reseteado correctamente',
                icon: 'success',
                timer: 3000,
            })
        }
    })
    
}
//submit el form para enviarlo via mail y almacenar el ticket en LocalStorage para visualizarlo en el aside con updateViewTickets
const sendTicket = async (v) =>{
    v.preventDefault();
    const totalService = await calculateTotalService(); 
    const totalUsdService = calculateUsdTotalService(totalService);

    //este obj se va a guardar en el localStorage y tambien sirve para simplificar las propiedades del objeto a enviar por mail
    let data = new datos (inputName.value, inputLastName.value, inputPhone.value, inputEmail.value, selectedCountry.options[selectedCountry.selectedIndex].text, ticketContent );

    //obj para el mailJs
    let sendMail = {
        to_name : `${data.name + data.lastName}`,
        email : `${data.email}`,
        tel: `${data.phone}`,
        pais: `${data.country}`,
        comment: `${comment.value}`,
        message: ''
    }
    //copia del presupuesto
    if(isAllServicesSelected()){
        sendMail.message = `<h1>Presupuesto entregado</h1>
        <p>Fecha: <strong>${dateTimeNow.toLocaleString(DateTime.DATE_SHORT)}</strong></p>
        <p>Html x${quantityHtmlPages.value} páginas: ${convertPrice(totalService.subtotalHtml)}/ ${Math.ceil(totalUsdService.htmlUsd)}USD</p>
        <p>Css x${quantityCssResponsive.value} pantallas responsive: ${convertPrice(totalService.subtotalCss)}ARS/ ${Math.ceil(totalUsdService.cssUsd)}USD</p>
        <p>JavaScript: ${convertPrice(totalService.subtotalJS)}ARS/ ${Math.ceil(totalUsdService.jsUsd)}USD</p>
        <p>subtotal sin iva: ${convertPrice(totalService.total)}ARS/ ${Math.ceil(totalUsdService.tUsd)}USD</p>
        <p>Total con iva : ${convertPrice(totalService.iva)}ARS/ ${Math.ceil(totalUsdService.ivaUsd)}USD</p>
        <p>este presupuesto se mantendra una semana y media: <strong>${dateTimeNow.plus({days: 11}).toLocaleString(DateTime.DATE_SHORT)}</strong></p>`;
    }else{
        sendMail.message = 'no se realizo ningun presupuesto'
    }
                
    Swal.fire({
        title: '¿Desea enviar los datos del formulario?',
        text: 'el ticket generado será enviado por email y nos counicaneros con usted en la brevedad',
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
            disableSelect(false);
            quantityCssResponsive.style.display = "none";
            quantityHtmlPages.style.display = "none";
            awarnesNote.style.display = "none";
            emailjs.send("service_tbu0e1w", "template_mjj4b36", sendMail)
                .then( (r) =>{
                    Swal.fire({
                        title: 'El ticket se ha enviado correctamente',
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
            ticket.remove();
            aside.style.height = '110vh';
            conteiner.style.gridTemplateRows = '1fr 11fr 1fr';
            quantityHtmlPages.style.display = 'none';
            quantityCssResponsive.style.display = 'none';
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
//limpia el aside y elimina los elementos del aside
const cleanAsideAndLocalStorage = () =>{
    if (localStorage.getItem("ticket") === null){
        Swal.fire({
            title: 'No hay ningun ticket para eliminar',
            confirmButtonText: 'ok',
        })
    }else{
        Swal.fire({
            title: '¿eliminar tickets?',
            text: 'estos tickets se eliminaran y no se podran recuperar hasta que nos contactemos con usted',
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
//funcion que almacena los tickets e el aside
const updateViewTickets = () => {
    const tickets = JSON.parse(localStorage.getItem('ticket')) || [];
    viewTickets.innerHTML = '';
    for (const i of tickets) {
        console.log(i.name);
        const styleTicket = `<style type="text/css"> 
        section{border-style: dotted; height: display:flex; flex-direction:column; border-radius: 1rem}
        section .title{border-bottom: 3px dotted black; margin: 1rem 2rem .5rem 2rem}
        section .title h1, h2{text-align: center; text-transform: uppercase; font-size: 2rem}        
        section p{font-size: 2rem; padding-left: .5rem; margin: .5rem; text-align: left}</style>`
        const divA = document.createElement('div');
        divA.innerHTML = `<h4> ticket realizado por ${i.name} ${i.lastName} </h4>
                        <template id="my-template">
                        <swal-html> <section>${i.ticket}
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