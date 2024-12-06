const express = require('express');
const cors = require('cors');
const { format, parseISO } = require('date-fns');
const connection = require('./db');
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// aa tarea
app.post('/add-tarea', (req, res) => {
  const tareasInfo = req.body;
  const fechaActual = format(new Date(), 'yyyy-MM-dd');
  tareasInfo.fecha_creacion = fechaActual;

  if (tareasInfo.fecha_limite) {
    try {
      const fechaLimite = parseISO(tareasInfo.fecha_limite);
      tareasInfo.fecha_limite = format(fechaLimite, 'yyyy-MM-dd');
    } catch (error) {
      return res.status(400).send(`Formato de fecha límite inválido: ${error.message}`);
    }
  }

  const query = 'INSERT INTO tareas SET ?';
  connection.query(query, tareasInfo, (err, result) => {
    if (err) {
      return res.status(500).send(`Error al agregar tarea: ${err.message}`);
    }
    return res.status(201).json({ id: result.insertId });
  });
});

// all tareas
app.get('/get-tareas', (req, res) => {
  const query = 'SELECT * FROM tareas';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(`Error al obtener tareas: ${err.message}`);
    }
    return res.status(200).send(results);
  });
});

//  actualizar 
app.put('/update-tarea/:id', (req, res) => {
  const tareaId = req.params.id;
  const tareasInfo = req.body;

  if (tareasInfo.fecha_limite) {
    try {
      const fechaLimite = parseISO(tareasInfo.fecha_limite);
      tareasInfo.fecha_limite = format(fechaLimite, 'yyyy-MM-dd');
    } catch (error) {
      return res.status(400).send(`Formato de fecha límite inválido: ${error.message}`);
    }
  }

  const query = 'UPDATE tareas SET ? WHERE id = ?';
  connection.query(query, [tareasInfo, tareaId], (err) => {
    if (err) {
      return res.status(500).send(`Error al actualizar tarea: ${err.message}`);
    }
    return res.status(200).send('Tarea actualizada');
  });
});

//dlete
app.delete('/delete-tarea/:id', (req, res) => {
  const tareaId = req.params.id;
  const query = 'DELETE FROM tareas WHERE id = ?';
  connection.query(query, [tareaId], (err) => {
    if (err) {
      return res.status(500).send(`Error al borrar tarea: ${err.message}`);
    }
    return res.status(200).send('Tarea borrada');
  });
});

app.get('/filter-tareas', (req, res) => { 
  const estado = req.query.estado; 
  if (!estado) { 
    return res.status(400).send('Estado es requerido'); 
  
  } 
  const query = 'SELECT * FROM tareas WHERE estado = ?'; 
  connection.query(query, [estado], (err, results) => { 
    if (err) { 
      return res.status(500).send(`Error al obtener tareas: ${err.message}`); 
        } 
      return res.status(200).send(results); 
    });
});
app.put('/complete-tarea/:id', (req, res) => { 
  const tareaId = req.params.id; 
  const query = 'UPDATE tareas SET estado = 2 WHERE id = ?';
  connection.query(query, [tareaId], (err, result) => { 
    if (err) { 
      return res.status(500).send(`Error al actualizar tarea: ${err.message}`); 
    } return res.status(200).send('Estado de la tarea actualizado a completado'); 
  }); 
});
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
