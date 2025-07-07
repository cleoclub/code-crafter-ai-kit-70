// Estado da aplicação
let currentCode = {
    html: '',
    css: '',
    js: ''
};

// Elementos DOM
const promptTextarea = document.getElementById('prompt');
const generateBtn = document.getElementById('gerar-btn');
const resultsSection = document.getElementById('results-section');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const previewIframe = document.getElementById('preview-iframe');
const refreshBtn = document.getElementById('refresh-preview');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CodeCrafter AI iniciado!');
    
    // Event listener do botão gerar
    generateBtn.addEventListener('click', gerarCodigo);
    
    // Event listeners das abas
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Event listener do botão refresh
    refreshBtn.addEventListener('click', atualizarPreview);
    
    // Event listener do Enter no textarea (Ctrl+Enter para gerar)
    promptTextarea.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            gerarCodigo();
        }
    });
});

// Função principal para gerar código
async function gerarCodigo() {
    const prompt = promptTextarea.value.trim();
    
    if (!prompt) {
        mostrarAlerta('Por favor, digite uma descrição para sua aplicação.', 'warning');
        return;
    }
    
    console.log('📝 Gerando código para:', prompt);
    
    // Atualizar UI para estado de loading
    setLoadingState(true);
    
    try {
        // Fazer requisição para a API
        const response = await fetch('/api/gerar-codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.code) {
            // Salvar código gerado
            currentCode = data.code;
            
            // Exibir código nas abas
            exibirCodigo();
            
            // Mostrar seção de resultados
            mostrarResultados();
            
            // Atualizar preview
            atualizarPreview();
            
            // Mostrar mensagem de sucesso
            mostrarAlerta('✅ Código gerado com sucesso!', 'success');
            
            console.log('🎉 Código gerado com sucesso!');
        } else {
            throw new Error(data.message || 'Erro desconhecido');
        }
        
    } catch (error) {
        console.error('❌ Erro ao gerar código:', error);
        
        // Mostrar código de exemplo em caso de erro
        currentCode = gerarCodigoExemplo(prompt);
        exibirCodigo();
        mostrarResultados();
        atualizarPreview();
        
        mostrarAlerta('⚠️ Usando código de exemplo. Verifique sua conexão com a API.', 'warning');
    } finally {
        setLoadingState(false);
    }
}

// Gerar código de exemplo (fallback)
function gerarCodigoExemplo(prompt) {
    return {
        html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Gerado - ${prompt.substring(0, 30)}...</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <h1>🚀 Aplicação Gerada</h1>
            <p>Baseada no prompt: "${prompt}"</p>
        </header>
        
        <main class="app-main">
            <div class="feature-card">
                <h2>✨ Funcionalidade Principal</h2>
                <p>Sua aplicação foi criada com base na descrição fornecida.</p>
                <button onclick="executarAcao()" class="action-btn">
                    Testar Funcionalidade
                </button>
            </div>
            
            <div id="resultado" class="resultado-area">
                <p>Clique no botão acima para ver a funcionalidade em ação!</p>
            </div>
        </main>
        
        <footer class="app-footer">
            <p>Criado com CodeCrafter AI 🤖</p>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #2d5016 0%, #4ade80 100%);
    min-height: 100vh;
    color: #333;
    line-height: 1.6;
}

.app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

.app-header {
    text-align: center;
    padding: 2rem 0;
    color: white;
    margin-bottom: 2rem;
}

.app-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.app-header p {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
}

.app-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.feature-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    backdrop-filter: blur(10px);
}

