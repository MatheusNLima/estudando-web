document.addEventListener('DOMContentLoaded', function() {
    // ... (lógica de carregar detalhes do carro - sem alterações nisso)
    const container = document.getElementById('detalhe-carro-container');
    const loadingSpinner = container.querySelector('.loading-spinner');
    const placeholderPrincipalGlobal = "placeholder_img/placeholder-400x300.png"; 
    const placeholderFallbackGlobal = "placeholder_img/placeholder-400x300_fallback.png";
    const urlParams = new URLSearchParams(window.location.search);
    const carroIdParam = urlParams.get('id'); 

    if (document.body) { document.body.id = 'detalhe-page';}

    if (!carroIdParam) { if(loadingSpinner) loadingSpinner.remove(); container.innerHTML = '<p>ID do carro não fornecido.</p>'; return;}
    const carroId = parseInt(carroIdParam);
    if (isNaN(carroId)) { if(loadingSpinner) loadingSpinner.remove(); container.innerHTML = '<p>ID do carro inválido.</p>'; return;}
    if (typeof carros === 'undefined' || !Array.isArray(carros)) { if(loadingSpinner) loadingSpinner.remove(); container.innerHTML = '<p>Erro: Dados dos veículos não carregados.</p>'; console.error("Array 'carros' não definido."); return; }
    
    const carroSelecionado = carros.find(c => c.id === carroId);
    if (!carroSelecionado) { if(loadingSpinner) loadingSpinner.remove(); container.innerHTML = `<p>Carro com ID ${carroId} não encontrado.</p>`; console.warn(`[detalhe.js] Carro ${carroId} não encontrado.`); console.log("[detalhe.js] Carros:", carros.slice(0,5)); return;}

    if(loadingSpinner) loadingSpinner.remove();
    document.title = carroSelecionado.nome + " - Detalhes";
    const fotoPrincipalDetalhe = (carroSelecionado.fotosUrls && carroSelecionado.fotosUrls.length > 0 && carroSelecionado.fotosUrls[0]) ? carroSelecionado.fotosUrls[0] : placeholderFallbackGlobal;

    container.innerHTML = `
        <div class="detalhe-carro-grid">
            <div class="detalhe-imagens">
                <img id="imagem-principal-detalhe" src="${fotoPrincipalDetalhe}" alt="Foto principal de ${carroSelecionado.nome}" onerror="this.onerror=null; this.src='${placeholderFallbackGlobal}';">
                ${ (carroSelecionado.fotosUrls && carroSelecionado.fotosUrls.length > 1) ? `
                    <div class="miniaturas">
                        ${carroSelecionado.fotosUrls.map((fotoUrl, index) => `<img src="${fotoUrl}" alt="Miniatura ${index+1}" data-index="${index}" class="${index === 0 ? 'ativa':''}" onerror="this.style.display='none';">`).join('')}
                    </div>
                ` : '' }
            </div>
            <div class="detalhe-info">
                <h2>${carroSelecionado.nome}</h2> <p class="marca-ano">${carroSelecionado.marca} - ${carroSelecionado.ano}</p> <p class="preco-detalhe">${carroSelecionado.preco}</p> <p class="descricao-completa">${carroSelecionado.descricao.replace(/\n/g, '<br>')}</p> <button id="btn-add-interesse" class="btn-interesse">Tenho Interesse!</button>
            </div>
        </div>`;

    const imagemPrincipalEl = document.getElementById('imagem-principal-detalhe');
    const miniaturasContainer = container.querySelector('.miniaturas');
    if (miniaturasContainer && imagemPrincipalEl) {
        miniaturasContainer.addEventListener('click', function(event) { if (event.target.tagName === 'IMG') { imagemPrincipalEl.src = event.target.src; this.querySelectorAll('img').forEach(img => img.classList.remove('ativa')); event.target.classList.add('ativa');}});
    }
    const btnInteresse = document.getElementById('btn-add-interesse');
    if (btnInteresse) { /* ... lógica do botão de interesse ... */
        let interesses = JSON.parse(localStorage.getItem('carrosInteresse')) || [];
        if (interesses.includes(carroId)) { btnInteresse.textContent = 'Remover Interesse'; btnInteresse.classList.add('marcado');}
        btnInteresse.addEventListener('click', function() {
            interesses = JSON.parse(localStorage.getItem('carrosInteresse')) || [];
            const carroJaInteressado = interesses.includes(carroId);
            if (carroJaInteressado) { interesses = interesses.filter(id => id !== carroId); this.textContent = 'Tenho Interesse!'; this.classList.remove('marcado');
            } else { interesses.push(carroId); this.textContent = 'Interesse Registrado!'; this.classList.add('marcado');}
            localStorage.setItem('carrosInteresse', JSON.stringify(interesses));
        });
    }


    // --- LÓGICA DO MENU PARA DETALHE.HTML ---
    const btnMenuDetalhe = document.getElementById('btn-menu');
    const navMenuDetalhe = document.getElementById('nav-menu');

    console.log("Detalhe.js: Tentando encontrar #btn-menu:", btnMenuDetalhe); // Log para depuração
    console.log("Detalhe.js: Tentando encontrar #nav-menu:", navMenuDetalhe); // Log para depuração

    if (btnMenuDetalhe && navMenuDetalhe) {
        console.log("Detalhe.js: #btn-menu e #nav-menu encontrados. Adicionando listeners.");
        btnMenuDetalhe.addEventListener('click', () => {
            navMenuDetalhe.classList.toggle('ativo');
            btnMenuDetalhe.setAttribute('aria-expanded', navMenuDetalhe.classList.contains('ativo'));
            console.log("Detalhe.js: Botão do menu clicado, classe 'ativo' no navMenu:", navMenuDetalhe.classList.contains('ativo'));
        });

        document.addEventListener('click', function(event) {
            if (navMenuDetalhe.classList.contains('ativo') && !navMenuDetalhe.contains(event.target) && !btnMenuDetalhe.contains(event.target)) {
                navMenuDetalhe.classList.remove('ativo');
                btnMenuDetalhe.setAttribute('aria-expanded', 'false');
                console.log("Detalhe.js: Clicou fora, menu fechado.");
            }
        });
    } else {
        console.error("Detalhe.js: Erro! #btn-menu ou #nav-menu NÃO encontrado(s) no DOM de detalhe.html.");
    }
});