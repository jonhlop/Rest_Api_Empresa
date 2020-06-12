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

router.get('/new', (req, res) => {
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

//peticion para editar
router.get('/edit/:idEmpleado', async (req, res) => {
    try {
        const empleado = await Empleado.getById(req.params.idEmpleado);
        empleado.fecha_nacimiento = moment(empleado.fecha_nacimiento).format('YYYY-MM-DD');
        res.render('empleados/formEdit', { empleado });
    } catch (err) {
        res.send(err);
    }
});

router.post('/update', async (req, res) => {
    try {
        const result = await Empleado.updateById(req.body.idEmpleado, req.body);
        res.redirect('/empleados');
    } catch (err) {
        res.send(err);
    }
});

router.get('/delete/:idEmpleado', (req, res) => {
    Empleado.deleteById(req.params.idEmpleado)
        .then(result => {
            res.redirect('/empleados');
        })
        .catch(err => {
            res.send(err);
        });
});




module.exports = router;