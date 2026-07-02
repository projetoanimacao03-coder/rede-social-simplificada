import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Banco de postagens realistas em português para substituir o Latim da API
  const conteudosEmPortugues = [
    { title: "Dominando o React e Context API! 🚀", body: "Hoje passei o dia estruturando o gerenciamento de estado global desse projeto. O ecossistema do React é simplesmente fantástico para criar interfaces fluidas." },
    { title: "Por que você deveria usar o Vite hoje mesmo ⚡", body: "Impressionado com a velocidade do Vite! O Hot Module Replacement (HMR) economiza horas de desenvolvimento comparado ao antigo Create React App." },
    { title: "Café e Linhas de Código ☕💻", body: "Mais um bug resolvido! Às vezes, tudo o que precisamos é nos afastar da tela por cinco minutos e tomar um café para a solução aparecer na mente." },
    { title: "Dica de CSS: Flexbox vs Grid Layout 🎨", body: "Uso Flexbox para estruturas unidimensionais (como barras de navegação) e Grid para layouts bidimensionais completos (como feeds e galerias de cards). Facilita muito!" },
    { title: "Minha primeira requisição HTTP com Fetch API 🌐", body: "Consegui integrar os dados de uma API externa de forma totalmente assíncrona usando async/await. Próximo passo: tratar cenários de erro e loading." },
    { title: "Clean Code: Escrevendo códigos legíveis 🧼", body: "Código limpo não é aquele que é inteligente demais, mas sim aquele que qualquer desenvolvedor da sua equipe consegue ler e entender sem esforço." },
    { title: "O que é Git Flow e por que usar? 🌿", body: "Organizar o repositório em branches de feature, develop e main evita conflitos desastrosos na hora de publicar a aplicação em produção." },
    { title: "Criando interfaces 100% responsivas 📱🖥️", body: "Sempre comece desenvolvendo pensando em dispositivos móveis (Mobile-First). Adicionar media queries depois fica muito mais simples e natural." }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Carrega Usuários da API Externa
        const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!usersRes.ok) throw new Error('Erro ao carregar usuários.');
        const usersData = await usersRes.json();
        setUsers(usersData);

        // 2. Carrega Posts da API Externa
        const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=16');
        if (!postsRes.ok) throw new Error('Erro ao carregar os posts.');
        const postsData = await postsRes.json();

        // 3. Sincroniza e traduz os posts da API para Português
        const apiPostsFormatados = postsData.map((post, index) => {
          // Faz um loop rotativo pelo nosso banco em português baseado no índice do post
          const conteudoPt = conteudosEmPortugues[index % conteudosEmPortugues.length];
          
          return {
            ...post,
            title: conteudoPt.title,
            body: conteudoPt.body,
            likes: Math.floor(Math.random() * 80) + 5,
            likedByUser: false,
            comments: [
              { id: 1, name: "Ana Silva", body: "Excelente publicação! Fez todo sentido para mim." },
              { id: 2, name: "Carlos Souza", body: "Concordo plenamente, parabéns pelo conteúdo!" }
            ]
          };
        });

        // Recupera posts criados localmente no LocalStorage
        const localPosts = JSON.parse(localStorage.getItem('local_posts')) || [];
        
        setPosts([...localPosts, ...apiPostsFormatados]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addPost = (newPost) => {
    const postWithMeta = {
      ...newPost,
      id: Date.now(),
      userId: 1, // Vincula ao usuário logado
      likes: 0,
      likedByUser: false,
      comments: []
    };

    const localPosts = JSON.parse(localStorage.getItem('local_posts')) || [];
    const updatedLocal = [postWithMeta, ...localPosts];
    localStorage.setItem('local_posts', JSON.stringify(updatedLocal));

    setPosts(prev => [postWithMeta, ...prev]);
  };

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          likedByUser: !post.likedByUser
        };
      }
      return post;
    }));
  };

  const addComment = (postId, commentBody) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), name: "Você", body: commentBody }]
        };
      }
      return post;
    }));
  };

  return (
    <AppContext.Provider value={{ 
      posts, users, loading, error, searchQuery, setSearchQuery, addPost, toggleLike, addComment 
    }}>
      {children}
    </AppContext.Provider>
  );
}