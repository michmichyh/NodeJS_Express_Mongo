const express = require('express');
const logic = require ('../logic/usuario_logic');
const ruta = express.Router();

//Endpoint TIPO GET: un punto de acceso o una URL específica que un servicio o aplicación expone para realizar operaciones o intercambiar información. Cada endpoint está asociado con una acción o recurso específico.
ruta.get('/',(req, res) => {
    let resultado = logic.listarUsuarioActivos();
    resultado.then(usuarios => {
    res.json(usuarios)
    }).catch(err => {
      res.status(400).json(
          {
              err
          }
      )
    })
    });
//Entpoint de tipo POST para el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;

    const {error, value} = logic.Schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
        let resultado = crearUsuario(body);

        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });

    }else{
        res.status(400).json({
            error
        })
    }
}); 
//Endpoint de tipo PUT para actualizar los datos del usuario 
ruta.put('/:email', (req, res) => {
    const {error, value} = logic.Schema.validate({nombre: req.body.nombre});
    if(!error){
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor => {
            res.json({
                valor
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});


//Endpoint de tipo DELETE para el recurso USUARIOS
ruta.delete('/:email', (req, res) => {
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor 
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

module.exports = ruta;