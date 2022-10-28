const router = require('express').Router();
const conexion = require('../database');

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


module.exports = router