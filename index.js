const Usuario = require('./controllers/usuarios');
const Curso = require('./controllers/cursos');



const express = require('express');
const mongoose = require('mongoose');

//Conexion a la base de datos mongodb
mongoose.connect('mongodb://localhost:27017/userscoursesdb')
   .then(() => console.log('Conectado a MongoDB...'))
   .catch(err => console.log('no se pudo concetar con MongoDB..', err));

// middleware 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// end point (cursos)
app.use('/api/usuarios', Usuario);
app.use('/api/cursos', Curso);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Api REST ok, y ejecutandose...');
})