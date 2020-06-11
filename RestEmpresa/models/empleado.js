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

module.exports = {
  getAll, create
};