.feature-card h2 {
    color: #2d5016;
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

.feature-card p {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.action-btn {
    background: linear-gradient(135deg, #2d5016, #4ade80);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(45, 80, 22, 0.2);
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(45, 80, 22, 0.3);
}

.action-btn:active {
    transform: translateY(0);
}

.resultado-area {
    background: rgba(255,255,255,0.95);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(74, 222, 128, 0.2);
}

.app-footer {
    text-align: center;
    padding: 2rem 0;
    color: rgba(255,255,255,0.8);
    font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
    .app-container {
        padding: 1rem;
    }
    
    .app-header h1 {
        font-size: 2rem;
    }
    
    .feature-card, .resultado-area {
        padding: 1.5rem;
    }
}

/* Animações */
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

.pulsing {
    animation: pulse 2s infinite;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.slide-in {
    animation: slideInUp 0.6s ease-out;
}`,
        js: `// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicação iniciada!');
    console.log('📝 Prompt original: "${prompt}"');
    console.log('🤖 Gerado por: CodeCrafter AI');
    
    // Adicionar classe de animação
    document.querySelector('.feature-card').classList.add('slide-in');
    
    setTimeout(() => {
        document.querySelector('.resultado-area').classList.add('slide-in');
    }, 200);
});

// Função principal de interação
function executarAcao() {
    const resultadoArea = document.getElementById('resultado');
    const agora = new Date();
    const horario = agora.toLocaleString('pt-BR');
    
    // Animação de saída
    resultadoArea.style.transition = 'all 0.3s ease';
    resultadoArea.style.opacity = '0.5';
    resultadoArea.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        // Atualizar conteúdo
        resultadoArea.innerHTML = \`
            <div style="text-align: center;">
                <h3 style="color: #2d5016; margin-bottom: 1rem; font-size: 1.5rem;">
                    🎉 Funcionalidade Executada!
                </h3>
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; border-left: 4px solid #4ade80;">
                    <p><strong>⏰ Horário:</strong> \${horario}</p>
                    <p><strong>💻 Status:</strong> Aplicação funcionando perfeitamente!</p>
                    <p><strong>🎯 Prompt:</strong> "${prompt.substring(0, 50)}..."</p>
                </div>
                <div style="margin-top: 1rem;">
                    <button onclick="executarAcaoAvancada()" style="background: #22c55e; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; margin-right: 0.5rem;">
                        ⚡ Ação Avançada
                    </button>
                    <button onclick="resetarResultado()" style="background: #6b7280; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer;">
                        🔄 Resetar
                    </button>
                </div>
            </div>
        \`;
        
        // Animação de entrada
        resultadoArea.style.opacity = '1';
        resultadoArea.style.transform = 'scale(1)';
        resultadoArea.style.background = 'linear-gradient(135deg, #f0fdf4, #dcfce7)';
        
    }, 300);
    
    // Log da ação
    console.log('✅ Ação executada:', horario);
}

// Função de ação avançada
function executarAcaoAvancada() {
    const resultadoArea = document.getElementById('resultado');
    
    resultadoArea.innerHTML = \`
        <div style="text-align: center;">
            <h3 style="color: #7c3aed; margin-bottom: 1rem;">🔮 Ação Avançada Ativada!</h3>
            <div class="pulsing" style="background: linear-gradient(135deg, #ede9fe, #ddd6fe); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
                <p>🚀 <strong>Processamento avançado em andamento...</strong></p>
                <div style="width: 100%; background: #e5e7eb; border-radius: 1rem; height: 8px; margin: 1rem 0; overflow: hidden;">
                    <div id="progress-bar" style="width: 0%; background: linear-gradient(90deg, #7c3aed, #a855f7); height: 100%; border-radius: 1rem; transition: width 2s ease;"></div>
                </div>
                <p style="font-size: 0.9rem; color: #666;">Analisando dados... Aplicando IA... Finalizando...</p>
            </div>
            <button onclick="resetarResultado()" style="background: #6b7280; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer;">
                ↩️ Voltar
            </button>
        </div>
    \`;
    
    // Animar barra de progresso
    setTimeout(() => {
        document.getElementById('progress-bar').style.width = '100%';
    }, 100);
    
    // Finalizar após animação
    setTimeout(() => {
        const progressArea = resultadoArea.querySelector('.pulsing');
        progressArea.innerHTML = \`
            <p>✅ <strong>Processamento concluído com sucesso!</strong></p>
            <p style="color: #22c55e; font-weight: 600;">Todas as funcionalidades estão operacionais! 🎉</p>
        \`;
        progressArea.classList.remove('pulsing');
        progressArea.style.background = 'linear-gradient(135deg, #f0fdf4, #dcfce7)';
    }, 2500);
}

// Função para resetar resultado
function resetarResultado() {
    const resultadoArea = document.getElementById('resultado');
    
    resultadoArea.style.transition = 'all 0.5s ease';
    resultadoArea.style.opacity = '0';
    
    setTimeout(() => {
        resultadoArea.innerHTML = '<p>Clique no botão acima para ver a funcionalidade em ação!</p>';
        resultadoArea.style.background = 'rgba(255,255,255,0.95)';
        resultadoArea.style.opacity = '1';
    }, 500);
}

// Funcionalidades extras
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 1000) + 1;
}

function obterCorAleatoria() {
    const cores = ['#2d5016', '#4ade80', '#22c55e', '#16a34a', '#15803d'];
    return cores[Math.floor(Math.random() * cores.length)];
}

// Adicionar funcionalidade de teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.shiftKey) {
        executarAcao();
    }
});

console.log('🎯 Dicas de uso:');
console.log('- Clique no botão para testar a funcionalidade');
console.log('- Use Shift+Enter para executar rapidamente');
console.log('- Explore as ações avançadas disponíveis');`
    };
}

// Exibir código nas abas
function exibirCodigo() {
    document.getElementById('html-code').textContent = currentCode.html;
    document.getElementById('css-code').textContent = currentCode.css;
    document.getElementById('js-code').textContent = currentCode.js;
}

// Mostrar seção de resultados
function mostrarResultados() {
    resultsSection.style.display = 'grid';
    resultsSection.classList.add('show');
    
    // Scroll suave para os resultados
    setTimeout(() => {
        resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

// Trocar aba ativa
function switchTab(tabName) {
    // Remover classe active de todos os botões e painéis
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Adicionar classe active no botão e painel corretos
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Atualizar preview
function atualizarPreview() {
    if (!currentCode.html) return;
    
    const previewContent = criarConteudoPreview();
    const blob = new Blob([previewContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    previewIframe.src = url;
    
    // Limpar URL após carregar
    previewIframe.onload = () => {
        URL.revokeObjectURL(url);
    };
}

// Criar conteúdo para preview
function criarConteudoPreview() {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>${currentCode.css}</style>
</head>
<body>
    ${currentCode.html.replace(/<html.*?>|<\/html>|<head.*?>.*?<\/head>|<body.*?>|<\/body>|<link.*?>|<script.*?>.*?<\/script>/gs, '')}
    <script>
        try {
            ${currentCode.js}
        } catch (error) {
            console.error('Erro no JavaScript:', error);
        }
    </script>
</body>
</html>
    `.trim();
}

// Definir estado de loading
function setLoadingState(isLoading) {
    generateBtn.disabled = isLoading;
    
    if (isLoading) {
        generateBtn.querySelector('.btn-text').style.display = 'none';
        generateBtn.querySelector('.btn-loading').style.display = 'flex';
    } else {
        generateBtn.querySelector('.btn-text').style.display = 'block';
        generateBtn.querySelector('.btn-loading').style.display = 'none';
    }
}

// Mostrar alerta
function mostrarAlerta(mensagem, tipo = 'info') {
    // Criar elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${tipo === 'success' ? '#10b981' : tipo === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    alerta.textContent = mensagem;
    
    document.body.appendChild(alerta);
    
    // Animar entrada
    setTimeout(() => {
        alerta.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 4 segundos
    setTimeout(() => {
        alerta.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(alerta);
        }, 300);
    }, 4000);
}