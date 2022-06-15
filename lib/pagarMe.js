const axios = require('axios');

class PagarMe {
  static purchase(params) {

    return axios.post('https://api.pagar.me/1/transactions', params, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  static capture(paymentId, amount) {
    // console.log(paymentId, amount)

    return axios.post('https://api.pagar.me/1/transactions/' + paymentId + '/capture', {
      amount: amount,
      api_key: 'ak_test_qZ8moDhBmUqUL8v79MmYCTHkp7xRs5'
    }, 
    {
      headers: {
        'content-type': 'application/json',
      }
    });
  }

  static consult(paymentId) {
    
    return axios.get('https://api.pagar.me/1/transactions/' + paymentId, 
    {
      params: {
        api_key: 'ak_test_qZ8moDhBmUqUL8v79MmYCTHkp7xRs5'
      },
      headers: {
        'content-type': 'application/json',
      }
    });
  }
}

module.exports = PagarMe;