# 🚀 CodeCrafter AI - Gerador de Código com IA

Sistema completo full-stack para geração de código via inteligência artificial usando OpenAI.

## ✨ Funcionalidades

- 🤖 **Geração de código via OpenAI**: Integração real com a API da OpenAI
- 🎨 **Interface moderna**: Design responsivo e intuitivo
- 📱 **Layout responsivo**: Funciona perfeitamente em desktop e mobile
- 🔄 **Preview em tempo real**: Visualize o código gerado instantaneamente
- 📋 **Abas de código**: HTML, CSS e JavaScript separados
- 🎯 **Sistema de fallback**: Código de exemplo caso a API falhe

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e moderna
- **CSS3**: Styling avançado com gradientes e animações
- **JavaScript ES6+**: Lógica interativa e calls para API

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web minimalista
- **OpenAI API**: Integração com GPT-4 para geração de código
- **CORS**: Habilitação de requisições cross-origin
- **dotenv**: Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
codecrafter-ai/
├── public/
│   ├── index.html      # Interface principal
│   ├── style.css       # Estilos da aplicação
│   └── script.js       # Lógica do frontend
├── server.js           # Servidor Express + API OpenAI
├── package.json        # Dependências e scripts
├── .env               # Variáveis de ambiente (criar)
├── .env.example       # Exemplo de configuração
└── README.md          # Este arquivo
```

## 🚀 Como Executar

### 1. Pré-requisitos
- Node.js versão 16 ou superior
- Conta na OpenAI com créditos disponíveis
- Chave da API OpenAI

### 2. Instalação

```bash
# 1. Clone ou baixe o projeto
git clone <seu-repositorio>
cd codecrafter-ai

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env e adicione sua chave da OpenAI
```

### 3. Configuração da API OpenAI

1. Acesse [OpenAI Platform](https://platform.openai.com/)
2. Gere uma nova API Key
3. Adicione a chave no arquivo `.env`:

```env
OPENAI_API_KEY=sk-proj-sua_chave_aqui_muito_longa
```

### 4. Executar o projeto

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Ou produção
npm start
```

### 5. Acessar a aplicação

Abra seu navegador em: **http://localhost:3000**

## 🎯 Como Usar

1. **Digite seu prompt**: Descreva a aplicação que deseja criar
   - Exemplo: *"Crie uma calculadora simples com botões coloridos"*

2. **Clique em "Gerar Aplicação"**: A IA processará seu pedido

3. **Visualize o código**: Navegue pelas abas HTML, CSS e JavaScript

4. **Veja a prévia**: O resultado aparece automaticamente no iframe

## ⚙️ Configurações Avançadas

### Alterar Modelo da IA

No arquivo `server.js`, linha 47, você pode alterar o modelo:

```javascript
model: "gpt-4-turbo", // Altere aqui
// Opções: gpt-4, gpt-3.5-turbo, gpt-4-turbo
```

### Personalizar Prompts

O prompt do sistema pode ser modificado no arquivo `server.js` para gerar tipos específicos de código.

### Adicionar Mais Funcionalidades

- Salvar códigos gerados
- Histórico de prompts
- Compartilhamento de códigos
- Mais linguagens de programação

## 🐛 Solução de Problemas

### Erro "API Key não encontrada"
- Verifique se o arquivo `.env` existe
- Confirme se a chave está correta e ativa
- Reinicie o servidor após alterar o `.env`

### Código não aparece
- Verifique o console do navegador (F12)
- Confirme se o servidor backend está rodando
- Teste a API diretamente em `/api/gerar-codigo`

### Preview não funciona
- Alguns códigos podem ter dependências externas
- Verifique se há erros JavaScript no console
- Teste o código em um arquivo HTML separado

## 📋 Scripts Disponíveis

```bash
npm start      # Inicia o servidor
npm run dev    # Inicia com nodemon (auto-reload)
npm test       # Executa testes (ainda não implementado)
```

## 🔐 Segurança

- ✅ Variáveis de ambiente para API keys
- ✅ Validação de entrada nos prompts
- ✅ CORS configurado adequadamente
- ✅ Sanitização básica de dados

## 🚀 Deploy

### Heroku
```bash
# Adicionar variáveis de ambiente no Heroku
heroku config:set OPENAI_API_KEY=sua_chave_aqui
```

### Vercel/Netlify
Configure as variáveis de ambiente no painel de controle da plataforma.

## 📈 Próximas Funcionalidades

- [ ] Suporte a mais linguagens (Python, Java, etc.)
- [ ] Sistema de usuários e autenticação
- [ ] Histórico de códigos gerados
- [ ] Templates pré-definidos
- [ ] Integração com GitHub
- [ ] Sistema de comentários no código
- [ ] Otimização automática de código

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Faça push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

- **Email**: seuemail@exemplo.com
- **GitHub Issues**: Para reportar bugs
- **Discord**: Para discussões em tempo real

---

### 🎉 Pronto para usar!

Agora você tem um sistema completo de geração de código com IA. Apenas:

1. `npm install`
2. Adicione sua chave OpenAI no `.env`
3. `npm start`
4. Acesse `http://localhost:3000`

**Divirta-se criando aplicações com inteligência artificial! 🚀**