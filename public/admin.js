/* MENU - página ativa */
const currentPage = location.pathname;
const menuItens = document.querySelectorAll("header .links a")

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

/* FORM - Cadastro e edição de receitas */

//adiciona novo ingrediente
function addIngredient() { 
	const ingredients = document.querySelector("#ingredients"); 
	const fieldContainer = document.querySelectorAll(".ingredient"); 

	const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true); 

    if (newField.children[0].value == "") return false; 
	
	newField.children[0].value = ""; 
	ingredients.appendChild(newField);
}

document 
	.querySelector(".add-ingredient") 
	.addEventListener("click", addIngredient);

//adiciona novo passo    
function addStep() { 
    const step = document.querySelector("#preparation"); 
    const fieldContainer = document.querySelectorAll(".step"); 

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true); 
    
    if (newField.children[0].value == "") return false; 
    
    newField.children[0].value = ""; 
    step.appendChild(newField);
}

document
    .querySelector(".add-step")
    .addEventListener("click", addStep);

//acessar dados do input
/*let time = null
function handleKeyUp(event) {
    document.getElementById(event).value

    clearTimeout(time)

    time = setTimeout(() => {
        console.log(event.target.value)
    }, 10000)

}

document.querySelector('input')
        .addEventListener("keyup", handleKeyUp)
*/

/*<<< FUNCTIONS >>>*/
function toHide(var1, var2) {
    if (var1.innerHTML == 'ESCONDER') {
        var2.classList.add('disable')
        var1.innerHTML = 'MOSTRAR'
    } else {
        var2.classList.remove('disable')
        var1.innerHTML = 'ESCONDER'
    }
}
