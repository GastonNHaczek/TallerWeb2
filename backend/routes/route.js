const router = require('express').Router();
const conexion = require('../database');
/*import Amplify, { Auth } from 'aws-amplify';*/
/*import {awsconfig} from './aws-exports';*/
//import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
/*import Amplify, { Auth } from 'aws-amplify';*/
/*Amplify.configure(aws_exports);
import { withAuthenticator } from 'aws-amplify-angular';*/


//Amplify.configure(awsconfig);
// >>New - Configuring Auth Module
//Auth.configure(awsconfig);

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

//login y registrar
/*Amplify.configure({
    Auth:{
      mandatorySignIn:true,
      region:'us-east-2',
      userPoolId:'us-east-2_kVblsSi2m',
      userPoolWebClienteId:'3v21da7m6f2cvjiit7eub77l0l',
      authenticationFlowType:'USER_PASSWORD_AUTH'
    }
  })*/

  //login con postman
const poolData = {    
    UserPoolId : "us-east-2_kVblsSi2m", // Your user pool id here    
    ClientId : "3v21da7m6f2cvjiit7eub77l0l" // Your client id here
    }; 
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//const app = express();

//app.use(express.json());

router.post('/login', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    //const{username,password,email}= req.body;

    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:req.body.email}));
   // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"nombre",Value:req.body.Name}));
   // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"direccion",Value:req.body.addr}));
   // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"apellido",Value:"+5412614324321"}));
    

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