const ProductModel = require('../model/Product')

module.exports = {

    async getProducts(req, res) {
        const products = await ProductModel.find()
        res.send({ "length": products.length, "products": products })
    },

    async getProduct(req, res) {
        const { params: { _id } } = req
        let productFound 

        try {
            productFound = await ProductModel.findOne({ _id })
        } catch (error) {
            return res.status(404).json({ message: `Product ${_id} does not exists` })
        }
        res.status(200).json(productFound)
    },

    async createProduct(req, res) {
        const { name, description, type, price, photoUrl } = req.body
        let errors = []

        validateValues(name, errors, description, type, price, photoUrl)

        if (name && description && type && price && photoUrl) {
            const product = new ProductModel({ name, description, type, price, photoUrl })
            const productCreated = await product.save()
            return res.status(201).json({ product: productCreated })
        }
        res.status(400).json({ message: 'Not enough properties to create a product', errors: errors })
    },

    async changeProduct(req, res) {
        const { params: { _id } } = req
        const { name, description, type, price, photoUrl } = req.body
        const update = {}

        if (name) update.name = name
        if (description) update.description = description
        if (type) update.type = type
        if (price) update.price = price
        if (photoUrl) update.photoUrl = photoUrl

        const productUpdated = await ProductModel.updateOne({ _id }, update)

        if (productUpdated.n) { //n == numero de documentos modificados
            const product = await ProductModel.findOne({ _id });
            return res.status(200).json({ message: 'Product updated', product: product });
        }
        res.status(404).json({ message: `Product ${_id} does not exists` });
    },

    deleteProduct(req, res) {
        const { params: { _id } } = req

        ProductModel.deleteOne({ _id }, (err) => {
            if (err) {
                return res.status(404).json({ message: `Product ${_id} does not exists` });
            }
            res.status(200).json({ message: 'Product deleted' });
        })
    }

}

function validateValues(name, errors, description, type, price, photoUrl) {
    if (!name) {
        errors.push('Name attribute is required')
    } else if (typeof name != 'string') {
        errors.push('Name attribute must be a string')
    }

    if (!description) {
        errors.push('Description attribute is required')
    } else if (typeof description != 'string') {
        errors.push('Description attribute must be a string')
    }

    if (!type) {
        errors.push('Type attribute is required')
    } else if (typeof type != 'string') {
        errors.push('Type attribute must be a string')
    }

    if (!price) {
        errors.push('Price attribute is required')
    } else if (typeof price != 'number') {
        errors.push('Price attribute must be a number')
    }

    if (!photoUrl) {
        errors.push('PhotoUrl attribute is required')
    } else if (typeof photoUrl != 'string') {
        errors.push('PhotoUrl attribute must be a string')
    }
}
