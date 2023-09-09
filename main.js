const mainContainer = document.querySelector('.main-container')
const mensaje = document.getElementById('anuncio2')
const mensjeG = document.getElementById('anuncio')
const welcomeArea = document.getElementById('anuncio')
const alertShow = document.querySelector('.main-alert')

const titleAlert = document.getElementById('alertTitle')
const alertButon = document.getElementById('alertButon')

let cards ;
let lastShow;
let currentShow;
let lastCard;
let oldId;
let pares = 0
mensjeG.innerHTML = `pares ${pares} de 6`
const cardTemplate = `
<div class="card-front"> </div>
<div class="card-back"></div>
`
const frutas = ["aguacate","banana","cereza","manzana","piña","sandia","aguacate","banana","cereza","manzana","piña","sandia"]
let machArrayObject ={}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

frutas
shuffleArray(frutas);



const pintarCartas =(frutas)=>{
  
for (let i = 0 ; i < 12 ;i++){
  const div = document.createElement('div');
  div.classList.add('card')
  
  div.classList.add(i)
  div.innerHTML = `
  <div class="card-front ${frutas[i]}""> </div> 
  <div class="card-back ></div>
  `
  mainContainer.appendChild(div) //en este primero se mostrara como quedaron
}
setTimeout(()=>{
  mainContainer.innerHTML = ""
  for (let i = 0 ; i < 12 ;i++){
    machArrayObject={...machArrayObject,
    [i]:frutas[i]}
    const div = document.createElement('div');
    div.classList.add('card')
    div.id=i
    div.classList.add(i)
    div.innerHTML = `
    <div class="card-front"> </div>
    <div class="card-back  ${frutas[i]}"></div>
    `
    mainContainer.appendChild(div) // ya en este si se empieza el juego
   
  }



},2000)

stup()
}
const stup = () =>{
setTimeout(() => {
  cards = document.querySelectorAll('.card')
  cards.forEach(card =>
    card.addEventListener('click',(e)=>{
      const selectCart = document.getElementById(`${e.currentTarget.id}`)
      selectCart.classList.add('cardVolteada')
      let newId =selectCart.id //esto es para evitar que si tocas dos veces la misma carta el juego te detecte masch
      currentShow = machArrayObject[selectCart.id];
      if (oldId !=newId){
      if (lastShow == currentShow){
         pares++
        mensjeG.innerHTML = `pares ${pares} de 6`
        mensaje.innerHTML ='Tenemos masch';
        lastCard.classList.add('win') // se le agrega esto para que no pueda ser volteada si pasa el tiempo
        lastCard.classList.add('cardVolteada')
        if (pares == 6){
          alertShow.classList.remove('hiden')
          alertTitle.innerHTML = "Felicidades "
          alertButon.innerHTML = "Volver a Jugar"
        }
      }else {
      mensaje.innerHTML ='Seguir buscando';
      oldId = newId
      lastShow = currentShow
      lastCard = selectCart
      setTimeout(() => {
        //con esto verifico que la carta no se a decubierto el par
        lastCard.classList.contains('win')?NaN
        :selectCart.classList.remove('cardVolteada')
      }, 1000);
    }
}else{
  mensaje.innerHTML ='Ya elige otra';
  selectCart.classList.remove('cardVolteada')
      }
    })
  )

}, 3000);

}
const startGame = ()=>{
  mainContainer.innerHTML = " "
  
  alertShow.classList.add('hiden')
  pintarCartas(frutas)  
}



