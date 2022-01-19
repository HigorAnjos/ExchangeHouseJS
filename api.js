const fetchCurrency = async (currency) => {
  const response = await fetch(`https://api.exchangerate.host/latest?base=${currency}`);
  const object = await response.json();

  handleRates(object.rates);
  handleBaseCurrency(object.base);
}

const fetchObjCurrency = (coin) => (
  fetch(`https://api.exchangerate.host/latest?base=${coin}`)
  .then(data => data.json())
);
