//funciones que se pueden ejecutar antes y despues de validar el formulario
//Darkmode Function
const darkMode = () => {
    conteiner.classList.toggle('dark')        
}
//desplegar Selects en el formulario
function toggleSelect(checkbox, select,rows){
    checkbox.addEventListener('click', () =>{
        if(checkbox.defaultChecked){
            select.style.display = "none";
            awarnesNote.style.display = "none";
        }
        else if(checkbox.checked){
            select.style.display = "block";
            awarnesNote.style.display = "block";
            conteiner.style.gridTemplateRows = rows;
            aside.style.height = '120vh'
        }else{
            select.style.display = "none";
            awarnesNote.style.display = "none";
            select.value = 0;  
            aside.style.height = '110vh'
            conteiner.style.gridTemplateRows = '1fr 11fr 1fr';
        }
    })
}
