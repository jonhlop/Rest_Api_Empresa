const router = require('express').Router();
const moment = require('moment');


const Departamento = require('../models/departamento');

router.get('/',(req,res)=>{
    Departamento.getAll()
})






module.exports = router;