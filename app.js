const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3002;
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Loska256",
  database: "todoapp"
});

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
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
  const sql = "SELECT * FROM task";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM task WHERE id =${id} `;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/add", (req, res) => {
  const sql = "INSERT INTO tasks SET ?";
  const taskObj = {
    title: req.body.title,
    description: req.body.description,
    end_date: req.body.end_date
  };
  connection.query(sql, taskObj, (error, results) => {
    if (error) throw error;
    res.send("Task created");
  });
});

app.fetch("update/:id", () => {
  const { id } = req.params;
  const sql = `UPDATE tasks SET title = ${title}, description = ${description},  end_date = ${endDate} tasks WHERE id = ${id}`;

  connection.query(sql, (error, result) => {
      if (error) throw error;
      res.send(`Task with id: ${id} updated.`)
  })
});

app.delete("delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM tasks WHERE id = ${id}`;
  connection.query(sql, error => {
    if (error) throw error;
    res.send(`Task with id ${id}deleted`);
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
