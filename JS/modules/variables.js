//variables que se usaran a lo largo del codigo
//elementos generales del DOM
//contenedor body>div
const conteiner = document.getElementById('conteiner')
//main body>div>main
const main = document.querySelector('#conteiner main');
//aside body>div>aside
const aside = document.querySelector('.aside1');
//button body>div>aside>button
const btnRemoveTicket = document.querySelector('.remove-tickets');
//div body>aside>div
const viewTickets = document.querySelector('.tickets');
//bloque de formulario
//    nombre
const inputName = document.getElementById('nombre');
//    apellido
const inputLastName = document.getElementById('apellido');
//    telefono
const inputPhone = document.getElementById('tel');
//    Pais
const selectedCountry = document.getElementById('pais');
//    mail
const inputEmail = document.getElementById('email');
//    HTML
const checkboxHtml = document.getElementById('HTML');
//    HTML paginas
const quantityHtmlPages = document.getElementById('qtyHtmlPages');
//    Css
const checkboxCss = document.getElementById('Css');
//    Css responsive
const quantityCssResponsive = document.getElementById('qtyCss');
//    comentario sobre los select
const awarnesNote = document.querySelector('.note-paragraph');
//    javascript
const jsCheckbox = document.getElementById('Js');
//    textarea
const comment = document.getElementById('textarea');

//elementos creados para ser insertados al DOM via funciones
const div = document.createElement('div');
const btnRemove = document.createElement('button');
      btnRemove.textContent = "Remove";
const btnSubmit = document.createElement('button');
      btnSubmit.textContent = 'submit';
const btnDarkMode = document.getElementById('btn');
const ticket = document.createElement('div');
      ticket.classList.add('presupuesto');

//variables pertenecientes a las librerias
//Luxon para las fechas 
let DateTime = luxon.DateTime;
//genera la fecha del dia
const dateTimeNow = DateTime.now();
//validacion de formulario
const validation = new JustValidate('#formulario', {
    errorFieldCssClass: 'is-invalid',
    errorFieldStyle: {
      border: '1px solid red',
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: 'red',
      textDecoration: 'underlined',
    },
    focusInvalidField: false,
    lockForm: true,
    tooltip: {
      position: 'left',
    },
    errorContainer: '.errors-container',
  }
  );

updateViewTickets();
