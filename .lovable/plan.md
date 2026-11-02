# GeoEconomy: site da comunidade

Um portal com cara de revista sobre economia e geopolítica. Ele junta notícias dos principais sites, ensina o básico de economia e investimentos, mostra a bolsa e tem um fórum para a comunidade debater.

## Visual
- Paleta Noir & Gold: fundo quase preto (#0d0d0d / #1a1a1a), detalhes em dourado (#c9a84c / #f0d78c).
- Títulos em Libre Baskerville (estilo jornal clássico) e textos em IBM Plex Sans.
- Layout de revista: uma manchete grande em destaque, uma grade de notícias abaixo e uma faixa fina com cotações no topo.
- Todo o site em português.

## Páginas
1. **Início (/)**: faixa com cotações (Ibovespa, dólar, euro, bitcoin, Selic), manchete principal, últimas notícias, chamadas para o guia e para o fórum.
2. **Notícias (/noticias)**: feed de várias fontes (InfoMoney, Valor Econômico, Exame, Money Times, CNN Brasil Economia e outras). Filtros por fonte e por tema (Economia, Mercado, Geopolítica). Cada card mostra o título, a fonte, o horário e um link para a matéria original.
3. **Guia (/guia)** e **artigo (/guia/$slug)**: conteúdo para iniciantes, como Selic, inflação e IPCA, renda fixa x variável, Tesouro Direto, CDB, ações, FIIs, dividendos, diversificação, câmbio e como ler um balanço. O texto inicial será escrito por mim, e você pode revisar depois.
4. **Bolsa (/bolsa)**: índices, câmbio e as principais ações da B3 (PETR4, VALE3, ITUB4 e outras), com variação do dia e um gráfico simples.
5. **Fórum (/forum)**, **tópico (/forum/$id)** e **novo tópico**: qualquer pessoa pode ler. Para criar tópicos e responder, é preciso entrar com uma conta. As categorias são Economia BR, Bolsa, Geopolítica, Iniciantes e Cripto.
6. **Entrar / Cadastro (/auth)**: e-mail e senha, além de login com Google. Cada membro tem um perfil com nome de exibição.

## Como as notícias e cotações chegam
- **Notícias**: o site lê os feeds públicos (RSS) de cada portal pelo servidor e guarda o resultado por alguns minutos. Mostramos só o título e o resumo, com um link para o site original, para respeitar os direitos autorais. Se algum portal não tiver feed, uso a busca do Google Notícias filtrada por esse site.
- **Cotações**: vêm de um serviço gratuito de dados da B3 (brapi.dev) e de uma API de câmbio. Os valores podem ter atraso de cerca de 15 minutos.

## Detalhes técnicos
- Lovable Cloud para contas, perfis (`profiles`), tópicos (`forum_threads`) e respostas (`forum_posts`). A leitura é pública, e só o autor pode escrever ou editar o próprio conteúdo. Os GRANTs e as políticas de segurança de linha (RLS) ficam na mesma migração.
- `createServerFn` busca e interpreta os RSS (parser que funciona em Workers) e as cotações. Os dados são guardados com TanStack Query, usando ensureQueryData nos loaders.
- Os artigos do guia ficam como conteúdo estático em um módulo TS.
- Cada rota tem seu próprio head() com título e descrição em PT-BR.
- Se o brapi exigir token para algumas ações, peço o token gratuito na hora de construir.

## Fora desta primeira versão (para depois)
Favoritos, alertas de preço, carteira pessoal e moderação avançada do fórum.
