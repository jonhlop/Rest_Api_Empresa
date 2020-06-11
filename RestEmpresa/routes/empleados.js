const router = require('express').Router();
const moment = require('moment');


const Empleado = require('../models/empleado');


router.get('/', (req, res) => {
    Empleado.getAll()
        .then(rows => {
            res.render('empleados/index', {
                empleados: rows
            });
        })
        .catch(err => {
            res.send(err);
        });
});

router.get('/new', (req, res)=>{
    res.render('empleados/formCreate')
  });

// Petición cuando hacemos SUBMIT del formulario de creación
 router.post('/create', async (req, res) => {
    try {
        const result = await Empleado.create(req.body);
        res.redirect('/empleados');
    } catch (err) {
        res.send(err);
    }
}); 


module.exports = router;