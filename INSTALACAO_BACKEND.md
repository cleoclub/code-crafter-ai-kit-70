# 🔧 Configuração do Backend Node.js

Como o sistema Lovable não permite modificar o package.json diretamente, aqui estão as instruções para criar o backend Node.js separadamente.

## 📁 Estrutura Completa do Projeto

```
codecrafter-ai-backend/
├── server.js           # ✅ Já criado
├── .env               # ✅ Já criado  
├── .env.example       # ✅ Já criado
├── README.md          # ✅ Já criado
├── package.json       # ⬇️ Criar manualmente
└── public/            # ✅ Já criado
    ├── index.html     # ✅ Já criado
    ├── style.css      # ✅ Já criado
    └── script.js      # ✅ Já criado
```

## 🚀 Passos para Configurar o Backend

### 1. Criar Nova Pasta para o Backend

```bash
mkdir codecrafter-ai-backend
cd codecrafter-ai-backend
```

### 2. Inicializar projeto Node.js

```bash
npm init -y
```

### 3. Instalar Dependências

```bash
# Dependências principais
npm install express cors dotenv openai

# Dependências de desenvolvimento
npm install --save-dev nodemon
```

### 4. Atualizar package.json

Substitua o conteúdo do `package.json` por:

```json
{
  "name": "codecrafter-ai-backend",
  "version": "1.0.0",
  "description": "Backend para geração de código com IA",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Sem testes configurados\" && exit 0"
  },
  "keywords": [
    "ai",
    "openai", 
    "code-generator",
    "express",
    "nodejs"
  ],
  "author": "Seu Nome",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5", 
    "dotenv": "^16.0.3",
    "openai": "^4.20.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### 5. Copiar Arquivos Criados

Copie os seguintes arquivos que já foram criados no sistema Lovable:

- `server.js` - Servidor principal
- `.env` - Variáveis de ambiente  
- `.env.example` - Exemplo de configuração
- `README.md` - Documentação completa
- `public/index.html` - Interface do usuário
- `public/style.css` - Estilos da aplicação
- `public/script.js` - Lógica JavaScript

### 6. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar e adicionar sua chave OpenAI
nano .env
```

No arquivo `.env`:
```env
OPENAI_API_KEY=sk-proj-sua_chave_openai_aqui
PORT=3000
NODE_ENV=development
```

### 7. Executar o Sistema

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Ou produção
npm start
```

### 8. Testar

Acesse: **http://localhost:3000**

## 🔑 Como Obter Chave da OpenAI

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Faça login/cadastro
3. Vá em "API Keys" 
4. Clique "Create new secret key"
5. Copie a chave (começa com `sk-proj-`)
6. Cole no seu arquivo `.env`

## ⚡ Comandos Úteis

```bash
# Instalar tudo de uma vez
npm install express cors dotenv openai nodemon --save-dev

# Verificar se está funcionando
curl http://localhost:3000

# Ver logs em tempo real
npm run dev

# Parar servidor
Ctrl + C
```

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "API key not found"
- Verifique o arquivo `.env`
- Reinicie o servidor após alterar `.env`

### Porta já em uso
```bash
# Alterar porta no .env
PORT=3001
```

## 🚀 Deploy (Opcional)

### Heroku
```bash
# Fazer login
heroku login

# Criar app
heroku create codecrafter-ai

# Configurar variável
heroku config:set OPENAI_API_KEY=sua_chave

# Deploy
git push heroku main
```

### Railway/Render
1. Conectar repositório GitHub
2. Adicionar variável `OPENAI_API_KEY`  
3. Deploy automático

---

## ✅ Checklist Final

- [ ] Node.js instalado (v16+)
- [ ] Pasta do projeto criada
- [ ] `npm init -y` executado
- [ ] Dependências instaladas
- [ ] Arquivos copiados do Lovable
- [ ] `.env` configurado com chave OpenAI
- [ ] `npm start` executando sem erros
- [ ] http://localhost:3000 funcionando
- [ ] Teste de geração de código realizado

**🎉 Agora você tem o sistema completo funcionando!**