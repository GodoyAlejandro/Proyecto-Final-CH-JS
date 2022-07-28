//variables que se usaran a lo largo del codigo
//elementos generales del DOM
//contenedor body>div
const conteiner = document.getElementById('conteiner'),
//main body>div>main
       main = document.querySelector('#conteiner main'),
//aside body>div>aside
       aside = document.querySelector('.aside1'),
//button body>div>aside>button
       btnRemoveTicket = document.querySelector('.remove-tickets'),
//div body>aside>div
       viewTickets = document.querySelector('.tickets'),
//bloque de formulario
//    nombre
       inputName = document.getElementById('nombre'),
//    apellido
       inputLastName = document.getElementById('apellido'),
//    telefono
       inputPhone = document.getElementById('tel'),
//    Pais
       selectedCountry = document.getElementById('pais'),
//    mail
       inputEmail = document.getElementById('email'),
//    HTML
       checkboxHtml = document.getElementById('HTML'),
//    HTML paginas
       quantityHtmlPages = document.getElementById('qtyHtmlPages'),
//    Css
       checkboxCss = document.getElementById('Css'),
//    Css responsive
       quantityCssResponsive = document.getElementById('qtyCss'),
//    comentario sobre los select
       awarnesNote = document.querySelector('.note-paragraph'),
//    javascript
       jsCheckbox = document.getElementById('Js'),
//    textarea
       comment = document.getElementById('textarea');

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