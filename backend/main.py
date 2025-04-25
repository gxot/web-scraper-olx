from fastapi.responses import JSONResponse
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel
from fastapi import FastAPI



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

options = webdriver.ChromeOptions()

options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-blink-features=AutomationControlled")  
options.add_argument("--disable-infobars")  
options.add_argument("--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36")


def realizar_scraping(pesquisa, estado):
    # Iniciar o driver do Selenium
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    # Configurar as opções do navegador
    driver.execute_script("""
        Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
    """)

    # Abrir a página da OLX
    url = 'https://www.olx.com.br'
    driver.get(url)
    
    # Seleciona o estado a ser pesquisado
    try:
        elemento1 = driver.find_element(By.CSS_SELECTOR, "div.olx-modal--filter")
        driver.execute_script("arguments[0].setAttribute('data-show', 'true')", elemento1)
        elemento2 = driver.find_element(By.CSS_SELECTOR, "div.olx-modal__dialog--filter--left")
        driver.execute_script("arguments[0].setAttribute('data-show', 'true')", elemento2)
        
        estado_input =  driver.find_element(By.CSS_SELECTOR, "input[aria-label='Filtrar estados']")
        estado_input.send_keys(estado)
        
        estado_select =  driver.find_element(By.CSS_SELECTOR, "div.StatesList_home-states-list__item__XTos2")
        estado_select.click()
        
        elemento1 = driver.find_element(By.CSS_SELECTOR, "div.olx-modal--filter")
        driver.execute_script("arguments[0].setAttribute('data-show', 'false')", elemento1)
        elemento2 = driver.find_element(By.CSS_SELECTOR, "div.olx-modal__dialog--filter--left")
        driver.execute_script("arguments[0].setAttribute('data-show', 'false')", elemento2)
        
        
    except Exception as e:
        print(f"Erro ao selecionar o estado: {e}")
        driver.quit()
        return None
    
    # Procurar o campo de pesquisa e realizar a pesquisa
    try:
        pesquisa_input = driver.find_element(By.XPATH, "//input[contains(@id, 'oraculo-') and contains(@id, '-input')]")
        pesquisa_input.send_keys(pesquisa.lower())
        pesquisa_input.send_keys(Keys.RETURN)
    except Exception as e:
        print(f"Erro ao encontrar o campo de pesquisa: {e}")
        driver.quit()
        return None

    # Coletar nomes e preços dos produtos
    nomes = driver.find_elements(By.CSS_SELECTOR, "h2.olx-text.olx-text--body-large.olx-text--block.olx-text--semibold.olx-adcard__title")
    precos = driver.find_elements(By.CSS_SELECTOR, "h3.olx-text.olx-text--body-large.olx-text--block.olx-text--semibold.olx-adcard__price")
    
    coleta_nomes = [nome.text for nome in nomes if nome.text]
    coleta_precos = []
    coleta_links = []

    for a in driver.find_elements(By.CSS_SELECTOR, 'a.olx-adcard__link'):
        coleta_links.append(a.get_attribute("href"))
        
    for preco in precos:
        preco_texto = preco.text.replace("R$", "").replace(".", "").strip()
        try:
            coleta_precos.append(float(preco_texto))
        except ValueError:
            continue 

    driver.quit()


    # Processar os dados coletados
    produtos = {"especificações": []}

    for nome, preco, link in zip(coleta_nomes, coleta_precos, coleta_links):
        produtos['especificações'].append({"Nome": nome, "Preço": preco, "Link": link})

    # Converter para DataFrame
    df = pd.DataFrame(produtos["especificações"])
    
    # Filtrar valores atípicos
    media_preco = df["Preço"].mean()
    desvio_preco = df["Preço"].std()
    limite_inferior = media_preco - desvio_preco
    limite_superior = media_preco + desvio_preco

    df_filtrado = df[(df["Preço"] >= limite_inferior) & (df["Preço"] <= limite_superior)]
    
    # Enviar para um arquivo CSV ambos DataFrames filtrados
    return JSONResponse(content={"resultado": df_filtrado.to_dict(orient="records")})

    

# Transformar JSON em String    
class PesquisaRequest(BaseModel):
    pesquisa: str
    estado: str

#API
@app.post("/pesquisa")
def pesquisa_endpoint(request: PesquisaRequest):
    return realizar_scraping(request.pesquisa, request.estado)
