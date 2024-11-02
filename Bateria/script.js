// Sistema para não tocar enquanto estiver sendo escrito
// a composição.

let input = document.querySelector("#input");
let inputInterval = document.querySelector("#inputInterval");
let inputHasNotFocus = true;

input.addEventListener("focus", () => {
  inputHasNotFocus = false;
});
input.addEventListener("blur", () => {
  inputHasNotFocus = true;
});

//Sistema para tocar quando clicar na tecla, se o input da composição
//estiver em foco, não vai tocar.

document.body.addEventListener("keydown", (event) => {
  let allKeys = Array.from(document.querySelectorAll(".key"));
  let eventKey = event.code.toLowerCase();
  let boolean = allKeys.some(
    (item) => item.getAttribute("data-key") == eventKey
  );

  boolean && inputHasNotFocus ? playSound(eventKey) : undefined;
});

//Função que toca o som, e adiciona, enquanto o som da tecla estiver
//tocando, uma borda na respectiva tecla.

const playSound = (sound) => {
  let audioElement = document.querySelector(`#s_${sound}`);
  let keyElement = document.querySelector(`div[data-key='${sound}']`);
  keyElement.classList.add("active");
  setTimeout(() => {
    keyElement.classList.remove("active");
  }, 400);
  audioElement.currentTime = 0;
  audioElement.play();
};

//Função para tocar a composição indicada no input, pode receber além da composição em si,
//um intervalo, que se não for recebido, será o padrão de 500ms para tocar a próxima tecla.

const playComposition = (comp, int) => {
  let compArray = comp.split(" ").join("").split("");
  compArray = compArray.map((item) => item.toLowerCase());
  let interval = int ? Number(int) : 500;

  let wait = 0;

  //A verificação feita abaixo é para o js nao ficar disparando erro quando o usuário,
  //no input de composição enviar caracteres inexistentes no teclado. Com a verificação
  //o playSound só vai ser executado para as teclas corretas.

  for (let i of compArray) {
    if (
      Array.from(document.querySelectorAll(".key")).some((item) => {
        return item.innerHTML.toLowerCase() == i;
      })
    ) {
      setTimeout(() => {
        playSound(`key${i}`);
      }, wait);
      wait += interval;
    }
  }
};

// ------------------------------------------------------------------------------------

document.querySelector("button").addEventListener("click", () => {
  input.value && inputInterval.value
    ? playComposition(input.value, inputInterval.value)
    : input.value
    ? playComposition(input.value)
    : alert("Insira algo na composição, antes de toca-la.");
});
