const header = document.querySelector('header')

function gerarMenu(){
    
    header.innerHTML = 
    `
    <nav>
    <ul>
        <li><a href="../index.html">Início</a></li>
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Serviços</a></li>
        <li><a href="#">Contato</a></li>

        <li class="configuracoes">
            <details>
                <summary>⚙ Configurações</summary>
                <button onclick="mudarTema()" class="btn-tema">Alternar Tema</button>
            </details>
        </li>
    </ul>
</nav>
    `
}
gerarMenu()