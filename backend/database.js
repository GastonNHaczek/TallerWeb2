var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'angular',
    port: 3306
});
connection.connect(function(error){
    if(error){
        throw error
    }else{
        console.log('La base de datos se conecto');
    }
});
module.exports = connection;