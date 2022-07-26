const API_VERSION = '1';
const API_URL = `https://rest.coinapi.io/v${API_VERSION}`;

const API_AXIOS = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'X-CoinAPI-Key': API_KEY,
  },
});

const getExchangeRate = async(sourceCoin, targetCoin, spanId, decimalNumbers) => {
  const { data } = await API_AXIOS({
    method: 'GET',
    url: `/exchangerate/${sourceCoin}/${targetCoin}`
  });
  const decimalSelector = 10 ** decimalNumbers;
  const value = Math.round(data.rate * decimalSelector) / decimalSelector;
  document.getElementById(spanId).innerHTML = value;
}

const loadData = () => {
  document.getElementsByClassName('fee-table--container')[0].style.display = 'none';
  document.getElementsByClassName('main-table--left-arrow')[0].style.visibility = 'hidden';
  setTimeout(() => {
      getExchangeRate('BTC', 'USD', 'currency-table--BTCUSD', 0)
    },
    200
  );
  setTimeout(() => {
      getExchangeRate('ETH', 'USD', 'currency-table--ETHUSD', 0);
    },
    400
  );
  setTimeout(() => {
      getExchangeRate('XRP', 'USD', 'currency-table--XRPUSD', 3);
    },
    600
  );
  setTimeout(() => {
      getExchangeRate('XLM', 'USD', 'currency-table--XLMUSD', 3);
    },
    800
  );
  // Se ejecuta al presionar el botón derecho
  document.getElementsByClassName('main-table--right-arrow')[0].addEventListener('click', () => {
    document.getElementsByClassName('currency-table--container')[0].style.display = 'none';
    document.getElementsByClassName('fee-table--container')[0].style.display = 'block';
    document.getElementsByClassName('main-table--left-arrow')[0].style.visibility = 'visible';
    document.getElementsByClassName('main-table--right-arrow')[0].style.visibility = 'hidden';
    document.getElementsByClassName('main-table--date')[0].classList.remove('currency-table--date');
    document.getElementsByClassName('main-table--date')[0].classList.add('fee-table--date');
  });
  // Se ejecuta al presionar el botón izquierdo
  document.getElementsByClassName('main-table--left-arrow')[0].addEventListener('click', () => {
    document.getElementsByClassName('currency-table--container')[0].style.display = 'block';
    document.getElementsByClassName('fee-table--container')[0].style.display = 'none';
    document.getElementsByClassName('main-table--right-arrow')[0].style.visibility = 'visible';
    document.getElementsByClassName('main-table--left-arrow')[0].style.visibility = 'hidden';
    document.getElementsByClassName('main-table--date')[0].classList.remove('fee-table--date');
    document.getElementsByClassName('main-table--date')[0].classList.add('currency-table--date');
  });

}

// Se ejecuta al cargar al página
window.addEventListener('DOMContentLoaded', loadData, false);

