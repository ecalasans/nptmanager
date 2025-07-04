# NPT Manager - Sistema de Gerenciamento de Nutrição Parenteral Total

## 📋 Visão Geral

O **NPT Manager** é uma aplicação web moderna desenvolvida em React para gerenciamento de Nutrição Parenteral Total (NPT) em ambientes hospitalares. O sistema oferece uma interface intuitiva e profissional para médicos e profissionais de saúde gerenciarem prescrições, pacientes e protocolos de NPT.

## 🎯 Propósito Principal

O NPT Manager foi desenvolvido para:

- **Simplificar o processo** de prescrição e gerenciamento de NPT
- **Reduzir erros** na prescrição através de validações automatizadas
- **Melhorar a eficiência** dos profissionais de saúde
- **Centralizar informações** de pacientes e prescrições
- **Facilitar o controle** de estoque e protocolos hospitalares
- **Garantir conformidade** com protocolos médicos e regulamentações

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca principal para interface de usuário
- **Vite 7.0.0** - Ferramenta de build e servidor de desenvolvimento
- **React Bootstrap 2.10.10** - Componentes de UI responsivos
- **React Router DOM 7.6.2** - Navegação entre páginas
- **Bootstrap 5.3.7** - Framework CSS para design responsivo

### Backend (Integração)
- **Django REST Framework** - API REST para backend
- **Autenticação por sessão** - Sistema seguro de login
- **CORS habilitado** - Comunicação entre frontend e backend
- **Campos padrão Django** - username/password para compatibilidade

### Desenvolvimento
- **ESLint** - Linting de código JavaScript
- **Hot Module Replacement** - Desenvolvimento com reload automático

## ✨ Funcionalidades Atuais

### 🔐 Sistema de Autenticação
- **Login seguro** com username e password (padrão Django)
- **Seleção de hospital** após autenticação
- **Gerenciamento de sessão** com localStorage
- **Validação de credenciais** em tempo real
- **Mensagens de erro** em português
- **Compatibilidade total** com Django API
- **Histórico de login** com informações de sessões anteriores
- **Monitoramento de segurança** com IP addresses e timestamps

### 🏥 Gerenciamento Hospitalar
- **Contexto hospitalar** mantido em toda a aplicação
- **Dados filtrados** por hospital selecionado
- **Informações hospitalares** no Dashboard
- **Sidebar limpa** sem exibição de hospital (foco em navegação)
- **Hospital ID** gerenciado via localStorage

### 🏥 Dashboard Principal
- **Interface moderna** com design responsivo
- **Estatísticas em tempo real** (pacientes, prescrições, médias)
- **Dados hospitalares** filtrados por hospital selecionado
- **Atualização manual** com botão de refresh
- **Navegação lateral** intuitiva
- **Informações hospitalares** no cabeçalho

### 🎨 Interface de Usuário
- **Design responsivo** para desktop, tablet e mobile
- **Tema personalizado** com cores profissionais
- **Componentes reutilizáveis** e modulares
- **Animações suaves** e transições
- **Footer com copyright** ECalasans
- **Layout otimizado** com melhor uso do espaço
- **Sidebar com perfil** e histórico de login
- **Informações de segurança** com IP addresses

### 🔧 Funcionalidades Técnicas
- **API Service Layer** para comunicação com backend
- **Error handling** robusto com mensagens em português
- **Loading states** para melhor UX
- **Form validation** client-side
- **Responsive design** para todos os dispositivos
- **Debugging avançado** com logs detalhados

### 🔐 Histórico de Login e Segurança
- **Login anterior**: Exibe a data/hora do login anterior à sessão atual
- **Histórico de acessos**: Mostra até 3 logins anteriores (excluindo sessão atual)
- **Rastreamento de IP**: Exibe endereços IP de todos os acessos
- **Timestamps formatados**: Mostra data, hora e tempo relativo (ex: "há 2 horas")
- **Monitoramento de segurança**: Ajuda usuários a rastrear padrões de acesso
- **Interface colapsável**: Histórico pode ser expandido/recolhido na sidebar

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Servidor Django backend rodando em `http://localhost:8000`

### Instalação

