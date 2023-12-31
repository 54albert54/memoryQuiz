const mainContainer = document.querySelector(".main-container");
const mensaje = document.getElementById("anuncio2");
const mensajeG = document.getElementById("anuncio");
const welcomeArea = document.getElementById("anuncio");
const alertShow = document.querySelector(".main-alert");
const mensajeVictoria = document.querySelector(".mensaje");
const titleAlert = document.getElementById("alertTitle");

const letras = [
  "letraa",
  "letrab",
  "letrac",
  "letrad",
  "letrae",
  "letraf",
  "letrag",
  "letrah",
  "letrai",
  "letraj",
  "letrak",
  "letral",
  "letram",
  "letran",
  "letrao",
  "letrap",
  "letraq",
  "letrar",
  "letras",
  "letrat",
  "letrau",
  "letrav",
  "letraw",
  "letrax",
  "letray",
  "letraz",
];
let cards;
let lastShow;
let currentShow;
let lastCard;
let oldId;
let EncuentraCarta;
let pares = 0;
let limitPeers;
const cardTemplate = `
<div class="card-front"> </div>
<div class="card-back"></div>
`;

let machArrayObject = {};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const pintarCartas = (array) => {
  for (let i = 0; i < array.length; i++) {
    const div = document.createElement("div");
    div.classList.add("card");

    div.classList.add(`${i}`);
    div.innerHTML = `
  <div class="card-front ${array[i]}""> </div> 
  <div class="card-back ></div>
  `;

    mainContainer && mainContainer.appendChild(div); //en este primero se mostrara como quedaron
  }
  setTimeout(() => {
    mainContainer.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      machArrayObject = { ...machArrayObject, [i]: array[i] };
      const div = document.createElement("div");
      div.classList.add("card");
      div.id = `${i}`;
      div.classList.add(`${i}`);
      div.innerHTML = `
    <div class="card-front"> </div>
    <div class="card-back  ${array[i]}"></div>
    `;
      mainContainer.appendChild(div); // ya en este si se empieza el juego
    }
  }, 2000);
  setup();
};
const setup = () => {
  setTimeout(() => {
    cards = document.querySelectorAll(".card");
    cards.forEach((card) =>
      card.addEventListener("click", (e) => {
        const selectCart = document.getElementById(`${e.currentTarget.id}`);
        EncuentraCarta = selectCart.classList.contains("win");
        selectCart.classList.add("cardVolteada");
        let newId = selectCart.id; //esto es para evitar que si tocas dos veces la misma carta el juego te detecte mach
        currentShow = machArrayObject[selectCart.id];
        //console.log(machArrayObject);

        if (!EncuentraCarta) {
          //se verifica que la carta ya no a sido descubierta

          if (oldId != newId) {
            //se verifica que la carta no sea la ultima que se selecciona

            if (lastShow == currentShow) {
              // se verifica que la ultima selección y la actual coincidan
              pares++;
              mensajeG.innerHTML = `Pares ${pares} of ${limitPeers}`;
              mensaje.innerHTML = "we have a mach";
              lastCard.classList.add("win"); // se le agrega esto para que no pueda ser volteada si pasa el tiempo
              selectCart.classList.add("win");
              lastCard.classList.add("cardVolteada");
              //como ganar el juego
              if (pares == limitPeers) {
                mensajeVictoria.classList.remove("hidden");
                setTimeout(() => {
                  alertShow.classList.remove("hidden");
                  alertTitle.innerHTML = "you want play again!";
                  // mensajeVictoria.classList.add("hiddesn");
                }, 2000);
              }
            } else {
              mensaje.innerHTML = "continue search";
              oldId = newId;
              lastShow = currentShow;
              lastCard = selectCart;
              setTimeout(() => {
                //con esto verifico que la carta no se a encontrado el par
                lastCard.classList.contains("win")
                  ? NaN
                  : selectCart.classList.remove("cardVolteada");
              }, 1000);
            }
          } else {
            mensaje.innerHTML = "you need choose other card";
            selectCart.classList.remove("cardVolteada");
          }
        }
      })
    );
  }, 3000);
};
const startGame = (mode) => {
  pares = 0;
  mensajeG.innerHTML = `Pares ${pares} of ${limitPeers}`;
  mensaje.innerHTML = "";
  mainContainer.innerHTML = " ";
  alertShow.classList.add("hidden");
  const newArray = shuffleArray(letras); //se cambia los index al array
  const level = newArray.slice(0, mode); //6combos 20 9combos 17   12combos 14
  const newA = []; //con este es el array que se jugara
  for (let i = 0; i < level.length; i++) {
    newA.push(level[i], level[i]); // se enviaran dos veces para que haga una pareja de cada elemento
  }
  shuffleArray(newA); //se mezcla nuevamente
  limitPeers = newA.length / 2;
  mensajeG.innerHTML = `Pares ${pares} of ${limitPeers}`;
  pintarCartas(newA); // se manda a pintar
};
