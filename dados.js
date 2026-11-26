// =============================================================
//  CONFIGURAÇÃO DA LOJA — edite aqui
// =============================================================
const CONFIG = {
  nomeLoja: "Loja de IA",
  // Seu número de WhatsApp com DDI e DDD, só números (ex.: 5511999998888)
  whatsapp: "5534991287810",
};

// =============================================================
//  PLANOS (valores de exemplo — ajuste depois dos primeiros clientes)
// =============================================================
const PLANOS = {
  essencial: {
    nome: "Essencial",
    resumo: "Você paga a IA direto na sua conta (OpenAI ou Anthropic). Nós instalamos e mantemos.",
    itens: [
      "Instalação e configuração do agente",
      "Servidor e manutenção inclusos",
      "Custo da IA pago direto por você, sem intermediário",
      "Suporte por WhatsApp em horário comercial",
    ],
  },
  completo: {
    nome: "Completo",
    resumo: "Tudo incluso. Você não precisa criar conta em lugar nenhum.",
    itens: [
      "Instalação e configuração do agente",
      "Servidor, manutenção e custo da IA inclusos",
      "Até 1.000 conversas por mês",
      "Pacote extra: + R$ 50 a cada 500 conversas",
      "Suporte prioritário por WhatsApp",
    ],
    destaque: true,
  },
};

// =============================================================
//  CATEGORIAS E AGENTES DO CATÁLOGO
//  Para adicionar um agente, copie um bloco e mude os campos.
// =============================================================
const CATEGORIAS = ["Atendimento", "Vendas", "Marketing", "Financeiro", "Produtividade"];

