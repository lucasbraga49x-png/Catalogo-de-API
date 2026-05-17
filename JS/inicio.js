async function ExibirCards() {
    try {
        const response = await fetch('JSON/catalogo.json');
        if (!response.ok) {
            throw new Error("Não é possível carregar o arquivo json");
        }
        /* Na linha 7 e 8 estou chamando o arquivo e depois fazendo com que ele olhe o vetor "catalogo" dentro do objeto*/
        const data = await response.json();
        const catalogos = data.catalogo;
        const catalogo = document.querySelector('.catalogo')
        
        /* Usando forEach para pecorrer o vetor */
        catalogos.forEach(card => {

            catalogo.innerHTML +=
                `
               <div class="card">
                    <div class="informativo">
                        <div class="titulo">
                            <h2>${card.nome}</h2>
                        </div>
                        <div class="descricao">
                            <p>${card.descricao}</p>
                        </div>
                    </div>
                    <div class="botao">
                        <button onclick="window.location.href='${card.pagina}'">Ver agora</button>
                    </div>
                </div>
            `
            /* Usando windown.location.href pois vai ler a página HTML guardada no json */
        });
    }
    catch (error) {
        console.error(error)
    }
}
ExibirCards()
