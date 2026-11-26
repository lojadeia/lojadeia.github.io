// Loja de IA — navegação e páginas (sem dependências)
const app = document.getElementById("app");
const reais = (v) => "R$ " + v.toLocaleString("pt-BR");
const acharAgente = (id) => AGENTES.find((a) => a.id === id);
const menorPreco = (campo) => Math.min(...AGENTES.map((a) => a[campo]));

// ---------- Componentes ----------
function cardAgente(a) {
  return `
    <a class="card agente-card" href="#/agente/${a.id}">
      <div class="agente-topo">
        <div class="agente-icone">${a.icone}</div>
        ${a.popular ? '<span class="selo selo-pop">Mais procurado</span>' : `<span class="selo">${a.categoria}</span>`}
      </div>
      <h3>${a.nome}</h3>
      <p>${a.curta}</p>
      <div class="agente-preco"><span>a partir de</span><span><b>${reais(a.essencial)}</b>/mês</span></div>
    </a>`;
}

function faixaCTA() {
  return `
    <section class="secao"><div class="container">
      <div class="faixa">
        <div>
          <h2>Não achou o agente que precisa?</h2>
          <p>Conte o que sua empresa quer automatizar e indicamos ou criamos o agente certo.</p>
        </div>
        <a href="#/contratar" class="btn">Falar com um especialista</a>
      </div>
    </div></section>`;
}

// ---------- Páginas ----------
function paginaInicio() {
  const populares = AGENTES.filter((a) => a.popular);
  return `
    <section class="hero"><div class="container">
      <span class="etiqueta">Agentes de IA para empresas</span>
      <h1>Sua empresa com inteligência<br>artificial trabalhando 24h</h1>
      <p class="sub">Escolha um agente pronto, testado e aprovado. Nós instalamos, conectamos aos seus sistemas e cuidamos de tudo.</p>
      <div class="hero-acoes">
        <a href="#/catalogo" class="btn btn-pri">Ver agentes disponíveis</a>
        <a href="#/vender" class="btn btn-sec">Quero vender meu agente</a>
      </div>
      <div class="hero-provas">
        <span>Agentes testados antes de publicar</span>
        <span>Instalação inclusa</span>
        <span>Suporte em português</span>
      </div>
    </div></section>

    <section class="secao"><div class="container">
      <div class="secao-titulo">
        <span class="etiqueta">Mais procurados</span>
        <h2>Agentes que mais ajudam empresas</h2>
        <p>Comece por um deles e sinta a diferença já no primeiro mês.</p>
      </div>
      <div class="grade">${populares.map(cardAgente).join("")}</div>
      <p style="text-align:center;margin-top:32px"><a href="#/catalogo" class="btn btn-sec">Ver todos os ${AGENTES.length} agentes →</a></p>
    </div></section>

    <section class="secao secao-alt"><div class="container">
      <div class="secao-titulo">
        <span class="etiqueta">Como funciona</span>
        <h2>Do pedido ao agente funcionando</h2>
      </div>
      ${passosHTML()}
    </div></section>

    <section class="secao"><div class="container">
      <div class="secao-titulo">
        <span class="etiqueta">Categorias</span>
        <h2>Uma solução para cada área</h2>
      </div>
      <div class="grade">
        ${CATEGORIAS.map((c) => {
          const n = AGENTES.filter((a) => a.categoria === c).length;
          return `<a class="card agente-card" href="#/catalogo?categoria=${encodeURIComponent(c)}">
            <h3>${c}</h3><p>${n} agente${n > 1 ? "s" : ""} disponíve${n > 1 ? "is" : "l"}</p>
            <div class="agente-preco"><span>Ver agentes</span><span>→</span></div></a>`;
        }).join("")}
      </div>
    </div></section>
    ${faixaCTA()}`;
}

function passosHTML() {
  return `
    <div class="passos">
      <div class="card passo"><h3>Escolha o agente</h3><p>Navegue pelo catálogo e veja o que cada agente faz pela sua empresa.</p></div>
      <div class="card passo"><h3>Fale com a gente</h3><p>Clique em “Quero contratar”. Entendemos sua necessidade e escolhemos o plano ideal.</p></div>
      <div class="card passo"><h3>Nós instalamos</h3><p>Configuramos o agente com as informações da sua empresa e conectamos aos seus sistemas.</p></div>
      <div class="card passo"><h3>Agente trabalhando</h3><p>Seu agente começa a funcionar e nós cuidamos da manutenção todo mês.</p></div>
    </div>`;
}

