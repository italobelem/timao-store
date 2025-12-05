# 🛍️ Timão Store - E-Commerce

> Uma aplicação Front-end de E-commerce desenvolvida em **Angular 18**.

O sistema consome uma **API REST Java** para gestão de catálogo e implementa um carrinho de compras completo com persistência local e gerenciamento de estado reativo.

🔗 **Backend do Projeto:** [Acesse a API Java aqui](https://github.com/italobelem/TimaoStoreBackEnd)

-----

## 🚀 Funcionalidades

### 📦 Catálogo de Produtos (Integração com API)

  * **Listagem Dinâmica:** Consumo de dados reais do backend Java.
  * **Gestão de Produtos (CRUD):**
      * **Criar/Editar:** Formulários inteligentes com *Reactive Forms* e validações robustas.
      * **Excluir:** Remoção segura com confirmação visual.
  * **Feedback ao Usuário:** Alertas (Toasts/Modais) e redirecionamentos automáticos após ações de sucesso ou erro.

### 🛒 Carrinho de Compras (Gerenciamento de Estado)

  * Utiliza **Angular Signals** (`signal`, `computed`) para reatividade instantânea 
  * **Persistência:** O estado do carrinho é salvo automaticamente no `LocalStorage` via `effect()`, mantendo os dados mesmo se a página for recarregada.
  * **Recursos:**
      * Adicionar itens diretamente do catálogo.
      * Ajuste fino de quantidade (Botões `+` e `-`).
      * Remoção de itens individuais.
      * **Limpar Carrinho:** Ação global para esvaziar a lista.
      * **Cálculos em Tempo Real:** Subtotais e Total Geral atualizados a cada interação.

### 💳 Simulação de Checkout

  * Fluxo completo de finalização de compra.
  * Tela de "Sucesso" com feedback visual animado para melhor experiência do usuário (UX).

-----

## 🛠️ Stack Tecnológico

  * **Framework:** [Angular 18](https://angular.dev/) 
  * **Estilização:** [Bootstrap 5](https://getbootstrap.com/) + CSS Customizado
  * **Formulários:** Reactive Forms
  * **Ícones:** Bootstrap Icons
  * **Gerenciamento de Estado:** Angular Signals

-----

## ▶️ Como Executar

### Pré-requisitos

Para rodar este projeto, você precisará ter instalado:

  * [Node.js](https://nodejs.org/) (v18+)
  * [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
  * **Backend Java:** Deve estar rodando localmente na porta `8080`.

### Instalação e Execução

1.  **Clone o repositório**

    ```bash
    git clone https://github.com/italobelem/timao-store.git
    cd timao-store
    ```

2.  **Instale as dependências**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento**

    ```bash
    ng serve
    ```

4.  **Acesse a aplicação**
    Abra o seu navegador e vá para: `http://localhost:4200`

-----

## 🧪 Roteiro de Testes

Para validar as funcionalidades da aplicação, siga o roteiro abaixo:

### 👤 Fluxo de Compras (Cliente)

1.  Na **Home**, clique em "Ver Catálogo".
2.  Adicione produtos ao carrinho clicando no **botão branco**.
3.  Vá para o **Carrinho** (ícone no menu) e ajuste as quantidades (+ ou -).
4.  Clique em **"Finalizar Compra"** e observe a tela de confirmação de sucesso.

### ⚙️ Fluxo Administrativo (Gestão)

1.  No **Catálogo**, clique no botão **"Novo Produto"**.
2.  Preencha o formulário (Dica: tente colocar *preço 0* para testar a validação de erro).
3.  Salve e verifique se o produto apareceu na lista.
4.  Tente **Editar** ou **Excluir** o produto que você acabou de criar.

-----
