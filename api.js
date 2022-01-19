const fetchCurrency = async (currency) => {
  const response = await fetch(`https://api.exchangerate.host/latest?base=${currency}`);
  const object = await response.json();

  handleRates(object.rates);
  handleBaseCurrency(object.base);
  return object;
}


if (typeof(module) !== 'undefined') {
  module.exports = {
    fetchCurrency,
  };
}