1. **Clone o repositório**
```bash
git clone [URL_DO_REPOSITORIO]
cd nptmanager
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o backend**
```bash
# Certifique-se de que o servidor Django está rodando
# na porta 8000 com a API configurada
# O backend deve aceitar campos 'username' e 'password'
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run preview      # Visualiza build de produção
npm run lint         # Executa ESLint
```

## 📁 Estrutura do Projeto

```
nptmanager/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   ├── Dashboard.jsx   # Dashboard principal
│   │   ├── LoginPage.jsx   # Página de login (atualizada)
│   │   ├── Header.jsx      # Cabeçalho da aplicação
│   │   ├── Sidebar.jsx     # Navegação lateral (sem exibição de hospital)
│   │   ├── Footer.jsx      # Rodapé da aplicação
│   │   └── *.css          # Estilos dos componentes
│   ├── services/
│   │   └── api.js         # Serviços de API (atualizado)
│   ├── assets/            # Recursos estáticos
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── package.json           # Dependências e scripts
├── vite.config.js         # Configuração do Vite
└── README.md              # Este arquivo
```

## 🎨 Paleta de Cores

O sistema utiliza uma paleta de cores moderna e limpa em tema claro:

- **Primária**: `#2f6e7e` (Azul-teal escuro - cor principal da marca)
- **Secundária**: `#80c2b4` (Verde-menta - elementos secundários)
- **Destaque**: `#faff9f` (Amarelo claro - destaques e CTAs)
- **Fundo**: `#f3ffef` (Verde muito claro - fundo principal)
- **Superfície**: `#b8d0cf` (Azul-cinza claro - cards e superfícies)
- **Branco**: `#ffffff` (Branco puro)
- **Escuro**: `#2d3033` (Cinza escuro - texto)

## 🔄 Últimas Atualizações

### v1.4.0 - Janeiro 2025
- ✅ **Histórico de Login**: Endpoint `/api/auth/login-history/` com informações de sessões anteriores
- ✅ **Login Anterior**: Exibe data/hora do login anterior à sessão atual
- ✅ **Monitoramento de Segurança**: IP addresses e timestamps de todos os acessos
- ✅ **Sidebar Aprimorada**: Perfil do usuário com histórico de login colapsável
- ✅ **Interface de Segurança**: Ajuda usuários a rastrear padrões de acesso à conta

### v1.3.0 - Janeiro 2025
- ✅ **Dashboard Hospitalar**: Endpoint `/api/dashboard/` com dados agregados
- ✅ **Métricas Hospitalares**: Total de pacientes, prescrições e médias por hospital
- ✅ **Sidebar Otimizada**: Remoção de exibição de hospital (foco em navegação)
- ✅ **Contexto Hospitalar**: Mantido em background para Dashboard e outros componentes
- ✅ **API Integrada**: Comunicação completa entre frontend e backend Django

### v1.2.0 - Dezembro 2024
- ✅ **Nova Paleta de Cores**: Tema claro moderno com cores suaves e profissionais
- ✅ **Cores Atualizadas**: `#faff9f`, `#80c2b4`, `#f3ffef`, `#b8d0cf`, `#2f6e7e`
- ✅ **Melhor Contraste**: Elementos ativos destacados com amarelo claro
- ✅ **Hierarquia Visual**: Cards e superfícies com azul-cinza claro
- ✅ **Fundo Suave**: Verde muito claro para melhor conforto visual

### v1.1.0 - Dezembro 2024
- ✅ **Compatibilidade Django**: Campos atualizados para `username`/`password`
- ✅ **Interface otimizada**: Login page redesenhada com layout mais compacto
- ✅ **Error handling**: Mensagens de erro em português com debugging avançado
- ✅ **Responsividade**: Melhor adaptação para diferentes tamanhos de tela
- ✅ **Footer**: Adicionado footer com copyright ECalasans
- ✅ **Documentação**: README atualizado com informações completas

### Melhorias Técnicas
- **API Service**: Tradução completa de mensagens para português
- **Form Validation**: Validação client-side aprimorada
- **Loading States**: Estados de carregamento mais informativos
- **Debug Logs**: Logs detalhados para troubleshooting
- **Code Quality**: ESLint configurado para manter padrões

## 🔮 Roadmap - Funcionalidades Futuras

### 📊 Módulo de Pacientes
- [ ] **Cadastro de pacientes** com informações completas
- [ ] **Histórico médico** e prescrições anteriores
- [ ] **Busca e filtros** avançados
- [ ] **Fotos e documentos** dos pacientes
- [ ] **Alertas de alergias** e contraindicações

