const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../conexion");

//! Get
router.get("/income", (req, res) => {
  mySqlConnection.query("SELECT * FROM incomes", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//! Get by id
router.get("/income/:id", (req, res) => {
  const { id } = req.params;
  mySqlConnection.query(
    "SELECT * FROM incomes WHERE id = ?",
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

//! Get income by period id
router.get("/incomes-by-period/:periodId", (req, res) => {
  const { periodId } = req.params;
  const query =
    "select * from incomes where id_period = ? order by amount desc";
  mySqlConnection.query(query, [periodId], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//! Create
router.post("/income", (req, res) => {
  function createIncome() {
    const { name, amount, id_period } = req.body;
    mySqlConnection.query(
      "INSERT INTO incomes (name, amount, id_period) VALUES (?,?,?)",
      [name, amount, id_period],
      (err, rows, fields) => {
        if (!err) {
          res.json({ status: "Ingreso creado", statusCode: 200 });
        } else {
          console.log(err);
        }
      }
    );
  }

  createIncome();
});

module.exports = router;
