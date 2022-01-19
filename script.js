const setupEventHandlers = () => {
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', handleSearchEvent);
}

const handleSearchEvent  = async () => {
  const currencyValue = document.querySelector('#currency-input').value;
  clearList();
  await fetchCurrency(currencyValue);
}

const handleRates = (rates) => {
  const ratesEntries = Object.entries(rates);
  ratesEntries.forEach(([currency, rates]) => {
    renderRates(currency,rates);
  })
}

const renderRates = (currency, rates) => {
  const currencyList = document.querySelector('#currency-list');
  const li = document.createElement('li');
  li.innerHTML = `<b>${currency}:</b> ${rates}`;
  currencyList.appendChild(li);
}

const clearList = () => {
  const currencyList = document.querySelector('#currency-list');
  currencyList.innerHTML = '';
}

const handleBaseCurrency = (currency) => {
  const baseTitle = document.querySelector('#base');
  baseTitle.innerText = `Valores referentes a 1 ${currency}`;
}

setupEventHandlers();


/* USD vale BRL */

const inputUsd = document.getElementById('input-usd');
const inputBrl = document.getElementById('input-brl');

inputUsd.addEventListener('change', setUsdToBrl);
inputBrl.addEventListener('change', setUsdToUsd);

async function setUsdToBrl (event) {
  whideIput();
  const dollar = Number(event.target.value);
  const fetch = await fetchObjCurrency('usd');
  const exchange = fetch.rates.BRL * dollar;
  inputBrl.value =  exchange.toFixed(4).toString();
}

async function setUsdToUsd (event) {
  whideIput();
  const reais = Number(event.target.value);
  const fetch = await fetchObjCurrency('brl');
  const exchange = fetch.rates.USD * reais;
  inputUsd.value = exchange.toFixed(4).toString();
}

inputUsd.addEventListener('click', whideIput);
inputBrl.addEventListener('click', whideIput);

let flagClear = true;
function whideIput (event) {
  [inputUsd, inputBrl].forEach((input) => {
    input.style = "width: 200px;";
  });

  if (flagClear){
    event.target.value = '';
    flagClear = false;
  }else {
    flagClear = true;
  }
}

async function setCoinInterfaceDefault () {
  const dollar = 1;
  const fetch = await fetchObjCurrency('usd');
  const exchange = fetch.rates.BRL * dollar;
  inputBrl.value =  exchange.toFixed(2).toString();
  inputUsd.value = '1';
}

window.onload = () => {
  handleSearchEvent();
  setCoinInterfaceDefault();
}
