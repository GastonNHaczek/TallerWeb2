
const express = require('express')
const app = express()
require('./database')

app.use(express.json())
const port = (process.env.PORT || 3000)

app.set('port', port)

app.use('/api', require('./routes/route'))

app.listen(app.get('port'), (error)=>{
    if(error){
        console.log('error al iniciar servidor:' + error)
    }
    else{
        console.log('servidor iniciado: ' + port)
    }
})