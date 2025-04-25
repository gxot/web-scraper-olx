# Scraper OLX (Python + Next.js)

## 📌 Descrição:
Este projeto é uma aplicação web que realiza **web scraping na OLX**.  
O usuário digita o que deseja pesquisar, escolhe o estado, e recebe como resultado uma lista com:

- ✅ Nome dos anúncios
- 💰 Preço
- 🔗 Link direto para o anúncio

A extração é feita automaticamente com Selenium, e os dados são organizados usando Pandas.

---

## ⚙️ Funcionalidades:
- Pesquisa personalizada por nome e estado
- Extração automatizada de dados da OLX com Selenium
- Exibição dos resultados formatados via interface web (Next.js + Tailwind)
- Visualização em tabela com links clicáveis

---

## 🛠 Tecnologias:
- **Frontend:** Next.js, Tailwind CSS  
- **Backend:** Python, FastAPI, Pandas, Selenium

---

## ✅ Pré-Requisitos:
- **Python 3.10** ou superior  
- **Node.js 18** ou superior  
- **Google Chrome + ChromeDriver compatível** (para o Selenium funcionar)

---

## 🚀 Como rodar o projeto:

Abra o terminal na pasta onde deseja clonar o repositório e execute:

```bash
git clone https://github.com/seu-usuario/seu-repositorio
cd seu-repositorio
Backend (FastAPI + Web Scraper)
bash
Copiar
Editar
cd backend

# (opcional) Criar ambiente virtual
python -m venv venv
source venv/bin/activate       # Linux/macOS
venv\Scripts\activate          # Windows

# Instalar dependências
pip install -r requirements.txt

# Iniciar API
uvicorn main:app --reload
Frontend (Next.js + Tailwind CSS)
Abra outro terminal na raiz do projeto:

bash
Copiar
Editar
cd frontend
npm install
npm run dev
Acesse: http://localhost:3000/

❌ Para encerrar:
Basta fechar os dois terminais.

