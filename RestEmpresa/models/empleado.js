const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from empleados", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const create = ({
  nombre,
  dni,
  sexo,
  fecha_nacimiento,
  salario,
  cargo,
  fk_departamento,
  fk_jefe
}) => {
  return new Promise((resolve, reject) => {
    db.query('insert into empleados (nombre, dni, sexo,fecha_nacimiento, fecha_incorporacion, salario, cargo,fk_departamento,fk_jefe) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre,
        dni,
        sexo,
        fecha_nacimiento,
        new Date(),
        salario,
        cargo,
        fk_departamento,
        fk_jefe
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
};

const getById = (pEmpleadoId) => {
  return new Promise((resolve, reject) => {
    db.query('select * from empleados where id = ?', [pEmpleadoId], (err, rows) => {
      if (err) reject(err);
      if (rows.length !== 1) reject('El id no existe');
      resolve(rows[0]);
    })
  })
}


const updateById = (pEmpleadoId, {
  nombre,
  dni,
  sexo,
  fecha_nacimiento,
  salario,
  cargo,
  fk_departamento,
  fk_jefe
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'update empleados set nombre = ?, dni = ?, sexo = ?,fecha_nacimiento = ?, salario = ?, cargo= ?, fk_departamento = ?, fk_jefe= ? where id =?',
      [nombre, dni,
        sexo,
        fecha_nacimiento,
        salario,
        cargo,
        fk_departamento,
        fk_jefe,
        pEmpleadoId
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
  });
}


const deleteById = (pEmpleadoId) => {
  return new Promise((resolve, reject) => {
    db.query('delete from empleados where id = ?', [pEmpleadoId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}



module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};