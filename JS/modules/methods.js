//clase para crear los datos que se subiran al localStorage
class datos{
    constructor(name, lastName, phone, email, country, ticket){
        this.name = name,
        this.lastName = lastName,
        this.country = country,
        this.phone = phone,
        this.email = email,
        this.ticket = ticket
    }
}

//condicional para la creacion del ticket
const isAllServicesSelected = () => {
    return checkboxHtml.checked && checkboxCss.checked && jsCheckbox.checked;
}

//Redondear los precios del formulario
function convertPrice (v) {
    return (v).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits:2})
}

//funciones a utilizar en la logica del formulario para calcular presupuesto
//fetch a los productos del archivo .json local
const findPriceService = async (nameService) => {
    const res = await fetch("JS/modules/products.json"); 
    const prods = await res.json();
    return prods.find(p => p.name == nameService).price;
}

//fetch a dolarsi.com para actualizar el precio del dólar
const usd = async () =>{
    const apiUsd = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
    const getUsdApi = await fetch(apiUsd);
    const usdJSON = await getUsdApi.json();
    const dolarPrice = parseInt(usdJSON.find(d => d.casa.nombre == "Dolar Blue").casa.compra);
    return dolarPrice
}

//funcion para simplificar el contenido de la funcion submit()
function calculateTotalByService(itemService, price){
    return price * itemService;
}

//subtotal con los precios obtenidos de findPriceService y la operacion de calculateTotalByService
const calculateTotalService = async () => {
    const priceHtmlService = await findPriceService('html');
    const priceCssService = await findPriceService('css');
    const priceJavascript = await findPriceService('javascript');
    const subtotalHtml = calculateTotalByService((quantityHtmlPages.value + 1), priceHtmlService);
    const subtotalCss = calculateTotalByService((quantityCssResponsive.value + 1) , priceCssService);
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

//precio obtenido con calculateTotalService y usd
const calculateUsdTotalService = (totalService, usd) => {
    const htmlUsd = totalService.subtotalHtml / usd;
    const cssUsd = totalService.subtotalCss / usd;
    const jsUsd = totalService.subtotalJS / usd;
    const tUsd = htmlUsd + cssUsd + jsUsd;
    return {
        htmlUsd,
        cssUsd,
        jsUsd,
        tUsd,
        ivaUsd: tUsd * 1.21   
    }
}

