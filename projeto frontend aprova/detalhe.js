document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('detalhe-carro-container');
    const loadingSpinner = container.querySelector('.loading-spinner');

    const placeholderFallbackGlobal = "placeholder_img/placeholder-400x300_fallback.png";

    const urlParams = new URLSearchParams(window.location.search);
    const carroIdParam = urlParams.get('id'); 

    if (document.body) {
        document.body.id = 'detalhe-page';
    }

    if (!carroIdParam) {
        if(loadingSpinner) loadingSpinner.remove();
        container.innerHTML = '<p style="color: red; text-align: center;">ID do carro não fornecido na URL.</p>';
        return;
    }

    const carroId = parseInt(carroIdParam);

    if (isNaN(carroId)) {
        if(loadingSpinner) loadingSpinner.remove();
        container.innerHTML = '<p style="color: red; text-align: center;">ID do carro inválido.</p>';
        return;
    }

    if (typeof carros === 'undefined' || !Array.isArray(carros)) {
        if(loadingSpinner) loadingSpinner.remove();
        container.innerHTML = '<p style="color: red; text-align: center;">Erro: Dados dos veículos não carregados.</p>';
        console.error("[detalhe.js] ERRO: Array 'carros' não está definido no escopo global do detalhe.html.");
        return;
    }
    
    const carroSelecionado = carros.find(c => c.id === carroId);

    if (!carroSelecionado) {
        if(loadingSpinner) loadingSpinner.remove();
        container.innerHTML = `<p style="color: red; text-align: center;">Carro com ID ${carroId} não encontrado.</p>`;
        return;
    }

    if(loadingSpinner) loadingSpinner.remove();
    document.title = carroSelecionado.nome + " - Detalhes";

    const fotoPrincipalDetalhe = (carroSelecionado.fotosUrls && carroSelecionado.fotosUrls.length > 0 && carroSelecionado.fotosUrls[0]) ? carroSelecionado.fotosUrls[0] : placeholderFallbackGlobal;

    container.innerHTML = `
        <div class="detalhe-carro-grid">
            <div class="detalhe-imagens">
                <img id="imagem-principal-detalhe" 
                     src="${fotoPrincipalDetalhe}" 
                     alt="Foto principal de ${carroSelecionado.nome}"
                     onerror="this.onerror=null; this.src='${placeholderFallbackGlobal}';">
                
                ${ (carroSelecionado.fotosUrls && carroSelecionado.fotosUrls.length > 1) ? `
                    <div class="miniaturas">
                        ${carroSelecionado.fotosUrls.map((fotoUrl, index) => `
                            <img src="${fotoUrl}" 
                                 alt="Miniatura ${index + 1} de ${carroSelecionado.nome}" 
                                 data-index="${index}"
                                 class="${index === 0 ? 'ativa' : ''}"
                                 onerror="this.style.display='none';">
                        `).join('')}
                    </div>
                ` : '' }
            </div>
            <div class="detalhe-info">
                <h2>${carroSelecionado.nome}</h2>
                <p class="marca-ano">${carroSelecionado.marca} - ${carroSelecionado.ano}</p>
                <p class="preco-detalhe">${carroSelecionado.preco}</p>
                <p class="descricao-completa">${carroSelecionado.descricao.replace(/\n/g, '<br>')}</p>
                <button id="btn-add-interesse" class="btn-interesse">Tenho Interesse!</button>
            </div>
        </div>
    `;

    const imagemPrincipalEl = document.getElementById('imagem-principal-detalhe');
    const miniaturasContainer = container.querySelector('.miniaturas');

    if (miniaturasContainer && imagemPrincipalEl) {
        miniaturasContainer.addEventListener('click', function(event) {
            if (event.target.tagName === 'IMG') {
                const novaUrl = event.target.src;
                imagemPrincipalEl.src = novaUrl;
                this.querySelectorAll('img').forEach(img => img.classList.remove('ativa'));
                event.target.classList.add('ativa');
            }
        });
    }
    
    const btnInteresse = document.getElementById('btn-add-interesse');
    if (btnInteresse) {
        let interesses = JSON.parse(localStorage.getItem('carrosInteresse')) || [];
        if (interesses.includes(carroId)) {
            btnInteresse.textContent = 'Remover Interesse';
            btnInteresse.classList.add('marcado');
        }
        btnInteresse.addEventListener('click', function() {
            interesses = JSON.parse(localStorage.getItem('carrosInteresse')) || [];
            const carroJaInteressado = interesses.includes(carroId);
            if (carroJaInteressado) {
                interesses = interesses.filter(id => id !== carroId);
                this.textContent = 'Tenho Interesse!';
                this.classList.remove('marcado');
            } else {
                interesses.push(carroId); 
                this.textContent = 'Interesse Registrado!';
                this.classList.add('marcado');
            }
            localStorage.setItem('carrosInteresse', JSON.stringify(interesses));
        });
    }

    const btnMenuDetalhe = document.getElementById('btn-menu');
    const navMenuDetalhe = document.getElementById('nav-menu');

    if (btnMenuDetalhe && navMenuDetalhe) {
        btnMenuDetalhe.addEventListener('click', () => {
            const isExpanded = navMenuDetalhe.classList.toggle('ativo');
            btnMenuDetalhe.setAttribute('aria-expanded', isExpanded);
        });
        document.addEventListener('click', function(event) { 
            if (navMenuDetalhe.classList.contains('ativo') && !navMenuDetalhe.contains(event.target) && !btnMenuDetalhe.contains(event.target)) {
                navMenuDetalhe.classList.remove('ativo');
                btnMenuDetalhe.setAttribute('aria-expanded', 'false');
            }
        });
    } else {
        console.error("[detalhe.js] ERRO: Elementos do menu #btn-menu ou #nav-menu não encontrados.");
    }
});