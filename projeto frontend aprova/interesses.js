document.addEventListener('DOMContentLoaded', function() {
    const vitrineInteresses = document.getElementById('vitrine-interesses');
    const mensagemSemInteresses = document.querySelector('.mensagem-sem-interesses');
    const paginacaoContainerInteresses = document.getElementById('paginacao-interesses'); 

    const placeholderFallbackGlobal = "placeholder_img/placeholder-400x300_fallback.png";

    const itensPorPagina = 12; 
    let paginaAtualInteresses = 1;
    let carrosInteressadosGlobal = []; 

    if (typeof carros === 'undefined' || !Array.isArray(carros)) {
        console.error("[interesses.js] ERRO: Array 'carros' não definido.");
        if (mensagemSemInteresses) { mensagemSemInteresses.textContent = "Erro ao carregar dados."; mensagemSemInteresses.style.display = 'block'; }
        if(vitrineInteresses) vitrineInteresses.innerHTML = '';
        return;
    }

    const idsInteresseDoLocalStorage = JSON.parse(localStorage.getItem('carrosInteresse')) || [];
    
    if (idsInteresseDoLocalStorage.length === 0) {
        if (mensagemSemInteresses) { mensagemSemInteresses.textContent = "Você ainda não marcou nenhum veículo como interesse."; mensagemSemInteresses.style.display = 'block';}
        if(vitrineInteresses) vitrineInteresses.innerHTML = '';
        if (paginacaoContainerInteresses) paginacaoContainerInteresses.innerHTML = ''; 
    } else {
        if (mensagemSemInteresses) mensagemSemInteresses.style.display = 'none';
        
        carrosInteressadosGlobal = carros.filter(carro => idsInteresseDoLocalStorage.includes(carro.id)); 

        if (carrosInteressadosGlobal.length === 0 ) {
             if (mensagemSemInteresses) {
                mensagemSemInteresses.textContent = "Nenhum dos seus veículos de interesse foi encontrado na lista atual.";
                mensagemSemInteresses.style.display = 'block';
            }
            if (paginacaoContainerInteresses) paginacaoContainerInteresses.innerHTML = '';
        } else {
            exibirCarrosDeInteresseDaPagina(paginaAtualInteresses);
        }
    }

    function exibirCarrosDeInteresseDaPagina(pagina) {
        if (!vitrineInteresses) { console.error("[interesses.js] #vitrine-interesses não encontrado."); return; }
        vitrineInteresses.innerHTML = ''; 
        paginaAtualInteresses = pagina;

        const inicio = (pagina - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;
        const carrosDaPagina = carrosInteressadosGlobal.slice(inicio, fim);

        if(carrosDaPagina.length === 0 && carrosInteressadosGlobal.length > 0 && pagina > 1) {
            exibirCarrosDeInteresseDaPagina(1);
            return;
        }
        if(carrosDaPagina.length === 0 && carrosInteressadosGlobal.length === 0) {
             if (mensagemSemInteresses) { mensagemSemInteresses.textContent = "Você ainda não marcou nenhum veículo como interesse."; mensagemSemInteresses.style.display = 'block'; }
             if (paginacaoContainerInteresses) paginacaoContainerInteresses.innerHTML = '';
             return;
        }

        carrosDaPagina.forEach(carro => {
            const card = document.createElement('div');
            card.className = 'carro-card';
            card.dataset.carroId = carro.id;
            card.addEventListener('click', () => { window.location.href = `detalhe.html?id=${carro.id}`; });

            const imagemElement = document.createElement('img');
            const fotoInicial = (carro.fotosUrls && carro.fotosUrls.length > 0 && carro.fotosUrls[0]) ? carro.fotosUrls[0] : placeholderFallbackGlobal;
            imagemElement.src = fotoInicial;
            imagemElement.alt = `Foto de ${carro.nome}`;
            imagemElement.onerror = function() { this.src = placeholderFallbackGlobal; this.alt = `Erro ${carro.nome}.`; };

            const nomeElement = document.createElement('h3'); nomeElement.textContent = carro.nome;
            const infoElement = document.createElement('p'); infoElement.className = 'info'; infoElement.textContent = `${carro.marca} - ${carro.ano}`;
            const precoElement = document.createElement('p'); precoElement.className = 'preco'; precoElement.textContent = carro.preco;
            const btnRemoverInteresse = document.createElement('button');
            btnRemoverInteresse.textContent = 'Remover Interesse';
            Object.assign(btnRemoverInteresse.style, { marginTop: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', width: '100%' });

            btnRemoverInteresse.addEventListener('click', (event) => {
                event.stopPropagation();
                let idsAtuais = JSON.parse(localStorage.getItem('carrosInteresse')) || [];
                idsAtuais = idsAtuais.filter(id => id !== carro.id); 
                localStorage.setItem('carrosInteresse', JSON.stringify(idsAtuais));
                
                carrosInteressadosGlobal = carros.filter(c => idsAtuais.includes(c.id));
                
                const totalPaginasAposRemocao = Math.ceil(carrosInteressadosGlobal.length / itensPorPagina);
                if (paginaAtualInteresses > totalPaginasAposRemocao && totalPaginasAposRemocao > 0) {
                    paginaAtualInteresses = totalPaginasAposRemocao;
                } else if (carrosInteressadosGlobal.length > 0 && paginaAtualInteresses === 0 && totalPaginasAposRemocao > 0) { // Caso especial se a pág atual se tornar 0
                    paginaAtualInteresses = 1;
                }
                
                if (carrosInteressadosGlobal.length === 0) {
                    if(mensagemSemInteresses) { mensagemSemInteresses.textContent = "Você ainda não marcou nenhum veículo como interesse."; mensagemSemInteresses.style.display = 'block'; }
                    vitrineInteresses.innerHTML = '';
                    if (paginacaoContainerInteresses) paginacaoContainerInteresses.innerHTML = '';
                } else {
                    exibirCarrosDeInteresseDaPagina(paginaAtualInteresses);
                }
            });

            card.appendChild(imagemElement); card.appendChild(nomeElement); card.appendChild(infoElement); card.appendChild(precoElement); card.appendChild(btnRemoverInteresse);
            vitrineInteresses.appendChild(card);
        });
        configurarPaginacaoInteresses();
    }

    function configurarPaginacaoInteresses() {
        if (!paginacaoContainerInteresses || carrosInteressadosGlobal.length === 0) {
            if (paginacaoContainerInteresses) paginacaoContainerInteresses.innerHTML = ''; return;
        }
        paginacaoContainerInteresses.innerHTML = '';
        const totalPaginas = Math.ceil(carrosInteressadosGlobal.length / itensPorPagina);

        if (totalPaginas <= 1) { paginacaoContainerInteresses.innerHTML = ''; return; }

        if (paginaAtualInteresses > 1) { paginacaoContainerInteresses.appendChild(criarBotaoPaginacaoInteresses('Anterior', () => exibirCarrosDeInteresseDaPagina(paginaAtualInteresses - 1)));}
        for (let i = 1; i <= totalPaginas; i++) { paginacaoContainerInteresses.appendChild(criarBotaoPaginacaoInteresses(i, () => exibirCarrosDeInteresseDaPagina(i), i === paginaAtualInteresses));}
        if (paginaAtualInteresses < totalPaginas) { paginacaoContainerInteresses.appendChild(criarBotaoPaginacaoInteresses('Próxima', () => exibirCarrosDeInteresseDaPagina(paginaAtualInteresses + 1)));}
    }
    
    function criarBotaoPaginacaoInteresses(texto, callback, desabilitado = false) {
        const botao = document.createElement('button');
        botao.textContent = texto;
        botao.addEventListener('click', () => { callback(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
        if (desabilitado) { botao.disabled = true; }
        return botao;
    }

    const btnMenuInteresses = document.getElementById('btn-menu');
    const navMenuInteresses = document.getElementById('nav-menu');
    if (btnMenuInteresses && navMenuInteresses) {
        btnMenuInteresses.addEventListener('click', () => {
            const isExpanded = navMenuInteresses.classList.toggle('ativo');
            btnMenuInteresses.setAttribute('aria-expanded', isExpanded);
        });
        document.addEventListener('click', function(event) {
            if (navMenuInteresses.classList.contains('ativo') && !navMenuInteresses.contains(event.target) && !btnMenuInteresses.contains(event.target)) {
                navMenuInteresses.classList.remove('ativo');
                navMenuInteresses.setAttribute('aria-expanded', 'false');
            }
        });
    } else {
        console.error("[interesses.js] ERRO: Elementos do menu #btn-menu ou #nav-menu não encontrados.");
    }
});