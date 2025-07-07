import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Code, Play, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-codecrafter.jpg';

interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

export const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const { toast } = useToast();

  const generateCode = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite um prompt para gerar o código.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulação da chamada à API - substituir pela chamada real
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Código de exemplo gerado
      const mockCode: GeneratedCode = {
        html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Gerado por IA</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Aplicação Gerada</h1>
        <p>Seu prompt: "${prompt}"</p>
        <button onclick="interagir()">Clique Aqui</button>
        <div id="resultado"></div>
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
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #2d5016, #4ade80);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
}

h1 {
    color: #2d5016;
    margin-bottom: 1rem;
}

button {
    background: linear-gradient(135deg, #2d5016, #4ade80);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: transform 0.2s;
}

button:hover {
    transform: translateY(-2px);
}

#resultado {
    margin-top: 1rem;
    padding: 1rem;
    background: #f0f9ff;
    border-radius: 0.5rem;
    min-height: 50px;
}`,
        js: `function interagir() {
    const resultado = document.getElementById('resultado');
    const agora = new Date().toLocaleTimeString();
    
    resultado.innerHTML = \`
        <h3>🎉 Interação realizada!</h3>
        <p>Horário: \${agora}</p>
        <p>Aplicação gerada com sucesso via IA!</p>
    \`;
    
    // Animação
    resultado.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resultado.style.transform = 'scale(1)';
    }, 100);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicação iniciada!');
    console.log('Prompt utilizado:', "${prompt}");
});`
      };

      setGeneratedCode(mockCode);
      toast({
        title: "Código Gerado!",
        description: "Seu aplicativo foi criado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao gerar código. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const createPreviewContent = () => {
    if (!generatedCode) return '';
    
    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${generatedCode.css}</style>
        </head>
        <body>
          ${generatedCode.html.replace(/<html.*?>|<\/html>|<head.*?>.*?<\/head>|<body.*?>|<\/body>/gs, '')}
          <script>${generatedCode.js}</script>
        </body>
      </html>
    `;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success to-primary">
      {/* Hero Section */}
      <div 
        className="relative min-h-[60vh] bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `linear-gradient(rgba(45, 80, 22, 0.8), rgba(74, 222, 128, 0.8)), url(${heroImage})` }}
      >
        <div className="container mx-auto max-w-7xl p-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">CodeCrafter AI</h1>
            </div>
            <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transforme suas ideias em código funcional com inteligência artificial
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">🤖 OpenAI GPT-4</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">⚡ Geração Instantânea</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🎨 Preview em Tempo Real</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl p-4 -mt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Code className="w-6 h-6 text-primary" />
                Descreva sua aplicação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ex: Crie um calculadora simples com botões coloridos e operações básicas..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none border-2 focus:border-primary"
                disabled={isGenerating}
              />
              <Button
                onClick={generateCode}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-primary hover:bg-primary-hover shadow-glow text-lg py-6"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Gerando código...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Gerar Aplicação
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Code Display Section */}
          <Card className="shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                <span className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" />
                  Código Gerado
                </span>
                {generatedCode && (
                  <Badge className="bg-success text-success-foreground border-0">
                    ✅ Pronto!
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedCode ? (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-muted">
                    <TabsTrigger value="html" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">HTML</TabsTrigger>
                    <TabsTrigger value="css" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">CSS</TabsTrigger>
                    <TabsTrigger value="js" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">JavaScript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="html" className="mt-4">
                    <pre className="bg-code text-code-foreground p-4 rounded-lg text-sm overflow-x-auto max-h-[300px] border">
                      <code>{generatedCode.html}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="css" className="mt-4">
                    <pre className="bg-code text-code-foreground p-4 rounded-lg text-sm overflow-x-auto max-h-[300px] border">
                      <code>{generatedCode.css}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="js" className="mt-4">
                    <pre className="bg-code text-code-foreground p-4 rounded-lg text-sm overflow-x-auto max-h-[300px] border">
                      <code>{generatedCode.js}</code>
                    </pre>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">O código gerado aparecerá aqui</p>
                  <p className="text-sm">Digite um prompt acima para começar</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        {generatedCode && (
          <Card className="mt-8 shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Play className="w-6 h-6 text-primary" />
                Prévia da Aplicação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg border-2 border-muted">
                <iframe
                  srcDoc={createPreviewContent()}
                  className="w-full h-96 border-0 rounded-lg bg-white shadow-lg"
                  sandbox="allow-scripts allow-same-origin"
                  title="Preview da aplicação gerada"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};