function paginaCatalogo(params) {
  const catInicial = params.get("categoria") || "Todos";
  setTimeout(() => iniciarFiltros(catInicial), 0);
  return `
    <section class="secao"><div class="container">
      <span class="etiqueta">Catálogo</span>
      <h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">Agentes de IA disponíveis</h1>
      <p class="muted" style="margin-bottom:28px">Todos os agentes são testados pela nossa equipe e incluem instalação e suporte.</p>
      <div class="filtros">
        <input class="busca" id="busca" type="search" placeholder="Buscar agente (ex.: WhatsApp, agenda, vendas)" aria-label="Buscar agente">
        <div class="chips" id="chips">
          ${["Todos", ...CATEGORIAS].map((c) => `<button class="chip${c === catInicial ? " ativo" : ""}" data-cat="${c}">${c}</button>`).join("")}
        </div>
      </div>
      <div class="grade" id="lista"></div>
    </div></section>
    ${faixaCTA()}`;
}

function iniciarFiltros(catInicial) {
  let categoria = catInicial;
  const busca = document.getElementById("busca");
  const lista = document.getElementById("lista");
  const normalizar = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const desenhar = () => {
    const termo = normalizar(busca.value.trim());
    const itens = AGENTES.filter((a) =>
      (categoria === "Todos" || a.categoria === categoria) &&
      (!termo || normalizar([a.nome, a.curta, a.categoria, ...a.integracoes, ...a.paraQuem].join(" ")).includes(termo))
    );
    lista.innerHTML = itens.length
      ? itens.map(cardAgente).join("")
      : `<div class="vazio" style="grid-column:1/-1">Nenhum agente encontrado.<br><a href="#/contratar" style="color:var(--accent-text)">Conte o que você precisa →</a></div>`;
  };
  document.getElementById("chips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    categoria = b.dataset.cat;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("ativo", c === b));
    desenhar();
  });
  busca.addEventListener("input", desenhar);
  desenhar();
}

function paginaAgente(id) {
  const a = acharAgente(id);
  if (!a) return paginaNaoEncontrada();
  document.title = `${a.nome} · Loja de IA`;
  const parecidos = AGENTES.filter((x) => x.categoria === a.categoria && x.id !== a.id).slice(0, 3);
  setTimeout(() => {
    const atualizar = () => {
      const plano = document.querySelector('input[name="plano"]:checked').value;
      document.getElementById("btn-contratar").href = `#/contratar?agente=${a.id}&plano=${plano}`;
    };
    document.querySelectorAll('input[name="plano"]').forEach((r) => r.addEventListener("change", atualizar));
    atualizar();
  }, 0);
  return `
    <section class="secao"><div class="container">
      <a href="#/catalogo" class="voltar">← Voltar ao catálogo</a>
      <div class="detalhe">
        <div>
          <div class="detalhe-cab">
            <div class="agente-icone">${a.icone}</div>
            <div><span class="selo">${a.categoria}</span><h1>${a.nome}</h1></div>
          </div>
          <p style="font-size:1.1rem">${a.descricao}</p>
          <div class="bloco"><h3>O que ele faz</h3><ul class="lista-check">${a.funcoes.map((f) => `<li>${f}</li>`).join("")}</ul></div>
          <div class="bloco"><h3>Ideal para</h3><div class="tags">${a.paraQuem.map((p) => `<span class="tag">${p}</span>`).join("")}</div></div>
          <div class="bloco"><h3>Conecta com</h3><div class="tags">${a.integracoes.map((p) => `<span class="tag">${p}</span>`).join("")}</div></div>
        </div>
        <aside class="card lateral">
          <h3>Escolha seu plano</h3>
          <label class="plano-opcao">
            <input type="radio" name="plano" value="essencial">
            <b>Essencial</b><span class="valor">${reais(a.essencial)}/mês</span>
            <small>Você paga a IA direto na sua conta</small>
          </label>
          <label class="plano-opcao">
            <input type="radio" name="plano" value="completo" checked>
            <b>Completo</b><span class="valor">${reais(a.completo)}/mês</span>
            <small>Tudo incluso, até 1.000 conversas/mês</small>
          </label>
          <div class="linha-info"><span class="muted">Instalação (pagamento único)</span><b>${reais(a.instalacao)}</b></div>
          <div class="linha-info"><span class="muted">Prazo de entrega</span><b>${a.prazo}</b></div>
          <a id="btn-contratar" href="#/contratar?agente=${a.id}" class="btn btn-pri btn-bloco">Quero contratar</a>
          <p class="aviso" style="text-align:center;margin-top:10px"><a href="#/planos" style="text-decoration:underline">Entenda a diferença entre os planos</a></p>
        </aside>
      </div>
    </div></section>
    ${parecidos.length ? `
    <section class="secao secao-alt"><div class="container">
      <h2>Outros agentes de ${a.categoria}</h2>
      <div class="grade">${parecidos.map(cardAgente).join("")}</div>
    </div></section>` : ""}`;
}

