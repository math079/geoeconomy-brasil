export type GuideArticle = {
  slug: string;
  title: string;
  level: "Iniciante" | "Intermediário";
  summary: string;
  sections: { heading: string; body: string }[];
};

export const GUIDE: GuideArticle[] = [
  {
    slug: "selic",
    title: "O que é a Selic e por que ela mexe com tudo",
    level: "Iniciante",
    summary: "A taxa básica de juros do Brasil influencia crédito, investimentos e até o dólar.",
    sections: [
      { heading: "Definição", body: "A Selic é a taxa básica de juros da economia brasileira. Ela é definida pelo Copom (Comitê de Política Monetária do Banco Central) a cada 45 dias e serve de referência para todas as outras taxas do país." },
      { heading: "Para que serve", body: "O Banco Central usa a Selic como principal ferramenta para controlar a inflação. Juros altos encarecem o crédito, desestimulam o consumo e seguram os preços. Juros baixos fazem o contrário: estimulam a economia, mas podem pressionar a inflação." },
      { heading: "Impacto no seu bolso", body: "Com Selic alta, a renda fixa (Tesouro Selic, CDBs) rende mais e a bolsa tende a sofrer, pois o investidor encontra retorno seguro sem risco. Com Selic baixa, o dinheiro migra para ativos de risco, como ações e fundos imobiliários." },
    ],
  },
  {
    slug: "inflacao-ipca",
    title: "Inflação e IPCA: o dragão que corrói seu dinheiro",
    level: "Iniciante",
    summary: "Entenda como a inflação é medida e por que seu investimento precisa superá-la.",
    sections: [
      { heading: "O que é inflação", body: "Inflação é o aumento generalizado dos preços ao longo do tempo. Se a inflação do ano foi de 5%, o mesmo dinheiro compra 5% menos coisas do que um ano antes." },
      { heading: "IPCA", body: "O IPCA, calculado pelo IBGE, é o índice oficial de inflação do Brasil. O governo define uma meta anual, e o Banco Central ajusta a Selic para tentar cumpri-la." },
      { heading: "Ganho real", body: "Rendimento real é o que sobra depois de descontar a inflação. Um investimento que rende 10% ao ano com inflação de 5% teve ganho real de aproximadamente 4,8%. Sempre compare seus retornos com o IPCA." },
    ],
  },
  {
    slug: "renda-fixa-x-variavel",
    title: "Renda fixa x renda variável",
    level: "Iniciante",
    summary: "As duas grandes famílias de investimento e quando usar cada uma.",
    sections: [
      { heading: "Renda fixa", body: "Na renda fixa você empresta dinheiro (para o governo, um banco ou uma empresa) e as regras de remuneração são conhecidas na hora da aplicação. Exemplos: Tesouro Direto, CDB, LCI, LCA e debêntures." },
      { heading: "Renda variável", body: "Na renda variável o retorno não é previsível: depende do mercado. Exemplos: ações, fundos imobiliários (FIIs), ETFs e criptomoedas. O potencial de ganho é maior, mas o risco também." },
      { heading: "Como combinar", body: "Uma regra comum é ter primeiro uma reserva de emergência em renda fixa com liquidez diária. Depois, distribua o restante conforme seu perfil e prazo: quanto mais longo o prazo, mais espaço para renda variável." },
    ],
  },
  {
    slug: "tesouro-direto",
    title: "Tesouro Direto: emprestando para o governo",
    level: "Iniciante",
    summary: "Os títulos públicos mais populares e como escolher entre eles.",
    sections: [
      { heading: "Tesouro Selic", body: "Acompanha a taxa Selic. É o título mais indicado para reserva de emergência, pois oscila muito pouco e pode ser resgatado a qualquer dia útil." },
      { heading: "Tesouro Prefixado", body: "Você sabe exatamente quanto vai receber no vencimento. Bom quando você acredita que os juros vão cair. Se vender antes do vencimento, pode ter perda (marcação a mercado)." },
      { heading: "Tesouro IPCA+", body: "Paga a inflação mais uma taxa fixa, garantindo ganho real. Ideal para objetivos de longo prazo, como aposentadoria." },
    ],
  },
  {
    slug: "cdb-lci-lca",
    title: "CDB, LCI e LCA",
    level: "Iniciante",
    summary: "Títulos bancários, o que é o FGC e a vantagem da isenção de IR.",
    sections: [
      { heading: "CDB", body: "O Certificado de Depósito Bancário é um empréstimo que você faz a um banco. Geralmente rende um percentual do CDI (ex.: 110% do CDI). Tem cobrança de Imposto de Renda regressivo." },
      { heading: "LCI e LCA", body: "Letras de Crédito Imobiliário e do Agronegócio funcionam como o CDB, mas são isentas de IR para pessoa física. Por isso, 90% do CDI em uma LCI pode valer mais que 110% do CDI em um CDB." },
      { heading: "FGC", body: "O Fundo Garantidor de Créditos protege até R$ 250 mil por CPF e por instituição em CDBs, LCIs e LCAs, caso o banco quebre." },
    ],
  },
  {
    slug: "acoes",
    title: "Ações: virando sócio de uma empresa",
    level: "Iniciante",
    summary: "Como funciona a bolsa, o que é um ticker e como se ganha dinheiro com ações.",
    sections: [
      { heading: "O que é uma ação", body: "Uma ação é um pedaço de uma empresa. Ao comprar, você vira sócio e participa dos lucros e do crescimento dela. No Brasil, as ações são negociadas na B3." },
      { heading: "Tickers", body: "Cada ação tem um código: quatro letras e um número. Final 3 indica ação ordinária (ON, com direito a voto), final 4 indica preferencial (PN, prioridade nos dividendos). Ex.: PETR4, VALE3." },
      { heading: "Como se ganha", body: "De duas formas: valorização (vender mais caro do que comprou) e proventos (dividendos e juros sobre capital próprio). Para o pequeno investidor, pensar no longo prazo costuma funcionar melhor do que tentar adivinhar o curto prazo." },
    ],
  },
  {
    slug: "fiis",
    title: "Fundos imobiliários (FIIs)",
    level: "Iniciante",
    summary: "Renda mensal com imóveis, sem precisar comprar um apartamento.",
    sections: [
      { heading: "O que são", body: "FIIs reúnem dinheiro de vários investidores para comprar imóveis (shoppings, galpões, escritórios) ou títulos ligados ao setor. As cotas são negociadas na bolsa, com final 11 (ex.: HGLG11)." },
      { heading: "Rendimentos", body: "Os FIIs costumam distribuir aluguéis mensalmente, e esses rendimentos são isentos de IR para pessoa física, dentro das regras vigentes." },
      { heading: "Tipos", body: "Fundos de tijolo têm imóveis físicos; fundos de papel investem em títulos como CRIs. Fundos de fundos (FOFs) compram cotas de outros FIIs." },
    ],
  },
  {
    slug: "dividendos",
    title: "Dividendos e JCP",
    level: "Intermediário",
    summary: "Como as empresas dividem o lucro com os acionistas.",
    sections: [
      { heading: "Dividendos", body: "Parte do lucro que a empresa distribui aos acionistas. No Brasil, as empresas são obrigadas a distribuir ao menos 25% do lucro líquido ajustado, salvo exceções no estatuto." },
      { heading: "Juros sobre capital próprio", body: "Outra forma de remuneração, com vantagem fiscal para a empresa. Para o investidor, há retenção de 15% de IR na fonte." },
      { heading: "Dividend yield", body: "É o quanto a ação pagou em proventos nos últimos 12 meses dividido pelo preço atual. Um yield alto pode ser ótimo, ou sinal de que o preço caiu por problemas. Sempre investigue." },
    ],
  },
  {
    slug: "diversificacao",
    title: "Diversificação e perfil de risco",
    level: "Iniciante",
    summary: "Não coloque todos os ovos na mesma cesta.",
    sections: [
      { heading: "Por que diversificar", body: "Ativos diferentes reagem de formas diferentes aos mesmos eventos. Misturar classes (renda fixa, ações, FIIs, exterior) reduz o risco total da carteira sem necessariamente reduzir o retorno." },
      { heading: "Perfil do investidor", body: "Conservador, moderado ou arrojado: o perfil depende do seu prazo, objetivos e tolerância a ver o patrimônio oscilar. Corretoras aplicam um questionário (suitability) para ajudar." },
      { heading: "Rebalanceamento", body: "Defina percentuais-alvo por classe e, periodicamente, ajuste a carteira para voltar a eles. Isso força você a vender o que subiu muito e comprar o que ficou barato." },
    ],
  },
  {
    slug: "cambio-geopolitica",
    title: "Câmbio e geopolítica: por que o dólar sobe",
    level: "Intermediário",
    summary: "Como eventos globais e juros de outros países afetam o real.",
    sections: [
      { heading: "Fluxo de capital", body: "Quando os juros nos EUA sobem, o capital tende a sair de emergentes como o Brasil em busca de segurança, valorizando o dólar frente ao real." },
      { heading: "Risco e commodities", body: "O Brasil é grande exportador de commodities (minério, petróleo, soja). Alta nesses preços traz dólares para o país e fortalece o real. Crises globais e guerras aumentam a aversão a risco e enfraquecem moedas emergentes." },
      { heading: "Fatores domésticos", body: "Incerteza fiscal (gastos do governo maiores que a arrecadação) aumenta o risco percebido e pressiona o câmbio. Por isso, notícias de Brasília também mexem com o dólar." },
    ],
  },
  {
    slug: "ler-balanco",
    title: "Como ler um balanço (o básico)",
    level: "Intermediário",
    summary: "Os indicadores essenciais para avaliar uma empresa.",
    sections: [
      { heading: "Receita, lucro e margem", body: "Receita é o quanto a empresa vende; lucro líquido é o que sobra depois de todos os custos e impostos. A margem líquida (lucro ÷ receita) mostra a eficiência do negócio." },
      { heading: "P/L e ROE", body: "O P/L (preço ÷ lucro por ação) indica quantos anos de lucro você paga pela ação. O ROE (lucro ÷ patrimônio líquido) mostra quanto a empresa gera de retorno com o dinheiro dos sócios." },
      { heading: "Dívida", body: "A relação Dívida Líquida/EBITDA mostra quantos anos de geração de caixa operacional seriam necessários para pagar a dívida. Acima de 3x costuma acender um alerta, dependendo do setor." },
    ],
  },
];

export const getArticle = (slug: string) => GUIDE.find((a) => a.slug === slug);
