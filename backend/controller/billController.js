const BillModel = require('../model/Bill')

module.exports = {

    async getBills(req, res) {
        const bills = await BillModel.find()
        res.send({ "length": bills.length, "bills": bills })
    },

    async getBill(req, res) {
        const { params: { _id } } = req
        let billFound

        try {
            billFound = await BillModel.findOne({ _id })
        } catch (error) {
            return res.status(404).json({ message: `La compra ${_id} no existe` })
        }
        res.status(200).json(billFound)
    },

    async createBill(req, res) {
        const { cardName, cardNumber, cardSecurityCode, cardExpiration, products, buyer } = req.body
        let errors = []

        if (cardName && cardNumber && cardSecurityCode && cardExpiration && products && buyer) {
            validateValues(cardName, cardNumber, cardSecurityCode, cardExpiration, products, errors)

            if (errors.length == 0) {
                const bill = new BillModel({ cardName, cardNumber, cardSecurityCode, cardExpiration, products, buyer })
                const billCreated = await bill.save()
                return res.status(201).json({ bill: billCreated, message: "Compra realizada con éxito" })
            }
        }
        res.status(400).json({ message: 'Se deben completar todos los datos para hacer una compra', errors: errors })
    }
}

function validateValues(cardName, cardNumber, cardSecurityCode, cardExpiration, products, errors) {
    if (!cardName) {
        errors.push('Card name attribute is required')
    } else if (typeof cardName != 'string') {
        errors.push('Card name attribute must be a string')
    }

    if (!cardNumber) {
        errors.push('Card number attribute is required')
    } else if (typeof cardNumber != 'number') {
        errors.push('Card number attribute must be a number')
    }


    if (!cardSecurityCode) {
        errors.push('Card security code attribute is required')
    } else if (typeof cardSecurityCode != 'number') {
        errors.push('Card security code attribute must be a number')
    }

    if (!cardExpiration) {
        errors.push('Card expiration attribute is required')
    } else if (typeof cardExpiration != 'string') {
        errors.push('Card expiration attribute must be a date')
    }

    if (!products) {
        errors.push('Products attribute is required')
    } else if (typeof products != 'object') {
        errors.push('Products attribute must be an object')
    }
}
