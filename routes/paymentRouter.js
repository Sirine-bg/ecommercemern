const router = require('express').Router()
const paymentCtrl = require('../controllers/payementCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/payment')
    .get( paymentCtrl.getPayments)
    .post( paymentCtrl.createPayment)


module.exports = router