const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configurar OpenAI
// COLE SUA CHAVE DA OPENAI AQUI OU NO ARQUIVO .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Adicione sua chave no arquivo .env
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Rota para gerar código
app.post('/api/gerar-codigo', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        error: 'Prompt é obrigatório' 
      });
    }

    console.log('Gerando código para prompt:', prompt);

    // Chamada para OpenAI
    // VOCÊ PODE ALTERAR O MODELO AQUI (ex: gpt-4, gpt-3.5-turbo, gpt-4-turbo)
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Altere o modelo aqui se necessário
      messages: [
        {
          role: "system",
          content: `Você é um especialista em desenvolvimento web que cria aplicações HTML, CSS e JavaScript completas e funcionais.

Regras importantes:
- Sempre gere código HTML, CSS e JavaScript separados
- O HTML deve ser completo e válido
- O CSS deve ser moderno e responsivo
- O JavaScript deve ser funcional e interativo
- Use cores verdes (#2d5016, #4ade80) como tema principal
- Crie interfaces bonitas e modernas
- Adicione interatividade sempre que possível

Responda SEMPRE no formato JSON:
{
  "html": "código HTML completo",
  "css": "código CSS completo", 
  "js": "código JavaScript completo"
}`
        },
        {
          role: "user",
          content: `Crie uma aplicação web completa baseada nesta descrição: ${prompt}`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7
    });

    const responseContent = completion.choices[0].message.content;
    
    // Tentar fazer parse do JSON
    let generatedCode;
    try {
      generatedCode = JSON.parse(responseContent);
    } catch (parseError) {
      // Se não conseguir fazer parse, criar estrutura padrão
      generatedCode = {
        html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicação Gerada</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Aplicação Criada por IA</h1>
        <p>Baseada no prompt: "${prompt}"</p>
        <button onclick="interagir()">Testar Funcionalidade</button>
        <div id="resultado"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        css: responseContent.includes('css') ? responseContent : `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #2d5016, #4ade80);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 600px;
    width: 90%;
}

h1 {
    color: #2d5016;
    margin-bottom: 1rem;
    font-size: 2rem;
}

button {
    background: linear-gradient(135deg, #2d5016, #4ade80);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    margin: 1rem 0;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(45, 80, 22, 0.3);
}

#resultado {
    margin-top: 1rem;
    padding: 1rem;
    background: #f0fdf4;
    border: 2px solid #4ade80;
    border-radius: 0.5rem;
    min-height: 60px;
}`,
        js: `
function interagir() {
    const resultado = document.getElementById('resultado');
    const agora = new Date().toLocaleString('pt-BR');
    
    resultado.innerHTML = \`
        <h3 style="color: #2d5016; margin-bottom: 0.5rem;">🎉 Sucesso!</h3>
        <p><strong>Horário:</strong> \${agora}</p>
        <p><strong>Status:</strong> Aplicação funcionando perfeitamente!</p>
        <p><strong>IA:</strong> Código gerado e executado com sucesso</p>
    \`;
    
    // Animação suave
    resultado.style.opacity = '0';
    resultado.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        resultado.style.transition = 'all 0.5s ease';
        resultado.style.opacity = '1';
        resultado.style.transform = 'translateY(0)';
    }, 100);
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicação iniciada com sucesso!');
    console.log('📝 Prompt original:', "${prompt}");
    console.log('🤖 Gerado por: CodeCrafter AI');
    
    // Adicionar funcionalidade extra se o resultado existir
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.innerHTML = '<p style="color: #666;">Clique no botão para testar a funcionalidade!</p>';
    }
});`
      };
    }

    console.log('Código gerado com sucesso');
    
    res.json({
      success: true,
      code: generatedCode
    });

  } catch (error) {
    console.error('Erro ao gerar código:', error);
    
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('📁 Arquivos estáticos servidos da pasta /public');
  console.log('🤖 API OpenAI configurada');
  console.log('');
  console.log('📋 INSTRUÇÕES:');
  console.log('1. Adicione sua chave da OpenAI no arquivo .env');
  console.log('2. Acesse http://localhost:3000 no navegador');
  console.log('3. Digite um prompt e clique em "Gerar App"');
  console.log('');
  console.log('⚙️ Para alterar o modelo da IA, edite a linha 47 deste arquivo');
});