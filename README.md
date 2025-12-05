🛍️ Timão Store - E-Commerce 

Uma aplicação Front-end de E-commerce, desenvolvida em Angular 18. O sistema consome uma API REST Java (https://github.com/italobelem/TimaoStoreBackEnd) para gestão de catálogo e implementa um carrinho de compras completo com persistência local.

🚀 Funcionalidades

📦 Catálogo de Produtos (Integração com API)

Listagem Dinâmica: Consumo de dados reais do backend Java.

Gestão de Produtos (CRUD):

Criar/Editar: Formulários inteligentes com Reactive Forms e validações.

Excluir: Remoção com confirmação visual.

Feedback ao Usuário: Alertas e redirecionamentos automáticos após ações.

🛒 Carrinho de Compras (Gerenciamento de Estado)

Tecnologia: Utiliza Angular Signals (signal, computed) para reatividade instantânea sem RxJS Subject.

Persistência: O estado do carrinho é salvo automaticamente no LocalStorage via effect().

Recursos:

Adicionar itens a partir do catálogo.

Ajuste fino de quantidade (Botões + e -).

Remoção de itens individuais.

Limpar Carrinho: Ação global para esvaziar a lista.

Cálculos em Tempo Real: Subtotais e Total Geral atualizados a cada clique.

💳 Simulação de Checkout

Fluxo de finalização de compra.

Tela de "Sucesso" com feedback visual animado.

🛠️ Stack Tecnológico

Framework: Angular 18 (Latest)

Estilização: Bootstrap 5 + CSS Customizado

Formulários: Reactive Forms

Ícones: Bootstrap Icons

📂 Estrutura do Projeto

A organização segue as melhores práticas de separação de responsabilidades:

src/app
├── components      # Componentes visuais reutilizáveis
│   ├── header      # Navegação e badge do carrinho
│   └── product-table # Tabela isolada (dumb component)
├── models          # Interfaces de tipagem (Product, CartItem)
├── pages           # Componentes de página (Roteamento)
│   ├── home        # Landing Page
│   ├── product-list # Lógica da listagem
│   ├── product-form # Lógica de cadastro/edição
│   └── cart        # Lógica do carrinho
└── services        # Regras de negócio e comunicação
    ├── cart.service.ts    # Gerenciamento de estado (Client-side)
    └── product.service.ts # Comunicação HTTP (Server-side)


▶️ Como Executar

Pré-requisitos

Node.js (v18+)

Angular CLI (npm install -g @angular/cli)

Backend Java rodando na porta 8080.

Instalação e Execução

Clone o repositório:

git clone [https://github.com/SEU-USUARIO/miniecommerce.git](https://github.com/italobelem/timao-store.git)
cd timao-store


Instale as dependências:

npm install


Inicie o servidor de desenvolvimento:

ng serve


Acesse:
Abra http://localhost:4200 no seu navegador.

🧪 Roteiro de Testes

Fluxo de Compras (Cliente)

Na Home, clique em "Ver Catálogo".

Adicione produtos ao carrinho clicando no botão verde.

Vá para o Carrinho e ajuste as quantidades.

Clique em "Finalizar Compra" para ver a tela de confirmação.

Fluxo Administrativo (Gestão)

No Catálogo, clique em "Novo Produto".

Preencha o formulário (tente colocar preço 0 para testar a validação).

Salve e veja o produto na lista.

Edite ou Exclua o produto criado.
