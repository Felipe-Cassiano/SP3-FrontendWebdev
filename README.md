# TuxLabs - Live Suggestions (Linha JOVI)

Uma aplicação interativa desenvolvida para revolucionar a experiência de edição e fotografia mobile nos smartphones da linha **JOVI**. O projeto introduz a funcionalidade **Live Suggestions**, uma interface inteligente que orienta o usuário em tempo real sobre como utilizar e combinar parâmetros manuais de câmera através de marcadores visuais dinâmicos.

## 🔗 Deploy do Projeto

O projeto está implantado e disponível para testes no seguinte link:
* **Vercel:** [INSERIR_LINK_AQUI]

## 🛠️ Tecnologias Utilizadas

* **React**: Biblioteca principal para a construção da interface reativa.
* **Tailwind CSS**: Framework utilitário para estilização responsiva, layout em Grid e design em tema escuro.
* **Vite**: Build tool e ambiente de desenvolvimento rápido.
* **Node.js**: Ambiente de execução para o ecossistema JavaScript.
* **Python / Flask (Backend)**: Servidor encarregado de processar as imagens recebidas e interagir com o modelo de IA.

## 🤖 Uso de Inteligência Artificial no Projeto

A Inteligência Artificial foi integrada ao projeto no backend para atuar como um assistente de fotografia em tempo real. Ao realizar o envio de uma imagem (via clique ou *drag-and-drop* no container do smartphone), a API envia o arquivo para um modelo de IA que analisa aspectos visuais como exposição, saturação e balanço de tons. Com base nessa análise, a IA retorna sugestões dinâmicas de parâmetros ideales de edição, que são interpretadas pelo frontend para acender automaticamente os marcadores azuis na régua interativa do celular, ensinando o usuário a extrair a melhor qualidade do hardware da câmera.

## 🔑 Autenticação e Credenciais

A aplicação **não possui sistema de autenticação ou login**. Todas as funcionalidades de edição, envio de imagens e visualização das sugestões estão abertas e prontas para uso imediato.

## 📦 Como Instalar as Dependências

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **npm** ou **yarn**
* **Python** (versão 3.9 ou superior — caso vá executar o backend localmente)

### Passos para Instalação

1. Clone o repositório para a sua máquina local:
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
   cd seu-repositorio

2. Instale as dependências do Frontend (React + Tailwind):
   ```bash
   npm install

3. Instale as dependências do Backend (Python/Flask):
  ```bash
  pip install -r requirements.txt
  ```
## 🚀 Como Executar o Projeto
  1. Executando o Backend (API de IA)
  Em um terminal separado, navegue até a pasta do servidor e inicie o serviço:
  ```bash
  cd backend
  python app.py
  ```
2. Executando o Frontend (React)
Em outro terminal, inicie o servidor de desenvolvimento do Vite:
  ```bash
  cd sp3-frontendwebdev
  npm run dev
  ```
Abra o endereço exibido no terminal (geralmente http://localhost:5173) no seu navegador.

## 👥 Nossa Equipe
* Felipe Roberto Cassiano - 569238
* Paulo Henrique Moreira Angueira - 573245
* Raphael Martins Manfredi - 570500
* Eduardo de Abreu Gouvêa - 573414
* Vinícius Mansur Magalhães - 571518
