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

Abra o terminal aonde deseja clonar o repositório e dê os seguintes comandos:
```
git clone https://github.com/gxot/web-scrapper-olx
cd web-scrapper-olx
cd backend
----- OPCIONAL -----
python -m venv venv
source venv/bin/activate (Linux/Mac)
venv\Scripts\activate (Windows)
--------------------
pip install -r requirements.txt
uvicorn main:app --reload  
```
Abra outro terminal dentro da pasta "web-scrapper-olx" e dê esses comandos:
```
cd frontend
npm install
npm run dev
```  

❌ Para encerrar:
Basta fechar os dois terminais.

