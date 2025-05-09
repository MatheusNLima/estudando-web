document.addEventListener('DOMContentLoaded', function() {
    // ... (array carros e toda a lógica de exibirCarrosDaPagina, paginacao - sem alterações nisso)
    const placeholderPrincipal = "placeholder_img/placeholder-400x300.png";
    const placeholderFallback = "placeholder_img/placeholder-400x300_fallback.png";
    const carros = [ /* ... SEU ARRAY DE 23 CARROS ... */
        { id: 1, nome: "Fusca TSI Concept", marca: "Volkswagen", ano: 2022, preco: "R$ 95.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal, placeholderPrincipal], descricao: "Um clássico reimaginado com motor turbo e design moderno, perfeito para quem busca estilo e performance." },
        { id: 2, nome: "Maverick Hybrid XLT", marca: "Ford", ano: 2023, preco: "R$ 230.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "Picape urbana com tecnologia híbrida, oferecendo economia de combustível sem sacrificar a potência." },
        { id: 3, nome: "Civic Si Coupe", marca: "Honda", ano: 2024, preco: "R$ 250.000,00", fotosUrls: [placeholderPrincipal], descricao: "Esportivo com performance afiada e design arrojado, ideal para os amantes de velocidade." },
        { id: 4, nome: "Onix Plus Turbo", marca: "Chevrolet", ano: 2023, preco: "R$ 98.000,00", fotosUrls: [placeholderPrincipal], descricao: "Sedan compacto e eficiente, com motor turbo para uma condução ágil na cidade e estrada." },
        { id: 5, nome: "HB20 Sense", marca: "Hyundai", ano: 2024, preco: "R$ 85.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "Popular com bom design e recheado de tecnologia para o seu dia a dia." },
        { id: 6, nome: "Kwid E-Tech", marca: "Renault", ano: 2023, preco: "R$ 140.000,00", fotosUrls: [placeholderPrincipal], descricao: "Elétrico acessível e compacto, perfeito para a mobilidade urbana sustentável." },
        { id: 7, nome: "Compass Limited", marca: "Jeep", ano: 2023, preco: "R$ 220.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "SUV sofisticado com acabamento premium e capacidade off-road característica da Jeep." },
        { id: 8, nome: "Toro Volcano", marca: "Fiat", ano: 2024, preco: "R$ 190.000,00", fotosUrls: [placeholderPrincipal], descricao: "Picape versátil que combina o conforto de um SUV com a robustez para o trabalho." },
        { id: 9, nome: "Corolla Cross XRE", marca: "Toyota", ano: 2023, preco: "R$ 185.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal, placeholderPrincipal], descricao: "SUV confiável e espaçoso, com a qualidade e durabilidade reconhecidas da Toyota." },
        { id: 10, nome: "Polo Highline", marca: "Volkswagen", ano: 2024, preco: "R$ 115.000,00", fotosUrls: [placeholderPrincipal], descricao: "Hatch premium com design moderno, tecnologia embarcada e excelente dirigibilidade." },
        { id: 11, nome: "Renegade Longitude", marca: "Jeep", ano: 2022, preco: "R$ 150.000,00", fotosUrls: [placeholderPrincipal], descricao: "Aventura e estilo em um SUV compacto que não teme desafios dentro ou fora da cidade." },
        { id: 12, nome: "Pulse Audace", marca: "Fiat", ano: 2023, preco: "R$ 125.000,00", fotosUrls: [placeholderPrincipal], descricao: "SUV compacto moderno da Fiat, com design italiano e muita personalidade para o seu dia." },
        { id: 13, nome: "Creta N Line", marca: "Hyundai", ano: 2024, preco: "R$ 170.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "Design esportivo e arrojado na versão N Line do Creta, para quem busca exclusividade." },
        { id: 14, nome: "Tracker Premier", marca: "Chevrolet", ano: 2023, preco: "R$ 145.000,00", fotosUrls: [placeholderPrincipal], descricao: "Conforto e tecnologia em um SUV que oferece segurança e conectividade para toda a família." },
        { id: 15, nome: "Duster Iconic", marca: "Renault", ano: 2024, preco: "R$ 135.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "Robusto e espaçoso, o Duster é o SUV ideal para quem precisa de versatilidade e bom porta-malas." },
        { id: 16, nome: "Nivus Comfortline", marca: "Volkswagen", ano: 2023, preco: "R$ 130.000,00", fotosUrls: [placeholderPrincipal], descricao: "SUV coupé com estilo inovador e tecnologia VW, oferecendo uma experiência de condução única." },
        { id: 17, nome: "Kicks Advance", marca: "Nissan", ano: 2024, preco: "R$ 138.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "Tecnologia e design japonês em um SUV ágil e econômico, com muito conforto interno." },
        { id: 18, nome: "C4 Cactus Shine", marca: "Citroën", ano: 2023, preco: "R$ 142.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "Conforto e originalidade definem o C4 Cactus, um SUV com suspensão única e design marcante." },
        { id: 19, nome: "Fastback Impetus", marca: "Fiat", ano: 2024, preco: "R$ 155.000,00", fotosUrls: [placeholderPrincipal], descricao: "SUV Coupé da Fiat com design arrojado e motor turbo para uma experiência emocionante." },
        { id: 20, nome: "T-Cross Highline", marca: "Volkswagen", ano: 2023, preco: "R$ 165.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "SUV compacto VW com muito espaço interno, segurança e tecnologia de ponta." },
        { id: 21, nome: "HR-V Touring", marca: "Honda", ano: 2024, preco: "R$ 195.000,00", fotosUrls: [placeholderPrincipal], descricao: "Nova geração do HR-V, mais sofisticada, com motor turbo e o Magic Seat da Honda." },
        { id: 22, nome: "Commander Overland", marca: "Jeep", ano: 2023, preco: "R$ 280.000,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "SUV de 7 lugares da Jeep, combinando luxo, tecnologia e capacidade off-road." },
        { id: 23, nome: "BYD Dolphin", marca: "BYD", ano: 2024, preco: "R$ 149.800,00", fotosUrls: [placeholderPrincipal, placeholderPrincipal], descricao: "Carro elétrico compacto e ágil, com design moderno e ótima autonomia para a cidade." }
    ];
    const vitrineCarros = document.getElementById('vitrine-carros');
    const paginacaoContainer = document.getElementById('paginacao');
    const itensPorPagina = 12;
    let paginaAtual = 1;
    const slideshowState = {};

    function exibirCarrosDaPagina(pagina) { /* ... lógica completa de exibir carros ... */ 
        if (!vitrineCarros) return;
        vitrineCarros.innerHTML = '';
        paginaAtual = pagina;
        const inicio = (pagina - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;
        const carrosDaPagina = carros.slice(inicio, fim);

        carrosDaPagina.forEach(carro => {
            const card = document.createElement('div');
            card.className = 'carro-card';
            card.dataset.carroId = carro.id;
            card.addEventListener('click', () => { window.location.href = `detalhe.html?id=${carro.id}`; });

            if (!slideshowState[carro.id]) { slideshowState[carro.id] = { intervalId: null, currentIndex: 0 }; }
            let estadoAtualSlide = slideshowState[carro.id];

            const imagemElement = document.createElement('img');
            const fotoInicial = (carro.fotosUrls && carro.fotosUrls.length > 0 && carro.fotosUrls[0]) ? carro.fotosUrls[0] : placeholderFallback;
            imagemElement.src = fotoInicial;
            estadoAtualSlide.currentIndex = 0;
            imagemElement.alt = `Foto de ${carro.nome}`;
            imagemElement.onerror = function() { this.src = placeholderFallback; this.alt = `Erro ao carregar ${carro.nome}`; console.warn(`[index] Erro imagem: ${fotoInicial}`); };

            const nomeElement = document.createElement('h3'); nomeElement.textContent = carro.nome;
            const infoElement = document.createElement('p'); infoElement.className = 'info'; infoElement.textContent = `${carro.marca} - ${carro.ano}`;
            const descricaoElement = document.createElement('p'); descricaoElement.className = 'descricao'; descricaoElement.textContent = carro.descricao;
            const precoElement = document.createElement('p'); precoElement.className = 'preco'; precoElement.textContent = carro.preco;

            card.appendChild(imagemElement); card.appendChild(nomeElement); card.appendChild(infoElement); card.appendChild(descricaoElement); card.appendChild(precoElement);
            
            card.addEventListener('mouseenter', () => { /* ... lógica slideshow ... */ 
                if (carro.fotosUrls && carro.fotosUrls.length > 1) {
                    clearInterval(estadoAtualSlide.intervalId);
                    estadoAtualSlide.intervalId = setInterval(() => {
                        estadoAtualSlide.currentIndex = (estadoAtualSlide.currentIndex + 1) % carro.fotosUrls.length;
                        imagemElement.src = carro.fotosUrls[estadoAtualSlide.currentIndex];
                        imagemElement.onerror = function() { this.src = placeholderFallback; console.warn(`[index slide] Erro: ${carro.fotosUrls[estadoAtualSlide.currentIndex]}`); };
                    }, 2000);
                }
            });
            card.addEventListener('mouseleave', () => { /* ... lógica slideshow ... */
                clearInterval(estadoAtualSlide.intervalId); estadoAtualSlide.intervalId = null; estadoAtualSlide.currentIndex = 0;
                const primeiraFoto = (carro.fotosUrls && carro.fotosUrls.length > 0 && carro.fotosUrls[0]) ? carro.fotosUrls[0] : placeholderFallback;
                imagemElement.src = primeiraFoto;
                imagemElement.onerror = function() { this.src = placeholderFallback; };
            });
            vitrineCarros.appendChild(card);
        });
        configurarPaginacao();
    }
    function configurarPaginacao() { /* ... lógica completa de paginacao ... */
        if (!paginacaoContainer) return;
        paginacaoContainer.innerHTML = '';
        const totalPaginas = Math.ceil(carros.length / itensPorPagina);
        if (totalPaginas <= 1) return;
        if (paginaAtual > 1) { paginacaoContainer.appendChild(criarBotaoPaginacao('Anterior', () => exibirCarrosDaPagina(paginaAtual - 1)));}
        for (let i = 1; i <= totalPaginas; i++) { paginacaoContainer.appendChild(criarBotaoPaginacao(i, () => exibirCarrosDaPagina(i), i === paginaAtual));}
        if (paginaAtual < totalPaginas) { paginacaoContainer.appendChild(criarBotaoPaginacao('Próxima', () => exibirCarrosDaPagina(paginaAtual + 1)));}
    }
    function criarBotaoPaginacao(texto, callback, desabilitado = false) { /* ... lógica completa criarBotao ... */
        const botao = document.createElement('button'); botao.textContent = texto;
        botao.addEventListener('click', () => { callback(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
        if (desabilitado) { botao.disabled = true; } return botao;
    }

    // --- LÓGICA DO MENU PARA INDEX.HTML ---
    const btnMenu = document.getElementById('btn-menu');
    const navMenu = document.getElementById('nav-menu');

    console.log("Script.js: Tentando encontrar #btn-menu:", btnMenu); // Log para depuração
    console.log("Script.js: Tentando encontrar #nav-menu:", navMenu); // Log para depuração

    if (btnMenu && navMenu) {
        console.log("Script.js: #btn-menu e #nav-menu encontrados. Adicionando listeners.");
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('ativo');
            btnMenu.setAttribute('aria-expanded', navMenu.classList.contains('ativo'));
            console.log("Script.js: Botão do menu clicado, classe 'ativo' no navMenu:", navMenu.classList.contains('ativo'));
        });

        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('ativo') && !navMenu.contains(event.target) && !btnMenu.contains(event.target)) {
                navMenu.classList.remove('ativo');
                btnMenu.setAttribute('aria-expanded', 'false');
                console.log("Script.js: Clicou fora, menu fechado.");
            }
        });
    } else {
        console.error("Script.js: Erro! #btn-menu ou #nav-menu NÃO encontrado(s) no DOM de index.html.");
    }

    if (vitrineCarros) {
        exibirCarrosDaPagina(paginaAtual);
    } else {
        console.error("Elemento com ID 'vitrine-carros' não encontrado!");
    }
});