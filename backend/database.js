var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bariloche10',
    database: 'tallerweb2',
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