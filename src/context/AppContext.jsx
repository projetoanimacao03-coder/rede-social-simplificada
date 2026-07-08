import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Banco de imagens fixas e seguras sobre programação (Unsplash)
  const bancoDeImagensTech = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&w=800&q=80"
  ];

  const conteudosEmPortugues = [
    { title: "Dominando o React e Context API! 🚀", body: "Hoje passei o dia estruturando o gerenciamento de estado global desse projeto. O ecossistema do React é simplesmente fantástico para criar interfaces fluidas." },
    { title: "Por que você deveria usar o Vite hoje mesmo ⚡", body: "Impressionado com a velocidade do Vite! O Hot Module Replacement (HMR) economiza horas de desenvolvimento comparado ao antigo Create React App." },
    { title: "Café e Linhas de Código ☕💻", body: "Mais um bug resolvido! Às vezes, tudo o que precisamos é nos afastar da tela por cinco minutos e tomar um café para a solução aparecer na mente." },
    { title: "Dica de CSS: Flexbox vs Grid Layout 🎨", body: "Uso Flexbox para estruturas unidimensionais (como barras de navegação) e Grid para layouts bidimensionais completos (como feeds e galerias de cards). Facilita muito!" },
    { title: "Minha primeira requisição HTTP com Fetch API 🌐", body: "Consegui integrar os dados de uma API externa de forma totalmente assíncrona usando async/await. Próximo passo: tratar cenários de erro e loading." },
    { title: "Clean Code: Escrevendo códigos legíveis 🧼", body: "Código limpo não é aquele que é inteligente demais, mas sim aquele que qualquer desenvolvedor da sua equipe consegue ler e entender sem esforço." },
    { title: "O que é Git Flow e por que usar? 🌿", body: "Organizar o repositório em branches de feature, develop e main evita conflitos desastrosos na hora de publicação em produção." },
    { title: "Criando interfaces 100% responsivas 📱🖥️", body: "Sempre comece desenvolvendo pensando em dispositivos móveis (Mobile-First). Adicionar media queries depois fica muito mais simples e natural." }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!usersRes.ok) throw new Error('Erro ao carregar usuários.');
        const usersData = await usersRes.json();
        setUsers(usersData);

        const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=16');
        if (!postsRes.ok) throw new Error('Erro ao carregar os posts.');
        const postsData = await postsRes.json();

        const apiPostsFormatados = postsData.map((post, index) => {
          const conteudoPt = conteudosEmPortugues[index % conteudosEmPortugues.length];
          const imagemTech = bancoDeImagensTech[index % bancoDeImagensTech.length]; // Distribui as imagens

          return {
            ...post,
            title: conteudoPt.title,
            body: conteudoPt.body,
            coverImage: imagemTech, // Injeta a imagem no post
            likes: Math.floor(Math.random() * 80) + 5,
            likedByUser: false,
            comments: [
              { id: 1, name: "Ana Silva", body: "Excelente publicação! Fez todo sentido para mim." },
              { id: 2, name: "Carlos Souza", body: "Concordo plenamente, parabéns pelo conteúdo!" }
            ]
          };
        });

        const localPosts = JSON.parse(localStorage.getItem('local_posts')) || [];
        const localPostsCorrigidos = localPosts.map(post => ({
          ...post,
          userId: 0, 
          isLocal: true,
          // Garante que posts antigos locais também ganhem uma imagem caso não tenham
          coverImage: post.coverImage || bancoDeImagensTech[Math.floor(Math.random() * bancoDeImagensTech.length)]
        }));
        
        setPosts([...localPostsCorrigidos, ...apiPostsFormatados]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addPost = (newPost) => {
    // Se o usuário fez upload de uma imagem, usa ela. Caso contrário, escolhe uma aleatória do Unsplash.
    const finalImage = newPost.customImage 
      ? newPost.customImage 
      : bancoDeImagensTech[Math.floor(Math.random() * bancoDeImagensTech.length)];

    const postWithMeta = {
      title: newPost.title,
      body: newPost.body,
      id: Date.now(),
      userId: 0,
      isLocal: true,
      coverImage: finalImage, // Define a imagem final (sua ou automática)
      likes: 0,
      likedByUser: false,
      comments: []
    };

    const localPosts = JSON.parse(localStorage.getItem('local_posts')) || [];
    const updatedLocal = [postWithMeta, ...localPosts];
    localStorage.setItem('local_posts', JSON.stringify(updatedLocal));

    setPosts(prev => [postWithMeta, ...prev]);
  };


  const deletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    const localPosts = JSON.parse(localStorage.getItem('local_posts')) || [];
    const updatedLocal = localPosts.filter(post => post.id !== postId);
    localStorage.setItem('local_posts', JSON.stringify(updatedLocal));
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
      posts, users, loading, error, searchQuery, setSearchQuery, 
      theme, toggleTheme, addPost, deletePost, toggleLike, addComment 
    }}>
      {children}
    </AppContext.Provider>
  );
}