const mainContainer = document.querySelector('.main-container')
const mensaje = document.getElementById('anuncio2')
const mensjeG = document.getElementById('anuncio')
const welcomeArea = document.getElementById('anuncio')
const alertShow = document.querySelector('.main-alert')

const titleAlert = document.getElementById('alertTitle')
const alertButon = document.getElementById('alertButon')

const frutas = ["aguacate","banana","cereza","manzana","piña","sandia","aguacate","banana","cereza","manzana","piña","sandia"]
// const letras = ['letraa','letrab','letrac','letrad','letrae','letraf','letrag','letrah','letrai','letraj','letrak','letral','letram','letran','letrao','letrap','letraq',
// 'letrar','letras','letrat','letrau','letrav','letraw','letrax','letray','letraz','letraa','letrab','letrac','letrad','letrae','letraf','letrag','letrah','letrai','letraj','letrak','letral','letram','letran','letrao','letrap','letraq',
// 'letrar','letras','letrat','letrau','letrav','letraw','letrax','letray','letraz',]

const letras = ['letraa','letrab','letrac','letrad','letrae','letraf','letrag','letrah','letrai','letraj','letrak','letral','letram','letran','letrao','letrap','letraq',
'letrar','letras','letrat','letrau','letrav','letraw','letrax','letray','letraz']
let cards ;
let lastShow;
let currentShow;
let lastCard;
let oldId;
let pares = 0
let limitPeers;
const cardTemplate = `
<div class="card-front"> </div>
<div class="card-back"></div>
`


let machArrayObject ={}


function shuffleArray(array) {
  
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      
  }
  return array
}


const pintarCartas =(array)=>{
  
for (let i = 0 ; i < array.length ;i++){
  const div = document.createElement('div');
  div.classList.add('card')
  
  div.classList.add(i)
  div.innerHTML = `
  <div class="card-front ${array[i]}""> </div> 
  <div class="card-back ></div>
  `
  mainContainer.appendChild(div) //en este primero se mostrara como quedaron
}
setTimeout(()=>{
  mainContainer.innerHTML = ""
  for (let i = 0 ; i < array.length ;i++){
    machArrayObject={...machArrayObject,
    [i]:array[i]}
    const div = document.createElement('div');
    div.classList.add('card')
    div.id=i
    div.classList.add(i)
    div.innerHTML = `
    <div class="card-front"> </div>
    <div class="card-back  ${array[i]}"></div>
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
      //console.log(machArrayObject);
      
      if (oldId !=newId){
      if (lastShow == currentShow){
        pares++
        mensjeG.innerHTML = `Pares ${pares} de ${limitPeers}`
        mensaje.innerHTML ='Tenemos masch';
        lastCard.classList.add('win') // se le agrega esto para que no pueda ser volteada si pasa el tiempo
        lastCard.classList.add('cardVolteada')

        if (pares == limitPeers){
          alertShow.classList.remove('hiden');
          alertTitle.innerHTML = "Felicidades";
          alertButon.innerHTML = "Volver a Jugar";
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
const startGame = (mode)=>{
  console.log(mode);
  
  pares= 0;
  mensjeG.innerHTML = `Pares ${pares} de ${limitPeers}`
  mensaje.innerHTML ='';
  mainContainer.innerHTML = " "
  alertShow.classList.add('hiden')
 const newArray = shuffleArray(letras);
 const a = newArray.slice(0,mode) //6combos 20 9combos 17   12combos 14
 const newA = []
 for(let i = 0;i < a.length ; i++){
  newA.push(a[i])
  newA.push(a[i])
  
 }
 
 shuffleArray(newA);
 limitPeers= newA.length/2
 mensjeG.innerHTML = `Pares ${pares} de ${limitPeers}`
  pintarCartas(newA)  
}







