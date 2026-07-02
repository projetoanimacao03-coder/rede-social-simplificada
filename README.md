# 📱 DevSocial — Rede Social Simplificada

### Trabalho 4: Projeto Final com Framework JavaScript
* **Disciplina:** Desenvolvimento de Software 1
* **Estudante:** Henrique Irviny
* **Instituição:** UFRB
* **Framework Utilizado:** React (via Vite) com JavaScript, HTML5 e CSS3 Móvel
* **Link do Deploy Online:** [Acesse a Aplicação Aqui](https://projetoanimacao03-coder.github.io/rede-social-simplificada/)

---

## 🎯 1. Objetivo do Projeto

[cite_start]O objetivo deste projeto prático avaliativo foi consolidar as competências adquiridas ao longo do semestre letivo através do desenvolvimento de uma aplicação cliente completa e modularizada com o framework **React**[cite: 214]. 

[cite_start]A proposta seguiu à risca as especificações da **Opção 2 (Rede Social Simplificada)** contidas no edital do Trabalho 4[cite: 253], atendendo integralmente aos critérios de:
* [cite_start]Componentização avançada e reutilizável[cite: 218].
* [cite_start]Gerenciamento de estado global unificado via Context API[cite: 229].
* [cite_start]Roteamento de páginas no lado do cliente com tratamento de erros de navegação[cite: 220, 315].
* [cite_start]Integração assíncrona com consumo de APIsREST públicas[cite: 221].
* [cite_start]Persistência de dados localizada em memória do navegador[cite: 243, 261].
* [cite_start]Layout fluido e responsividade adaptada a dispositivos móveis (*Mobile-First*)[cite: 244, 262].

---

## 🚀 2. Diário de Bordo e Histórico de Desenvolvimento

O projeto foi construído incrementalmente através de decisões técnicas fundamentadas em engenharia de software e nas restrições operacionais descritas no edital. O fluxo de desenvolvimento seguiu os seguintes marcos:

### Passo 1: Análise de APIs e Arquitetura do Ecossistema
[cite_start]A etapa inicial consistiu em filtrar e mitigar riscos técnicos relacionados ao consumo de dados externos[cite: 321]. [cite_start]Optamos estrategicamente pelo uso da API pública **JSONPlaceholder** (`/users` e `/posts`) [cite: 269][cite_start], descartando opções burocráticas ou restritivas (como a *NewsAPI*, cujo plano gratuito bloqueia requisições originadas em servidores de produção como o GitHub Pages). Garantimos, assim, zero burocracia e 100% de compatibilidade em ambientes de homologação.

### Passo 2: Inicialização com Node.js e Vite
[cite_start]Com o ambiente local configurado, a pasta do projeto foi gerada de forma otimizada via **Node.js** utilizando o inicializador **Vite** [cite: 391] (`npm create vite@latest`)[cite_start], preterindo o antigo *Create React App*[cite: 390]. [cite_start]Essa escolha garantiu um ciclo rápido de atualizações em tempo de execução através do *Hot Module Replacement (HMR)*[cite: 407]. [cite_start]Na sequência, instalamos os pacotes `react-router-dom` para gerenciamento das rotas [cite: 392] e `gh-pages` para automação do ciclo de deploy.

### Passo 3: Engenharia de Estado e Tratamento de Dados (Context API)
[cite_start]Desenvolvemos o arquivo centralizador `AppContext.jsx`[cite: 350, 352]. Foi identificado que os dados nativos retornados pela API pública do JSONPlaceholder vinham escritos em Latim (*Lorem Ipsum*). [cite_start]Para elevar a qualidade de UI/UX exigida nos critérios de avaliação[cite: 359], implementamos uma camada interceptadora que mapeia os registros recebidos via `fetch` assíncrono e injeta títulos e conteúdos lógicos em **Português (PT-BR)** focados na área de tecnologia, mantendo perfeita harmonia com as seções de comentários.

### Passo 4: Resolução de Conflitos de Busca Simultânea
[cite_start]O edital exige de forma mandatória a **"Busca de posts ou usuários"**[cite: 260]. Refinando a regra para um padrão de qualidade superior (eliminando qualquer margem de interpretação), implementamos uma arquitetura de busca simultânea na página do Feed. Quando o usuário digita algo na barra superior da `Navbar`, a tela se reestrutura em tempo real, dividindo-se dinamicamente para expor tanto os posts quanto os perfis de desenvolvedores que correspondem ao termo pesquisado.

### Passo 5: Persistência e Blindagem de Rotas no Deploy
[cite_start]Injetamos a persistência via `LocalStorage` no formulário de novos posts[cite: 261], permitindo que novos conteúdos criados localmente sejam mesclados no topo do feed do estado global sem sumirem ao recarregar a página. Na camada de roteamento, implementamos o **`HashRouter`** no lugar do tradicional `BrowserRouter`. Essa mudança resolveu o clássico problema do GitHub Pages de quebrar rotas dinâmicas e retornar erro 404 nativo do servidor quando a página sofria atualizações forçadas (`F5`).

---

## 🛠️ 3. Tecnologias Utilizadas

* **Runtime de Execução:** Node.js v18+
* [cite_start]**Ferramenta de Build:** Vite ⚡ [cite: 391]
* [cite_start]**Biblioteca Principal:** React 18 (Hooks utilizados: `useState`, `useEffect`, `useContext`, `useNavigate`, `useParams`) [cite: 227]
* [cite_start]**Roteamento SPA:** React Router DOM v6 [cite: 228, 392]
* [cite_start]**Serviço de Dados:** JSONPlaceholder API 
* [cite_start]**Estilização Dinâmica:** CSS3 Moderno (Variações globais de paleta de cores, Flexbox, CSS Grid Layout e Media Queries de responsividade) [cite: 326, 327]
* **Automatizador de Deploy:** GH-Pages Git Integration
* **Controle de Versão:** Git & GitHub

---

## 🧩 4. Estrutura Arquitetural do Projeto (Conformidade com o Edital)

[cite_start]O projeto cumpre com exatidão a volumetria mínima do regulamento técnico (Mínimo de 8 componentes e 4 rotas)[cite: 308, 313]:

### [cite_start]📁 Páginas Mínimas Implementadas (Pasta `/src/pages`) [cite: 344]
1. [cite_start]`Feed.jsx`: Linha do tempo central que exibe as postagens filtradas e agrupa os resultados inteligentes da barra de busca simultânea[cite: 264].
2. [cite_start]`CreatePost.jsx`: Formulário inteligente com validação estrutural de dados para inserção de novas postagens persistidas via LocalStorage[cite: 265].
3. [cite_start]`UserList.jsx`: Tela agregadora que exibe os cards de todos os perfis retornados nativamente pela API pública[cite: 267].
4. [cite_start]`UserProfile.jsx`: Rota parametrizada dinâmica (`/perfil/:id`) que renderiza os dados individuais e filtra cronologicamente apenas os posts criados por aquele determinado ID de usuário[cite: 266, 316].
5. [cite_start]`NotFound.jsx`: Página de erro customizada capturada pelo operador curinga (`*`) para caminhos inexistentes na aplicação[cite: 315].

### [cite_start]📁 Componentes Reutilizáveis Isolados (Pasta `/src/components`) [cite: 340]
1. [cite_start]`Navbar.jsx`: Barra fixa de cabeçalho global contendo os links de rotas e o gatilho ativo do estado de busca contextual[cite: 341].
2. [cite_start]`Footer.jsx`: Rodapé institucional contendo assinaturas e metadados de identificação acadêmica[cite: 342].
3. [cite_start]`PostCard.jsx`: Card estruturado que renderiza dados mapeados do autor, cabeçalho de perfil, ações de curtidas dinâmicas e subseção de engajamento[cite: 343].
4. `CommentSection.jsx`: Componente aninhado ao card para tratamento de array de comentários e formulário de submissão local.
5. `UserCard.jsx`: Bloco de perfil compacto para exibição de dados públicos e atalho de redirecionamento dinâmico.
6. `SearchBar.jsx`: Componente dinâmico de feedback textual indicando volumes de dados encontrados por filtragem ativa.
7. [cite_start]`LoadingSpinner.jsx`: Feedback visual e retenção de fluxo durante a requisição assíncrona da API externa[cite: 322].
8. [cite_start]`ErrorMessage.jsx`: Tratamento elegante de exceções no console caso ocorram erros de conexão ou falhas de requisição HTTP[cite: 323].

---

## 🔧 5. Instruções de Instalação e Execução Local

Para replicar os testes e rodar este projeto em sua máquina local, certifique-se de possuir o Node.js instalado e execute os comandos abaixo na ordem listada:

1. **Clonar o Repositório:**
   ```bash
   git clone [https://github.com/projetoanimacao03-coder/rede-social-simplificada.git](https://github.com/projetoanimacao03-coder/rede-social-simplificada.git)

2. Entrar no Diretório do Projeto: cd rede-social-simplificada

3. Instalar as Dependências do Projeto: npm install

4. Iniciar o Servidor de Desenvolvimento Local: npm run dev
Após rodar, abra o navegador no endereço local informado no terminal.