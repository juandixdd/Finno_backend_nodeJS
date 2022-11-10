const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../conexion");

//! Get
router.get("/expence", (req, res) => {
  mySqlConnection.query("SELECT * FROM expences", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//! Get by id
router.get("/expence/:id", (req, res) => {
  const { id } = req.params;
  mySqlConnection.query(
    "SELECT * FROM expences WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//! Get expence by period id
router.get("/expences-by-period/:periodId", (req, res) => {
  const { periodId } = req.params;
  const query =
    "select e.*, p.name as 'period_name' from expences e join period p on p.id = e.id_period where id_period = ? order by amount desc";
  mySqlConnection.query(query, [periodId], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//! Get sum of expences
router.get("/expences-sum/:periodId", (req, res) => {
  const { periodId } = req.params;
  const query =
    "select sum(e.amount) as 'expences_sum' from expences e where id_period = ?";
  mySqlConnection.query(query, [periodId], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//! Create
router.post("/expence", (req, res) => {
  const { name, amount, id_period, description, expence_date } = req.body;
  mySqlConnection.query(
    "INSERT INTO expences (name, amount, id_period, description, expence_date) VALUES (?,?,?,?,?)",
    [name, amount, id_period, description, expence_date],
    (err, rows, fields) => {
      if (!err) {
        res.json({ message: "Gasto creado creado", status: 200 });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
