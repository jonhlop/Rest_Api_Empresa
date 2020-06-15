const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Empleado = require('../../models/empleado');


// GET http://localhost:3000/api/empleados
// Recupera todos los clientes
router.get('/', (req, res) => {
    Empleado.getAll()
        .then((rows) => {
            res.json(rows);
        })
        .catch(err => {
            res.json({ error: err.message });
        });
});

//POST http://localhost:3000/api/empleados
// Crea un nuevo empleado en la BD
router.post('/',  [
    check('dni', 'El dni es obligatorio y debe tener un formato correcto').exists().matches(/(^([0-9]{8,8}\-[A-Z])|^)$/,"i"),
    check('nombre', 'El campo nombre es obligatorio').exists().isLength({ min: 3 })
], async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.json(errores.array());
    }

    const result = await Empleado.create(req.body);
    if (result['affectedRows'] === 1) {
        const empleado = await Empleado.getById(result['insertId']);
        res.json({ success: 'Se ha insertado el empleado', empleado: empleado });
    } else {
        res.json({ error: 'No se ha insertado' });
    }
});
// DELETE http://localhost:3000/api/empleados/10
//Borrar un empleado
router.delete('/:idEmpleado', async (req, res) => {
    // RECUPERO EL empleado
    const empleado = await Empleado.getById(req.params.idEmpleado);
    // BORRO EL empleado
    const result = await Empleado.deleteById(req.params.idEmpleado);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha borrado el empleado', empleadoDeleted: empleado });
    } else {
        res.json({ error: 'No se ha borrado' });
    }
});


// PUT http://localhost:3000/api/empleado/idempleado
// Edita los datos de un empleado
router.put('/:idEmpleado', async (req, res) => {
    const result = await Empleado.updateById(req.params.idEmpleado, req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha actualizado el empleado' });
    } else {
        res.json({ error: 'No se ha actualizado' });
    }
});



module.exports = router;