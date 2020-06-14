const router = require('express').Router();
const {
    check,
    validationResult
} = require('express-validator');

const Departamento = require('../../models/departamento');

// GET http://localhost:3000/api/departamentos
// Recupera todos los departamentos
router.get('/', (req, res) => {
    Departamento.getAll()
        .then((rows) => {
            res.json(rows);
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });
});


router.post('/', [
    check('nombre', 'El campo nombre es obligatorio').exists().isLength({
        max: 30
    }),
    check('ciudad', 'El campo ciudad es obligaorio').exists().isLength({
        max: 30
    })
], async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.json(errores.array());
    }

    const result = await Departamento.create(req.body);
    if (result['affectedRows'] === 1) {
        const departamento = await Departamento.getById(result['insertId']);
        res.json({
            success: 'Se ha insertado el departamento',
            departamento: departamento
        });
    } else {
        res.json({
            error: 'No se ha insertado'
        });
    }
});


// PUT http://localhost:3000/api/departamentos/idepartamento
// Edita los datos de un departamento
router.put('/:idDepartamento', async (req, res) => {
    const result = await Departamento.updateById(req.params.idDepartamento, req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha actualizado el departamento' });
    } else {
        res.json({ error: 'No se ha actualizado' });
    }
});




// DELETE http://localhost:3000/api/departamentos/10
//Borrar un departamento
router.delete('/:idDepartamento', async (req, res) => {
    // RECUPERO EL DEPARTAMENTO
    const departamento = await Departamento.getById(req.params.idDepartamento);
    // BORRO EL DEPARTAMENTO
    const result = await Departamento.deleteById(req.params.idDepartamento);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha borrado el departamento', departamentoDeleted: departamento });
    } else {
        res.json({ error: 'No se ha borrado' });
    }
});


module.exports = router;