const AGENTES = [
  {
    id: "atendente-whatsapp",
    nome: "Atendente de WhatsApp",
    icone: "💬",
    categoria: "Atendimento",
    curta: "Responde clientes no WhatsApp 24 horas, tira dúvidas e passa para um humano quando precisa.",
    descricao: "Um atendente virtual que conversa com seus clientes no WhatsApp a qualquer hora. Ele aprende sobre sua empresa (produtos, preços, horários, políticas) e responde de forma natural. Quando a conversa exige uma pessoa, ele avisa sua equipe e transfere o atendimento.",
    paraQuem: ["Lojas e comércios", "Clínicas e consultórios", "Prestadores de serviço", "Qualquer empresa que recebe muitas mensagens"],
    funcoes: ["Responde dúvidas frequentes na hora", "Envia catálogo, preços e horários", "Coleta nome, telefone e o que o cliente precisa", "Transfere para um humano quando necessário", "Funciona 24 horas, inclusive fins de semana"],
    integracoes: ["WhatsApp Business", "Google Planilhas", "E-mail"],
    instalacao: 800, essencial: 190, completo: 390,
    prazo: "5 a 7 dias úteis",
    popular: true,
  },
  {
    id: "agendamento",
    nome: "Agente de Agendamento",
    icone: "📅",
    categoria: "Atendimento",
    curta: "Marca, confirma e remarca horários sozinho, direto na sua agenda.",
    descricao: "O cliente pede um horário pelo WhatsApp ou pelo site e o agente verifica sua agenda, oferece os horários livres, marca o compromisso e envia lembrete antes. Reduz faltas e libera sua equipe do vai-e-vem de mensagens.",
    paraQuem: ["Clínicas, dentistas e psicólogos", "Salões e barbearias", "Consultores e advogados", "Academias e estúdios"],
    funcoes: ["Mostra horários livres em tempo real", "Agenda e cancela automaticamente", "Envia lembrete 1 dia antes", "Remarca a pedido do cliente", "Avisa você de cada novo horário"],
    integracoes: ["Google Agenda", "WhatsApp Business", "E-mail"],
    instalacao: 700, essencial: 170, completo: 340,
    prazo: "5 a 7 dias úteis",
    popular: true,
  },
  {
    id: "faq-site",
    nome: "Chat Inteligente para Site",
    icone: "🌐",
    categoria: "Atendimento",
    curta: "Um chat no seu site que responde visitantes e transforma curiosos em contatos.",
    descricao: "Uma janelinha de chat no seu site que conhece seus produtos e serviços e responde os visitantes na hora. Quando a pessoa demonstra interesse, o agente pede o contato e envia para você.",
    paraQuem: ["Empresas com site", "E-commerces", "Escolas e cursos", "Imobiliárias"],
    funcoes: ["Responde perguntas sobre seus produtos", "Captura nome, e-mail e WhatsApp", "Indica a página certa do site", "Envia os contatos para você"],
    integracoes: ["Qualquer site", "WordPress", "E-mail", "Google Planilhas"],
    instalacao: 600, essencial: 150, completo: 290,
    prazo: "3 a 5 dias úteis",
  },
  {
    id: "qualificacao-leads",
    nome: "Qualificador de Leads",
    icone: "🎯",
    categoria: "Vendas",
    curta: "Conversa com novos contatos, descobre quem está pronto para comprar e avisa seu vendedor.",
    descricao: "Cada novo contato que chega (anúncio, site, Instagram) recebe uma conversa rápida do agente, que faz as perguntas certas, entende o interesse e o orçamento e classifica o lead. Seu vendedor recebe só quem vale a pena, com um resumo pronto.",
    paraQuem: ["Equipes de vendas", "Imobiliárias", "Empresas que anunciam na internet", "Prestadores de serviço B2B"],
    funcoes: ["Responde o lead em segundos", "Faz perguntas de qualificação", "Classifica: quente, morno ou frio", "Envia resumo para o vendedor", "Registra tudo numa planilha ou CRM"],
    integracoes: ["WhatsApp Business", "Formulários do site", "Google Planilhas", "CRMs (RD Station, HubSpot, Pipedrive)"],
    instalacao: 900, essencial: 220, completo: 450,
    prazo: "7 a 10 dias úteis",
    popular: true,
  },
  {
    id: "orcamentos",
    nome: "Gerador de Orçamentos",
    icone: "🧾",
    categoria: "Vendas",
    curta: "Recebe o pedido do cliente e monta um orçamento pronto em minutos.",
    descricao: "O cliente diz o que precisa e o agente monta o orçamento com base na sua tabela de preços, envia em PDF ou mensagem e acompanha se ele foi aprovado. Ideal para quem perde vendas pela demora em responder orçamentos.",
    paraQuem: ["Gráficas e personalizados", "Construção e reformas", "Eventos e buffets", "Oficinas e assistências técnicas"],
    funcoes: ["Entende o pedido do cliente", "Calcula pela sua tabela de preços", "Envia o orçamento formatado", "Lembra o cliente se ele não respondeu"],
    integracoes: ["WhatsApp Business", "E-mail", "Google Planilhas"],
    instalacao: 900, essencial: 200, completo: 420,
    prazo: "7 a 10 dias úteis",
  },
  {
    id: "pos-venda",
    nome: "Pós-venda e Avaliações",
    icone: "⭐",
    categoria: "Marketing",
    curta: "Fala com o cliente depois da compra, pede avaliação no Google e traz ele de volta.",
    descricao: "Depois de cada venda, o agente envia uma mensagem de agradecimento, pergunta como foi a experiência, pede uma avaliação no Google e, no momento certo, oferece uma nova compra. Mais avaliações e mais clientes voltando.",
    paraQuem: ["Restaurantes e delivery", "Lojas físicas e online", "Clínicas e salões", "Prestadores de serviço"],
    funcoes: ["Mensagem de agradecimento após a compra", "Pesquisa de satisfação", "Pedido de avaliação no Google", "Alerta você sobre clientes insatisfeitos", "Ofertas para recompra"],
    integracoes: ["WhatsApp Business", "E-mail", "Google Meu Negócio"],
    instalacao: 600, essencial: 150, completo: 300,
    prazo: "5 a 7 dias úteis",
  },
  {
    id: "conteudo-redes",
    nome: "Criador de Conteúdo para Redes",
    icone: "📱",
    categoria: "Marketing",
    curta: "Cria ideias, legendas e calendário de posts para Instagram e LinkedIn toda semana.",
    descricao: "O agente conhece o jeito da sua marca e entrega toda semana um pacote de posts: ideias, legendas, hashtags e sugestões de imagem. Você só revisa e publica.",
    paraQuem: ["Pequenas empresas sem equipe de marketing", "Profissionais liberais", "Lojas e marcas locais"],
    funcoes: ["Calendário semanal de posts", "Legendas no tom da sua marca", "Ideias de Reels e carrosséis", "Hashtags e chamadas para ação"],
    integracoes: ["E-mail", "Google Docs", "Notion"],
    instalacao: 500, essencial: 140, completo: 280,
    prazo: "3 a 5 dias úteis",
  },
  {
    id: "cobranca",
    nome: "Cobrança Amigável",
    icone: "💰",
    categoria: "Financeiro",
    curta: "Lembra clientes de pagamentos em aberto com educação e envia o link ou o Pix.",
    descricao: "O agente acompanha os pagamentos pendentes e envia lembretes educados antes e depois do vencimento, com o link de pagamento ou a chave Pix. Negocia prazos simples e avisa você quando precisa de atenção.",
    paraQuem: ["Escolas e cursos", "Academias", "Prestadores de serviço com mensalidade", "Lojas que vendem a prazo"],
    funcoes: ["Lembrete antes do vencimento", "Cobrança gentil após o vencimento", "Envio de Pix ou link de pagamento", "Relatório de quem pagou e quem não pagou"],
    integracoes: ["WhatsApp Business", "E-mail", "Google Planilhas", "Asaas, Mercado Pago"],
    instalacao: 800, essencial: 180, completo: 360,
    prazo: "5 a 7 dias úteis",
  },
  {
    id: "email-inteligente",
    nome: "Assistente de E-mails",
    icone: "✉️",
    categoria: "Produtividade",
    curta: "Lê, organiza e rascunha respostas para os e-mails da empresa.",
    descricao: "O agente lê sua caixa de entrada, separa o que é importante, identifica pedidos de clientes e já deixa rascunhos de resposta prontos para você revisar e enviar. Economiza horas por semana.",
    paraQuem: ["Escritórios", "Gestores e donos de empresa", "Equipes de atendimento por e-mail"],
    funcoes: ["Classifica e prioriza e-mails", "Rascunha respostas no seu estilo", "Resumo diário da caixa de entrada", "Avisa sobre e-mails urgentes"],
    integracoes: ["Gmail", "Outlook"],
    instalacao: 600, essencial: 150, completo: 290,
    prazo: "3 a 5 dias úteis",
  },
  {
    id: "resumo-reunioes",
    nome: "Resumo de Reuniões",
    icone: "📝",
    categoria: "Produtividade",
    curta: "Transforma gravações de reuniões em resumo, decisões e lista de tarefas.",
    descricao: "Envie a gravação ou a transcrição da reunião e o agente devolve um resumo claro, as decisões tomadas e quem ficou responsável por cada tarefa. Tudo enviado por e-mail para os participantes.",
    paraQuem: ["Equipes que fazem muitas reuniões", "Agências", "Consultorias", "Empresas com trabalho remoto"],
    funcoes: ["Resumo em poucos parágrafos", "Lista de decisões", "Tarefas com responsáveis", "Envio automático por e-mail"],
    integracoes: ["Google Meet", "Zoom", "Google Drive", "E-mail"],
    instalacao: 500, essencial: 120, completo: 250,
    prazo: "3 a 5 dias úteis",
  },
];
