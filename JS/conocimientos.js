// html
const htmlCheckbox = document.getElementById('HTML');
// css
const cssCheckbox = document.getElementById('Css');

// Cantidad de paginas html a desarrollar
const qtyHtmlPagesSel = document.getElementById('qtyHtmlPages');

// Cantidad de css a desarrollar
const qtyCssSel = document.getElementById('qtyCss');

//desplegar los select de HTML/Css
function asignarSelect(checkbox, select, rows){
    checkbox.addEventListener('click', () =>{
        if(checkbox.defaultChecked){
            select.style.display = "none";
        }
        else if(checkbox.checked){
            select.style.display = "block";
            conteiner.style.gridTemplateRows = rows;
            aside.style.height = '110vh'
        }else{
            select.style.display = "none";
            select.value = 0;
            aside.style.height = '100vh'
            conteiner.style.gridTemplateRows = '1fr 10fr 1fr';
        }
    })
}

const isAllServicesSelected = () => {
    return htmlCheckbox.checked && cssCheckbox.checked && jsCheckbox.checked;
}

console.log("htmlCheckbox => ", htmlCheckbox)
console.log("qtyHtmlPagesSel => ", qtyHtmlPagesSel)
asignarSelect(htmlCheckbox, qtyHtmlPagesSel, '1fr 11fr 1fr')
asignarSelect(cssCheckbox, qtyCssSel, '1fr 11fr 1fr')