function paginaPlanos() {
  const plano = (key, p) => `
    <div class="card plano${p.destaque ? " destaque" : ""}">
      ${p.destaque ? '<span class="selo">Mais escolhido</span>' : ""}
      <h3>${p.nome}</h3>
      <p class="muted">${p.resumo}</p>
      <div class="preco">a partir de <b>${reais(menorPreco(key))}</b>/mês</div>
      <ul class="lista-check">${p.itens.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a href="#/contratar?plano=${key}" class="btn ${p.destaque ? "btn-pri" : "btn-sec"} btn-bloco">Quero o plano ${p.nome}</a>
    </div>`;
  return `
    <section class="secao"><div class="container">
      <div class="secao-titulo">
        <span class="etiqueta">Planos</span>
        <h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">Escolha como quer pagar a IA</h1>
        <p>Todo agente tem uma taxa única de instalação e uma mensalidade. A diferença entre os planos é quem paga o uso da inteligência artificial.</p>
      </div>
      <div class="planos">${plano("essencial", PLANOS.essencial)}${plano("completo", PLANOS.completo)}</div>

      <div class="tabela-wrap">
        <table>
          <thead><tr><th>Agente</th><th>Instalação</th><th>Essencial</th><th>Completo</th></tr></thead>
          <tbody>
            ${AGENTES.map((a) => `<tr><td><a href="#/agente/${a.id}">${a.icone} ${a.nome}</a></td><td>${reais(a.instalacao)}</td><td>${reais(a.essencial)}/mês</td><td>${reais(a.completo)}/mês</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div></section>

    <section class="secao secao-alt"><div class="container">
      <div class="secao-titulo"><h2>Perguntas frequentes</h2></div>
      ${faqHTML()}
    </div></section>`;
}

function faqHTML() {
  const perguntas = [
    ["Qual a diferença entre os planos?", "No Essencial, você cria uma conta na OpenAI ou na Anthropic e paga o uso da IA direto para eles. No Completo, esse custo já está incluso na mensalidade, com até 1.000 conversas por mês."],
    ["O que acontece se passar de 1.000 conversas no plano Completo?", "Avisamos você antes e cobramos um pacote extra de R$ 50 a cada 500 conversas. Nada é cobrado sem aviso."],
    ["Quanto custa a IA no plano Essencial?", "Depende do uso. Para uma empresa pequena, costuma ficar entre R$ 10 e R$ 100 por mês. Ajudamos você a configurar limites de gasto na sua conta."],
    ["Preciso entender de tecnologia?", "Não. Nós instalamos, configuramos e mantemos o agente. Você só nos passa as informações da sua empresa."],
    ["Tem fidelidade?", "Não. Você pode cancelar a mensalidade quando quiser. A taxa de instalação é paga uma única vez."],
    ["Meus dados ficam seguros?", "Os agentes acessam apenas o que é necessário para funcionar, e cada um é testado pela nossa equipe antes de ser publicado."],
  ];
  return `<div class="faq">${perguntas.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join("")}</div>`;
}

function paginaComoFunciona() {
  return `
    <section class="secao"><div class="container">
      <div class="secao-titulo">
        <span class="etiqueta">Como funciona</span>
        <h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">Simples para você, completo por trás</h1>
        <p>Um agente de IA precisa ser instalado num servidor, conectado aos sistemas da sua empresa e ligado a uma inteligência artificial. Nós cuidamos de tudo isso.</p>
      </div>
      ${passosHTML()}
    </div></section>
    <section class="secao secao-alt"><div class="container">
      <div class="secao-titulo">
        <span class="etiqueta">Para criadores de agentes</span>
        <h2>Você cria agentes de IA?</h2>
        <p>Anuncie seus agentes na Loja de IA e alcance empresas que já estão procurando automação. Você define o preço e recebe por cada venda.</p>
        <a href="#/vender" class="btn btn-pri">Quero vender meu agente</a>
      </div>
    </div></section>
    <section class="secao"><div class="container">
      <div class="secao-titulo"><h2>Perguntas frequentes</h2></div>
      ${faqHTML()}
    </div></section>`;
}

function paginaContratar(params) {
  const agenteSel = params.get("agente") || "";
  const planoSel = params.get("plano") || "completo";
  setTimeout(() => ligarFormulario("form-contratar", (d) => {
    const ag = acharAgente(d.agente);
    return [
      `Olá! Quero contratar um agente de IA.`,
      ``,
      `*Agente:* ${ag ? ag.nome : "Ainda não sei, quero ajuda para escolher"}`,
      `*Plano:* ${PLANOS[d.plano] ? PLANOS[d.plano].nome : "Quero ajuda para escolher"}`,
      `*Nome:* ${d.nome}`,
      `*Empresa:* ${d.empresa}`,
      `*WhatsApp:* ${d.telefone}`,
      `*E-mail:* ${d.email}`,
      d.mensagem ? `*O que preciso:* ${d.mensagem}` : "",
    ].filter((l) => l !== "").join("\n");
  }, "Recebemos seu pedido!", "Abrimos o WhatsApp com seus dados. É só enviar a mensagem que respondemos em até 1 dia útil."), 0);
  return `
    <section class="secao"><div class="container">
      <div class="form-wrap">
        <div>
          <span class="etiqueta">Quero contratar</span>
          <h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">Vamos colocar a IA para trabalhar na sua empresa</h1>
          <p class="muted">Preencha os dados e falamos com você pelo WhatsApp para entender sua necessidade, tirar dúvidas e combinar a instalação.</p>
          <ul class="lista-check">
            <li>Resposta em até 1 dia útil</li>
            <li>Sem compromisso: só fechamos se fizer sentido</li>
            <li>Ajudamos a escolher o agente e o plano</li>
          </ul>
        </div>
        <div class="card" id="form-contratar-box">
          <form class="form" id="form-contratar">
            <div class="campo"><label for="agente">Agente</label>
              <select id="agente" name="agente">
                <option value="">Ainda não sei, quero ajuda</option>
                ${AGENTES.map((a) => `<option value="${a.id}"${a.id === agenteSel ? " selected" : ""}>${a.nome}</option>`).join("")}
              </select></div>
            <div class="campo"><label for="plano">Plano</label>
              <select id="plano" name="plano">
                <option value="completo"${planoSel === "completo" ? " selected" : ""}>Completo (tudo incluso)</option>
                <option value="essencial"${planoSel === "essencial" ? " selected" : ""}>Essencial (pago a IA direto)</option>
                <option value="ajuda">Quero ajuda para escolher</option>
              </select></div>
            <div class="duas">
              <div class="campo"><label for="nome">Seu nome</label><input id="nome" name="nome" required autocomplete="name"></div>
              <div class="campo"><label for="empresa">Empresa</label><input id="empresa" name="empresa" required autocomplete="organization"></div>
            </div>
            <div class="duas">
              <div class="campo"><label for="telefone">WhatsApp</label><input id="telefone" name="telefone" type="tel" required placeholder="(11) 99999-9999" autocomplete="tel"></div>
              <div class="campo"><label for="email">E-mail</label><input id="email" name="email" type="email" required autocomplete="email"></div>
            </div>
            <div class="campo"><label for="mensagem">O que você quer automatizar? (opcional)</label><textarea id="mensagem" name="mensagem" placeholder="Ex.: recebo 100 mensagens por dia no WhatsApp e não consigo responder todas."></textarea></div>
            <button class="btn btn-pri btn-bloco" type="submit">Quero contratar</button>
            <p class="aviso">Ao enviar, abriremos o WhatsApp com seus dados preenchidos.</p>
          </form>
        </div>
      </div>
    </div></section>`;
}

function paginaVender() {
  setTimeout(() => ligarFormulario("form-vender", (d) => [
    `Olá! Quero vender meu agente na Loja de IA.`,
    ``,
    `*Nome:* ${d.nome}`,
    `*WhatsApp:* ${d.telefone}`,
    `*E-mail:* ${d.email}`,
    `*Agente:* ${d.agente}`,
    `*Categoria:* ${d.categoria}`,
    `*Feito com:* ${d.ferramenta}`,
    `*O que ele faz:* ${d.descricao}`,
    d.link ? `*Demonstração:* ${d.link}` : "",
  ].filter((l) => l !== "").join("\n"),
  "Cadastro enviado!", "Abrimos o WhatsApp com os dados do seu agente. Envie a mensagem e nossa equipe vai avaliar e testar o agente."), 0);
  return `
    <section class="secao"><div class="container">
      <div class="form-wrap">
        <div>
          <span class="etiqueta">Para criadores</span>
          <h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">Venda seus agentes de IA para empresas</h1>
          <p class="muted">Você cria o agente, nós trazemos os clientes. Cuidamos da vitrine, do atendimento comercial e do contrato.</p>
          <ul class="lista-check">
            <li>Cadastro gratuito</li>
            <li>Você só paga comissão quando vender</li>
            <li>Empresas que já procuram automação</li>
            <li>Selo de agente testado e aprovado</li>
          </ul>
          <div class="card" style="margin-top:20px">
            <h3>Como funciona</h3>
            <p class="muted" style="margin:0">1. Envie seu agente → 2. Nossa equipe testa → 3. Publicamos no catálogo → 4. Você recebe por cada contratação.</p>
          </div>
        </div>
        <div class="card" id="form-vender-box">
          <form class="form" id="form-vender">
            <div class="duas">
              <div class="campo"><label for="v-nome">Seu nome</label><input id="v-nome" name="nome" required autocomplete="name"></div>
              <div class="campo"><label for="v-telefone">WhatsApp</label><input id="v-telefone" name="telefone" type="tel" required placeholder="(11) 99999-9999" autocomplete="tel"></div>
            </div>
            <div class="campo"><label for="v-email">E-mail</label><input id="v-email" name="email" type="email" required autocomplete="email"></div>
            <div class="campo"><label for="v-agente">Nome do agente</label><input id="v-agente" name="agente" required placeholder="Ex.: Atendente para clínicas"></div>
            <div class="duas">
              <div class="campo"><label for="v-categoria">Categoria</label>
                <select id="v-categoria" name="categoria">${CATEGORIAS.map((c) => `<option>${c}</option>`).join("")}<option>Outra</option></select></div>
              <div class="campo"><label for="v-ferramenta">Feito com</label>
                <select id="v-ferramenta" name="ferramenta">
                  <option>n8n</option><option>Make</option><option>Dify</option><option>Flowise</option><option>GPTs (OpenAI)</option><option>Código próprio (Python, Node...)</option><option>Outra</option>
                </select></div>
            </div>
            <div class="campo"><label for="v-descricao">O que ele faz?</label><textarea id="v-descricao" name="descricao" required placeholder="Explique o problema que ele resolve e para que tipo de empresa."></textarea></div>
            <div class="campo"><label for="v-link">Link de demonstração (opcional)</label><input id="v-link" name="link" type="url" placeholder="https://"></div>
            <button class="btn btn-pri btn-bloco" type="submit">Quero vender meu agente</button>
            <p class="aviso">Ao enviar, abriremos o WhatsApp com os dados preenchidos.</p>
          </form>
        </div>
      </div>
    </div></section>`;
}

function paginaNaoEncontrada() {
  return `<section class="secao"><div class="container vazio">
    <h1>Página não encontrada</h1>
    <p>O endereço que você abriu não existe.</p>
    <a href="#/" class="btn btn-pri">Voltar ao início</a>
  </div></section>`;
}

// ---------- Formulário → WhatsApp ----------
function ligarFormulario(formId, montarMensagem, titulo, texto) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form).entries());
    const msg = montarMensagem(dados);
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
    document.getElementById(formId + "-box").innerHTML = `
      <div class="sucesso">
        <div class="grande">✅</div>
        <h2>${titulo}</h2>
        <p class="muted">${texto}</p>
        <p class="aviso">O WhatsApp não abriu? <a href="${url}" target="_blank" rel="noopener" style="color:var(--accent-text);text-decoration:underline">Clique aqui</a>.</p>
        <a href="#/catalogo" class="btn btn-sec" style="margin-top:12px">Ver mais agentes</a>
      </div>`;
  });
}

// ---------- Rotas ----------
function rotear() {
  const hash = location.hash.slice(1) || "/";
  const [caminho, query] = hash.split("?");
  const params = new URLSearchParams(query || "");
  const partes = caminho.split("/").filter(Boolean);
  document.title = "Loja de IA · Agentes de IA prontos para sua empresa";

  let html;
  switch (partes[0]) {
    case undefined: html = paginaInicio(); break;
    case "catalogo": html = paginaCatalogo(params); break;
    case "agente": html = paginaAgente(partes[1]); break;
    case "planos": html = paginaPlanos(); break;
    case "como-funciona": html = paginaComoFunciona(); break;
    case "contratar": html = paginaContratar(params); break;
    case "vender": html = paginaVender(); break;
    default: html = paginaNaoEncontrada();
  }
  app.innerHTML = html;
  window.scrollTo(0, 0);

  document.querySelectorAll(".menu a").forEach((a) => {
    a.classList.toggle("ativo", a.getAttribute("href") === "#/" + (partes[0] || ""));
  });
  menu.classList.remove("aberto");
  menuBtn.setAttribute("aria-expanded", "false");
}

const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", String(aberto));
});
document.getElementById("ano").textContent = new Date().getFullYear();
window.addEventListener("hashchange", rotear);
rotear();
