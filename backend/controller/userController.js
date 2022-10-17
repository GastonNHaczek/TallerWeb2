const UserModel = require('../model/User')

module.exports = {

    async getUser(req, res) {
        const { params: { firebaseId } } = req
        let userFound

        try {
            userFound = await UserModel.findOne({ firebaseId })
        } catch (error) {
            return res.status(404).json({ message: `User does not exists` })
        }
        res.status(200).json(userFound)
    },

    async createUser(req, res) {
        const { email, name, surname, address, firebaseId } = req.body;
        let errors = validateValues(email, name, surname, address, firebaseId)

        if (errors.length == 0) {
            if (email && name && surname && address && firebaseId) {
                const user = new UserModel({ email, name, surname, address, firebaseId })
                const userCreated = await user.save()
                return res.status(201).json({ user: userCreated })
            }
        }
        res.status(400).json({ message: 'Deben completarse todos los campos correctamente', errors: errors })
    }
}

function validateValues(email, name, surname, address, firebaseId) {
    let errors = []

    if (!email) {
        errors.push('El campo es email requerido')
    } else if (typeof email != 'string') {
        errors.push('El email debe contener caracteres')
    }

    if (!name) {
        errors.push('El campo nombre es requerido')
    } else if (typeof name != 'string') {
        errors.push('El nombre debe contener caracteres')
    }

    if (!surname) {
        errors.push('El campo apellido es requerido')
    } else if (typeof surname != 'string') {
        errors.push('El apellido debe contener caracteres')
    }

    if (!address) {
        errors.push('El campo dirección es requerido')
    } else if (typeof address != 'string') {
        errors.push('La dirección debe contener caracteres')
    }

    if (!firebaseId) {
        errors.push('No se ha ingresado el id de Firebase')
    } else if (typeof firebaseId != 'string') {
        errors.push('El id de Firebase debe contener caracteres')
    }

    return errors;
}
