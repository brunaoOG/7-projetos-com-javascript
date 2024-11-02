//padding

const q = (el) => {
  return document.querySelector(el);
};

q(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();

  showWarning("");

  let input = q("#searchInput").value
    ? q("#searchInput").value
    : clearResult() + showWarning("Digite algo antes de enviar.");

  if (input) {
    clearResult();
    showWarning("Carregando...");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=362381ecd59122b590a905761069d18d&units=metric&lang=pt_br`;

    let req = fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.cod == 200
          ? showInfo({
              city: json.name,
              country: json.sys.country,
              temp: json.main.temp,
              tempIcon: json.weather[0].icon,
              windSpeed: json.wind.speed,
              windDeg: json.wind.deg,
            })
          : json.cod == 404
          ? clearResult() + showWarning("Cidade não encontrada.")
          : clearResult() + showWarning("Algo deu errado!");
      });
  }
});

function clearResult() {
  q(".resultado").style.display = "none";
}

function showInfo(weather) {
  //limpar aviso e mostrar .resultado
  showWarning("");
  q(".resultado").style.display = "block";
  //titulos e dados
  q(".titulo").innerHTML = `${weather.city}, ${weather.country}`;
  q(".ventoInfo p").innerHTML = weather.windSpeed;
  q(".tempInfo p").innerHTML = weather.temp;
  //angulo do vento / imagem
  q(".ventoPonto").style.transform = `rotate(${weather.windDeg}deg)`;
  q("img").src = `https://openweathermap.org/img/wn/${weather.tempIcon}@2x.png`;
}

function showWarning(msg) {
  q(".aviso").innerHTML = msg;
}
//padding