### 💊 Módulo de Prescrições NPT
- [ ] **Formulário de prescrição** com validações
- [ ] **Cálculos automáticos** de necessidades nutricionais
- [ ] **Biblioteca de fórmulas** pré-definidas
- [ ] **Aprovação em workflow** (médico → farmácia → enfermagem)
- [ ] **Histórico de prescrições** por paciente
- [ ] **Comparação entre prescrições**

### 🏥 Módulo Hospitalar
- [ ] **Gestão de leitos** e unidades
- [ ] **Controle de estoque** de nutrientes
- [ ] **Protocolos hospitalares** configuráveis
- [ ] **Relatórios de utilização** por unidade
- [ ] **Integração com sistemas** hospitalares

### 📈 Módulo de Relatórios
- [ ] **Dashboard analítico** com métricas
- [ ] **Relatórios personalizáveis** (PDF/Excel)
- [ ] **Gráficos e estatísticas** de utilização
- [ ] **Auditoria de prescrições** e mudanças
- [ ] **Exportação de dados** para análise

### 👥 Módulo de Usuários
- [ ] **Gestão de perfis** (médico, farmacêutico, enfermeiro)
- [ ] **Controle de permissões** granular
- [ ] **Logs de atividades** dos usuários
- [ ] **Notificações** em tempo real
- [ ] **Chat interno** entre profissionais

### 🔔 Sistema de Notificações
- [ ] **Alertas de prescrições** vencendo
- [ ] **Notificações de aprovação** pendente
- [ ] **Lembretes de medicamentos** críticos
- [ ] **Alertas de estoque** baixo
- [ ] **Notificações push** para mobile

### 📱 Aplicação Mobile
- [ ] **App React Native** para iOS/Android
- [ ] **Funcionalidades offline** básicas
- [ ] **Sincronização** com servidor
- [ ] **Notificações push** nativas
- [ ] **Interface otimizada** para touch

### 🔧 Funcionalidades Avançadas
- [ ] **Inteligência artificial** para sugestões de prescrição
- [ ] **Integração com PACS** para imagens
- [ ] **API pública** para integrações
- [ ] **Webhooks** para notificações externas
- [ ] **Backup automático** de dados

## 🤝 Contribuição

### Como Contribuir

1. **Fork o projeto**
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit suas mudanças** (`git commit -m 'Add some AmazingFeature'`)
4. **Push para a branch** (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Padrões de Código

- **ESLint** configurado para manter qualidade
- **Componentes funcionais** com hooks
- **CSS modular** para estilos
- **Comentários** em português
- **Nomes descritivos** para variáveis e funções
- **Compatibilidade Django** para campos de autenticação

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Desenvolvimento

**Desenvolvedor**: ECalasans  
**Versão**: 1.1.0  
**Última atualização**: Dezembro 2024

## 📞 Suporte

Para suporte técnico ou dúvidas:
- **Email**: [email@exemplo.com]
- **Documentação**: [link-para-docs]
- **Issues**: [GitHub Issues]

---

**NPT Manager** - Simplificando o gerenciamento de Nutrição Parenteral Total 🏥💊

## 🆕 Integração do Dashboard com API

A partir de julho de 2025, o Dashboard do NPT Manager está totalmente integrado à API Django, trazendo dados em tempo real para os cards principais:

- **Pacientes em NPT no Hospital**
- **Prescrições Realizadas**
- **Média de Prescrições por Paciente**

### Como funciona
- O Dashboard busca o hospital selecionado no localStorage após o login.
- Faz uma requisição única para `/api/dashboard/?hospital_id={uuid}`.
- Preenche os cards com os dados retornados da API.
- Exibe o nome e tipo do hospital e a data/hora da última atualização no cabeçalho.
- Permite atualizar manualmente os dados com o botão "Atualizar".
- Exibe estados de carregamento (spinners) e mensagens de erro amigáveis.

### Códigos de Erro
- `400` - Falta ou formato inválido do hospital_id (UUID)
- `404` - Hospital não encontrado
- `500` - Erro interno do servidor

### Benefícios
- **Performance**: Menos requisições, dados agregados em um único endpoint.
- **UX**: Feedback visual imediato, informações hospitalares claras, atualização manual.
- **Manutenção**: Código mais limpo e desacoplado, fácil de evoluir.

Veja a seção de API para detalhes do endpoint e exemplos de resposta.
