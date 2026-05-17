async function InformacoesAPI() {
  try {
    const response = await fetch('../JSON/apisJikan.json');
    if (!response.ok) {
      throw new Error("Não é possível carregar o arquivo json");
    }
    const data = await response.json();
    const container = document.getElementById("estruturas");

    data.apis.forEach(api => {
      const div = document.createElement("div");
      div.classList.add("estrutura");

      div.innerHTML = `
        <div class="informacoes">
          <h3>${api.titulo}</h3>
          <p>${api.descricao}</p>
          <p>
            <a href="${api.url}" target="_blank">${api.url}</a>
          </p>
          <ul>
            ${api.campos.map(campo => `<li>${campo}</li>`).join("")}
          </ul>
        </div>
        <div class="imagem-json">
          <img src="${api.imagem}" alt="">
        </div>
      `;

      container.appendChild(div);
    });
  }
  catch (error) {
    console.error(error)
  }
}
InformacoesAPI()

const API = "https://api.jikan.moe/v4/anime";

/* Gerando o html */

function criarCardAnimes(p) {
  return `
    <div class="card">
            <div class="capa">
                <img src="${p.images.jpg.image_url}" alt="Capa de ${p.title}">
            </div>
            <div class="informacoes">
                <div class="titulo-anime">
                    <h3>${p.title}</h3>
                </div>
                <div class="descricao">
                    <p>${p.synopsis}</p>
                </div>
                <div class="avaliacao">
                    <p>⭐ ${p.score}</p>
                </div>
                <div class="temas">
                    ${p.genres.map(genero => `<span>${genero.name}</span>`).join("")}
                </div>
            </div>
        </div>
    `;
};

async function ExibirAnimes() {
  const catalogo = document.querySelector('.catalogo')

  try {

    const response = await fetch(`${API}`);
    if (!response.ok) {
      throw new Error("Não foi possível carregar a lista de animes");
    }
    const dados = await response.json();

    const htmlCompleto = dados.data.map(criarCardAnimes).join("");
    catalogo.innerHTML = htmlCompleto;

  } catch (error) {
    console.error(error);
  }

}

ExibirAnimes()

