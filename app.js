const express = require("express");
var cors = require('cors');
const mysql = require("mysql");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3010;
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Loska256",
  database: "todoapp"
});



app.use(bodyParser.json());

app.use(cors())
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM todoapp.task ORDER BY created_at DESC";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM todoapp.task WHERE id =${id} `;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/tasks/add", (req, res) => {
  const sql = "INSERT INTO todoapp.task SET ?";
  const taskObj = {
    title: req.body.title,
    description: req.body.description,
    status: "todo"
  };
  connection.query(sql, taskObj, (error, results) => {
    if (error) throw error;
    res.send("Task created");
  });
});

app.patch("/tasks/update", (req, res) => {
  const { id, title, description, status } = req.body;
  const sql = `UPDATE todoapp.task SET title = '${title}', description = '${description}',  status = '${status}' WHERE id = ${id}`;
  connection.query(sql, err => {
    if (err) throw err;
    res.send('Prospect updated!');
  });
});

app.delete("/tasks/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM todoapp.task WHERE id = ${id}`;
  connection.query(sql, error => {
    if (error) throw error;
    res.send(`Task with id ${id}deleted`);
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
