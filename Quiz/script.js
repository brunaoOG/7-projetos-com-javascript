//variaveis/função padrão stuff

const query = (doc) => {
  return document.querySelector(doc);
};

let questionEl = query(".question");
let optionsEl = query(".options");

//pontuação stuff

let stats = {
  current: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
};

//funções stuff

const renderQuestion = (index) => {
  let pct = stats.current / questions.length;
  pct = Math.round(pct * 100);

  query(".progress--bar").style.width = `${pct}%`;

  if (questions.length - 1 < index) {
    renderResult(stats.rightAnswers, stats.wrongAnswers);
    return;
  }

  let q = questions[index];

  questionEl.innerHTML = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((item, index) => {
    let div = document.createElement("div");
    // div.setAttribute("data-op", index);
    div.classList.add("option");
    div.addEventListener("click", () => {
      nextQuestion(index, q.answer);
    });

    let span = document.createElement("span");
    span.innerHTML = index + 1;

    div.append(span);
    div.append(item);

    optionsEl.append(div);
  });
};

const nextQuestion = (option, answer) => {
  option === answer
    ? stats.rightAnswers++ + stats.current++
    : stats.wrongAnswers++ + stats.current++;
  renderQuestion(stats.current);
};

const renderResult = (rights) => {
  questionEl.innerHTML = "";
  optionsEl.innerHTML = "";

  let pct = rights / questions.length;
  pct = Math.round(pct * 100);

  query(".scoreArea").style.display = "block";
  query(".scorePct").innerHTML = `Acertou ${pct}%`;
  query(
    ".scoreText2"
  ).innerHTML = `Você acertou ${rights} de ${questions.length} questões`;

  if (rights > 7) {
    query(".scoreText1").innerHTML = "Parabéns! Que aula 👏";
    query(".scorePct").style.color = "#00ff00";
  } else if (rights >= 5) {
    query(".scoreText1").innerHTML = "Parabéns! Fez o básico.";
    query(".scorePct").style.color = "#ffff00";
  } else if (rights > 2) {
    query(".scoreText1").innerHTML = "Mandou muito mal...  ";
    query(".scorePct").style.color = "#ff0000";
  } else {
    query(".scoreText1").innerHTML = "Aí tu respondeu com a bunda!";
    query(".scorePct").style.color = "#000000";
  }

  tryAgain();
};

const tryAgain = () => {
  stats = {
    current: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
  };
  query(".scoreArea button").addEventListener("click", () => {
    query(".scoreArea").style.display = "none";
    renderQuestion(stats.current);
  });
};

renderQuestion(stats.current);
