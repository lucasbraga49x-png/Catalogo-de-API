async function InformacoesAPI() {
  try {
    const response = await fetch('../JSON/apisDragonBall.json');
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

/* URL */
const url = 'https://dragonball-api.com/api/characters';

async function carregarPersonagens() {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        
        /* Pegando o vetor itens guardando as informações dentro dele */
        const personagens = dados.items; 
        const catalogo = document.querySelector('.catalogo');
        
        catalogo.innerHTML = ''; 

        personagens.forEach(personagem => {
            catalogo.innerHTML += `
                <div class="card">
                    <div class="imagem">
                        <img src="${personagem.image}" alt="personagem">
                    </div>
                    <div class="nome">
                        <h3>${personagem.name}</h3>
                    </div>
                    <div class="tipo">
                        <p>Raça: ${personagem.race}</p>
                    </div>
                    <div class="tipo">
                        <p>Afiliação: ${personagem.affiliation}</p>
                    </div>
                    <div class="tipo">
                        <p>Ki: ${personagem.ki}</p>
                    </div>
                    <div class="tipo">
                        <p>Ki Máx: ${personagem.maxKi}</p>
                    </div>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao buscar os dados:", erro);
    }
}
carregarPersonagens();