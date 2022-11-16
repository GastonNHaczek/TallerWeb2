const router = require('express').Router();
const conexion = require('../database');

//login
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

//obtiene todos los productos
router.get('/', function (req, res) {
    let sql = 'select * from Producto'
    conexion.query(sql, (err, rows, fields) =>{
        if(err)
            throw err;
        else
            res.json(rows);
    })
});

//obtiene el producto por id
router.get('/:id', function(req, res) {
    const{id} = req.params
    let sql = 'select * from Producto where id = ?'
    conexion.query(sql, [id],(err, rows, fields) => {
        if(err)
            throw err;
        else
            res.json(rows);
    })
});

//agrega el producto a la base de datos
router.post('/', (req, res) => { 
    const{nombre, descripcion, clasificacion, precio, imagen} = req.body;
    let sql = `insert into Producto(nombre, descripcion, clasificacion,precio,imagen) values('${nombre}', '${descripcion}', '${clasificacion}', '${precio}', '${imagen}')`;
    conexion.query(sql, (err, rows, fields) => {
        if (err) 
            throw err;
        else {
            res.json({status: 'producto agregado'});
        }
    })
});  

router.post('/carrito', (req, res) => { 
    const{precio, cantidad} = req.body;
    let sql = `insert into Carrito(Precio, Cantidad) values('${precio}', '${cantidad}')`;
    conexion.query(sql, (err, rows, fields) => {
        if (err) 
            throw err;
        else {
            res.json({status: 'Pago exitoso'});
        }
    })
}); 

//Elimiacion de productos
router.delete('/:id', (req, res) => {
    const{id} = req.params;

    let sql = `delete from producto where id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err)
            throw err;
        else {
            res.json({status: 'producto eliminado'});
        }
    })
});

//actualizar producto
router.put('/:id', (req, res) => {
    const{id} = req.params;
    const{nombre, descripcion, clasificacion, precio} = req.body;
    let sql = `update producto set
                nombre = '${nombre}',
                descripcion = '${descripcion}',
                clasificacion = '${clasificacion}',
                precio = '${precio}'
                where id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err)
            throw err;
        else {
            res.json({status: 'producto modificado'});
        }
    })
});

  //login con postman
const poolData = {    
    UserPoolId : "us-east-2_kVblsSi2m", // Your user pool id here    
    ClientId : "3v21da7m6f2cvjiit7eub77l0l" // Your client id here
    }; 
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

router.post('/registrar', (req, res) => {

    const { email, nombre, apellido, direccion, password } = req.body;
    let errors = validateValues(email, nombre, apellido, direccion, password);

    if(errors.length > 0) {
        res.status(400).json({ message: 'Deben completarse correctamente todos los campos del formulario', errors: errors });
    }
    else {
        console.log("JSON:" + JSON.stringify(req.body));

        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:req.body.email}));

        userPool.signUp(req.body.username, req.body.password, attributeList, null, function(err, result){
            if (err) {
                console.log(err);
                res.json(err);
                return;
            }
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            res.json({
                bienvenido: `${cognitoUser.getUsername()}`
            })
        });
    }
});

router.post('/login',(req,res) => {
    console.log("JSON:"+JSON.stringify(req.body));
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : req.body.username,
        Password : req.body.password,
    });

    var userData = {
        Username : req.body.username,
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());

        },
        onFailure: function(err) {
            console.log(err);
        }
    });

})

function validateValues(email, password, name, surname, address) {
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

    if(!password) {
        errors.push('El campo contraseña es requerido')
    } else if (typeof password != 'string') {
        errors.push('La contraseña debe contener caracteres')
    }

    return errors;
}

module.exports = router