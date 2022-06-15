var express = require('express');
var router = express.Router();
var pagarMe = require('../lib/pagarMe');

/* POST purchase creation. */
router.post('/', function (req, res, next) {

  pagarMe.purchase(req.body).then((result) => {
    // res.send(result);

    const paymentId = result.data.id;
    const amount = result.data.amount;

    pagarMe.capture(paymentId, amount)
    .then((result) => {
      // console.log(result);
      if (result.data.status == 'paid') {
        res.status(201).send({
          'Status': 'Success',
          'Message': 'Purchase was successfully',
          'PurchaseId': paymentId,
        });
      } else {
        res.status(402).send({
          'Status': 'Failed',
          'Message': 'Purchase not made. Card billing problem',
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }).catch(function (error) {
    console.error(error);
  });
});

/* GET purchase status. */
router.get('/:purchase_id/status', function (req, res, next) {
  //res.send('purchase status');
  pagarMe.consult(req.params.purchase_id)
  .then((result) => {
    //console.log(result);

    let message = {};

    switch (result.data.status) {
      case 'processing':
        message = {
          'Status': 'processing',
        };
        break;
      case 'authorized':
        message = {
          'Status': 'authorized',
        };
        break;
      case 'paid':
        message = {
          'Status': 'paid',
        };
        break;
      case 'refunded':
        message = {
          'Status': 'refunded',
        };
        break;
      case 'waiting_payment':
        message = {
          'Status': 'waiting payment',
        };
        break;
      case 'pending_refund':
        message = {
          'Status': 'pending refund',
        };
        break;
      case 'refused':
        message = {
          'Status': 'refused',
        };
        break;
      case 'chargedback':
        message = {
          'Status': 'charged back',
        };
        break;
      case 'analyzing':
        message = {
          'Status': 'analyzing',
        };
        break;
      case 'pending_review':
        message = {
          'Status': 'pending review',
        };
        break;
    }

    res.send(message);

  }).catch(function (error) {
    console.error(error.response.data);
  });
});

module.exports = router;