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

### Desenvolvimento
- **ESLint** - Linting de código JavaScript
- **Hot Module Replacement** - Desenvolvimento com reload automático

## ✨ Funcionalidades Atuais

### 🔐 Sistema de Autenticação
- **Login seguro** com usuário e senha
- **Seleção de hospital** após autenticação
- **Gerenciamento de sessão** com localStorage
- **Validação de credenciais** em tempo real
- **Mensagens de erro** em português

### 🏥 Dashboard Principal
- **Interface moderna** com design responsivo
- **Estatísticas em tempo real** (usuários, projetos, tarefas, receita)
- **Feed de atividades** recentes
- **Ações rápidas** para tarefas comuns
- **Navegação lateral** intuitiva

### 🎨 Interface de Usuário
- **Design responsivo** para desktop, tablet e mobile
- **Tema personalizado** com cores profissionais
- **Componentes reutilizáveis** e modulares
- **Animações suaves** e transições
- **Footer com copyright** ECalasans

### 🔧 Funcionalidades Técnicas
- **API Service Layer** para comunicação com backend
- **Error handling** robusto com mensagens em português
- **Loading states** para melhor UX
- **Form validation** client-side
- **Responsive design** para todos os dispositivos

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
│   │   ├── LoginPage.jsx   # Página de login
│   │   ├── Header.jsx      # Cabeçalho da aplicação
│   │   ├── Sidebar.jsx     # Navegação lateral
│   │   ├── Footer.jsx      # Rodapé da aplicação
│   │   └── *.css          # Estilos dos componentes
│   ├── services/
│   │   └── api.js         # Serviços de API
│   ├── assets/            # Recursos estáticos
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── package.json           # Dependências e scripts
├── vite.config.js         # Configuração do Vite
└── README.md              # Este arquivo
```

## 🎨 Paleta de Cores

O sistema utiliza uma paleta de cores profissional:

- **Primária**: `#335252` (Verde-azulado escuro)
- **Secundária**: `#d4dde1` (Cinza claro)
- **Destaque**: `#aa4b41` (Vermelho)
- **Escuro**: `#2d3033` (Cinza escuro)
- **Branco**: `#ffffff` (Branco)

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

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Desenvolvimento

**Desenvolvedor**: ECalasans  
**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024

## 📞 Suporte

Para suporte técnico ou dúvidas:
- **Email**: [email@exemplo.com]
- **Documentação**: [link-para-docs]
- **Issues**: [GitHub Issues]

---

**NPT Manager** - Simplificando o gerenciamento de Nutrição Parenteral Total 🏥💊
