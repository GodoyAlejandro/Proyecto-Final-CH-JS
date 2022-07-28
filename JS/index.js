//validacion que funciona como 
validation
.addField('#nombre', [
    {
        rule: 'required',
        errorMessage : 'el campo es requerido'
    },
    {
        rule: 'customRegexp',
        value : /^[a-zA-Z\s]*$/,
        errorMessage: 'letras, no numeros'
    },
    {
        rule : 'minLength',
        value : 5,
        errorMessage : 'el nombre es muy corto'
    },
    {
        rule : 'maxLength',
        value : 30,
        errorMessage : 'el nombre es muy corto'
    },    
]).addField('#apellido', [
    {
        rule: 'required',
        errorMessage : 'el campo es requerido'
    },
    {
        rule: 'customRegexp',
        value : /^[a-zA-Z\s]*$/,
        errorMessage: 'letras, no numeros'
    },
    {
        rule : 'minLength',
        value : 3,
        errorMessage : 'el apellido es muy corto'
    },
    {
        rule : 'maxLength',
        value : 15,
        errorMessage : 'el apellido es muy largo'
    },    
]).addField('#tel', [
    {
        rule: 'required',
        errorMessage: 'campo requerido'
    },
    {
        rule: 'number',
        errorMessage : 'debes ingresar un numero, no una letra'
    },
    {
        rule : 'minLength',
        value : 8,
        errorMessage : 'el numero es muy corto'
    },
    {
        rule : 'maxLength',
        value : 10,
        errorMessage : 'el numero es muy largo'
    },
]).addField('#email',[
    {
        rule: 'required',
        errorMessage: 'el email es requerido'
    },
    {
        rule: 'email',
        errorMessage:'el email es invalido'
    }
]).addField('#pais',[
    {
        rule: 'required',
        errorMessage: 'por favor selecciona al menos uno'
    }
]).onFail((e)=>{
    Swal.fire({
        title: 'el form esta mal',
        confirmButtonText: 'ok',
        icon: 'info'
    })
}).onSuccess((e) => {
    Swal.fire({
        title: 'el formulario se esta procesando',
        text: 'esto no tardara mas de unos segundos',
        icon: 'warning',
        iconColor: 'green',
        showConfirmButton: false,
        timer: 1500,
    })
     submit();
})

//eventos 
btnDarkMode.addEventListener('click', darkMode) 
btnRemove.addEventListener('click', removeForm);
btnSubmit.addEventListener('click', submitForm);
btnRemoveTicket.addEventListener('click', cleanAsideAndLocalStorage);

