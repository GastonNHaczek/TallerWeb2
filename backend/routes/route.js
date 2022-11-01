const router = require('express').Router();
const conexion = require('../database');

//login
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
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

//login
const poolData = {    
    UserPoolId : "us-east-2_NXGNelek7", // Your user pool id here    
    ClientId : "3rcqik3ot5p7eeal5f7gdi38ba" // Your client id here
    }; 
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//const app = express();

//app.use(express.json());

router.post('/login', (req, res) => {
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
   
});

module.exports = router