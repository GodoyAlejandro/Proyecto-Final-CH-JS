// js
const presupuesto = document.createElement('div');
// formulario
const formulario = document.getElementById('formulario')

presupuesto.classList.add('presupuesto');

function calculateTotalByService(itemService, price){
    return price * itemService;
}

const findPriceService = async (nameService) => {
    const res = await fetch("JS/modules/products.json"); //fetch a los productos del archivo .json local
    const prods = await res.json();
    return prods.find(p => p.name == nameService).price;
}

const calculateTotalService = async () => {
    const priceHtmlService = await findPriceService('html');
    const priceCssService = await findPriceService('css');
    const priceJavascript = await findPriceService('javascript');

    //ARS
    const subtotalHtml = calculateTotalByService(selPages.value , priceHtmlService);
    const subtotalCss = calculateTotalByService(selCss.value , priceCssService);
    const subtotalJS = calculateTotalByService(1 , priceJavascript);
    const total = subtotalHtml + subtotalCss + subtotalJS;

    return {
        subtotalHtml,
        subtotalCss,
        subtotalJS,
        total,
        iva: total * 1.21
    }
}

const calculateUsdTotalService = (totalService) => {
    const dolarPrice = 135;
    const htmlUsd = totalService.subtotalHtml / dolarPrice;
    const cssUsd = totalService.subtotalCss / dolarPrice;
    const jsUsd = totalService.subtotalJS / dolarPrice;
    const tUsd = htmlUsd + cssUsd + jsUsd;

    return {
        htmlUsd,
        cssUsd,
        jsUsd,
        tUsd,
        ivaUsd: tUsd * 1.21   
    }
}

const submit = async (validar) => {
    try {
        console.log("Ejecuto submit");
        validar.preventDefault();
        const totalService = await calculateTotalService(); 
        console.log('totalService => ', totalService);
        const totalUsdService = calculateUsdTotalService(totalService);
        console.log('totalUsdService => ', totalUsdService);
        console.log('localstring ', LOCALSTRING(totalService.subtotalHtml));

        console.log('isAllServicesSelected() => ', isAllServicesSelected())

        if(isAllServicesSelected()){
            aside.style.height = '250vh';
            conteiner.style.gridTemplateRows = '1fr 25fr 1fr';
            //const div
            presupuesto.style.height = '145vh';
            ticket = `<div class="title"><h1>Estos son los datos que ingresaste para que nos contactemos con usted</h1></div>
            <p>Fecha: <strong>${dt.toLocaleString(DateTime.DATE_SHORT)}</strong></p>
            <p>Nombre Completo: <strong>${inNombre.value} ${inApellido.value}</strong></p>
            <p>pais de residencia: <strong>${selPais.options[selPais.selectedIndex].text}</strong></p>
            <p>telefono celular: <strong>${inTel.value}</strong></p>
            <p>e-mail: <strong>${inEmail.value}</strong></p>
            <div class="title"><h2>Aqui esta su presupuesto</h2></div>
            <p>Html x${selPages.value} páginas: ${LOCALSTRING(totalService.subtotalHtml)}/ ${Math.ceil(totalUsdService.htmlUsd)}USD</p>
            <p>Css x${selCss.value} pantallas responsive: ${LOCALSTRING(totalService.subtotalCss)}ARS/ ${Math.ceil(totalUsdService.cssUsd)}USD</p>
            <p>JavaScript: ${LOCALSTRING(totalService.subtotalJS)}ARS/ ${Math.ceil(totalUsdService.jsUsd)}USD</p>
            <p>subtotal sin iva: ${LOCALSTRING(totalService.total)}ARS/ ${Math.ceil(totalUsdService.tUsd)}USD</p>
            <p>Total con iva : ${LOCALSTRING(totalService.iva)}ARS/ ${Math.ceil(totalUsdService.ivaUsd)}USD</p>
            <p>este presupuesto se mantendra una semana y media: <strong>${dt.plus({days: 11}).toLocaleString(DateTime.DATE_SHORT)}</strong></p>`
            presupuesto.innerHTML = ticket 

        }else{
            aside.style.height = '210vh';
            conteiner.style.gridTemplateRows = '1fr 21fr 1fr';
            presupuesto.style.height = '110vh';
            ticket =`<div class="title"><h1>Estos son los datos que ingresaste para que nos contactemos con usted</h1></div>
            <p>Fecha: <strong>${dt.toLocaleString(DateTime.DATE_SHORT)}</strong></p>
            <p>Nombre Completo: <strong>${inNombre.value} ${inApellido.value}</strong></p>
            <p>pais de residencia: <strong>${selPais.options[selPais.selectedIndex].text}</strong></p>
            <p>telefono celular: <strong>${inTel.value}</strong></p>
            <p>e-mail: <strong>${inEmail.value}</strong></p>
            <div class="title"><h2>Debido a la poca info que se recopila de las opciones seleccionadas, el presupuesto a mostrar puede ser muy inexacto, por eso mismo nos contactaremos a la brevedad</h2></div>`
            presupuesto.innerHTML = ticket
        }
        presupuesto.appendChild(btnRemove);
        presupuesto.appendChild(btnSubmit);
        main.appendChild(presupuesto);
    } catch (err) {}
}

//eventos 
formulario.addEventListener("submit", submit);
btnRemove.addEventListener('click', removeForm);
btnSubmit.addEventListener('click', submitForm);
btnRemoveTicket.addEventListener('click', cleanAsideAndLocalStorage);


