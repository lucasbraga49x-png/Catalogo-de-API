async function InformacoesAPI() {
    try {
        const response = await fetch('../JSON/apis.json');
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

const API = "https://pokeapi.co/api/v2/pokemon";

/* gerar html do card */
function criarCardPokemon(p) {
    return `
        <div class="card">
            <div class="imagem">
                <img src="${p.sprites.front_default}" alt="${p.name}">
            </div>
            <div class="nome">
                <h3>${p.name}</h3>
            </div>
            <div class="tipo">
                <p>Tipo: ${p.types.map(t => t.type.name).join(", ")}</p>
            </div>
            <div class="som">
                <button onclick="soltarSom('${p.cries.latest}')">🔊 Ouvir som</button>
            </div>
        </div>
    `;
}

/* Caregando lista dos pokemons */
async function ExibirPokemons() {
    const catalogo = document.querySelector(".catalogo");

    try {
        catalogo.innerHTML = `<p style="color: rgb(44, 153, 62);">Carregando Pokémons...</p>`;

        const response = await fetch(`${API}?limit=100`);
        if (!response.ok) {
            throw new Error("Não foi possível carregar a lista de pokémons");
        }

        const dados = await response.json();

       /* Já pega multiplas informações direto */
        const promessas = dados.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));

         
        const pokemonsDetalhes = await Promise.all(promessas);

        /* joga no html */
        const htmlCompleto = pokemonsDetalhes.map(criarCardPokemon).join("");
        catalogo.innerHTML = htmlCompleto;

    } catch (error) {
        console.error(error);
        catalogo.innerHTML = "<p>Erro ao carregar os Pokémons.</p>";
    }
}

/* funcao de tocar som */
function soltarSom(url) {
    const audio = new Audio(url);
    audio.play();
}

/* funcao de buscar */
async function buscarPokemon() {
    const nomeInput = document.getElementById('nomePokemon').value.toLowerCase().trim();
    const catalogo = document.querySelector(".catalogo");

    try {
        catalogo.innerHTML = "<p>Buscando...</p>";

        const response = await fetch(`${API}/${nomeInput}`);

        if (!response.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const p = await response.json();

        /* mostrar apenas o pokemon que busquei */
        catalogo.innerHTML = criarCardPokemon(p);

    } catch (error) {
        console.error(error);
        catalogo.innerHTML = `<p style="color: rgb(165, 5, 5)">Pokémon não encontrado! Verifique o nome e tente novamente.</p>`;
    }
}

ExibirPokemons();



