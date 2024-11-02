//Handle Functions

const query = (el) => document.querySelector(el);
const queryAll = (el) => document.querySelectorAll(el);

//Initial Data

let table = {
  a1: "",
  a2: "",
  a3: "",

  b1: "",
  b2: "",
  b3: "",

  c1: "",
  c2: "",
  c3: "",
};

let player = ``;
let warning = ``;
let playing = false;

//Functional
const reset = () => {
  warning = "";

  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "x" : "o";

  for (let i in table) {
    table[i] = "";
  }

  playing = true;

  query(".vez").innerHTML = player.toUpperCase();
  queryAll(".item").forEach((item) => (item.innerHTML = ""));
  query(".resultado").innerHTML = "";
};

const play = (e) => {
  if (playing) {
    let item = e.target.getAttribute("data-item");

    if (table[item] === "") {
      e.target.innerHTML = player;
      table[item] = player; //Att object
      player = player === "x" ? "o" : "x"; //Toggle player
      query(".vez").innerHTML = player.toUpperCase();
    }

    checkGame();
  } else {
    alert("O jogo foi finalizado.");
  }
};

const checkGame = () => {
  if (checkWinnerFor("x")) {
    warning = `O "x" venceu!`;
    query(".resultado").innerHTML = warning;
    playing = false;
  } else if (checkWinnerFor("o")) {
    warning = `O "o" venceu!`;
    query(".resultado").innerHTML = warning;
    playing = false;
  } else if (isFull()) {
    warning = `Deu empate!`;
    query(".resultado").innerHTML = warning;
    playing = false;
  }
};

const checkWinnerFor = (player) => {
  let possibles = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let i in possibles) {
    let pArray = possibles[i].split(",");
    //"a1,a2,a3" ["a1", "a2", "a3"]
    let hasWon = pArray.every((option) => {
      if (table[option] === player) {
        return true;
      }
    });
    if (hasWon) return true;
  }

  return false;
};

const isFull = () => {
  let verifyArray = [];
  for (let i in table) {
    if (table[i] !== "") verifyArray.push(table[i]);
  }
  if (verifyArray.length === 9) return true;
  return false;
};

//Listeners

query(".reset").addEventListener("click", reset);

queryAll(".item").forEach((item) =>
  item.addEventListener("click", (event) => {
    play(event);
  })
);

//Starting

reset();
