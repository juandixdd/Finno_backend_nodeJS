const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../conexion");

//! Get
router.get("/period", (req, res) => {
  mySqlConnection.query("SELECT * FROM period", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//! Get by id
router.get("/period/:id", (req, res) => {
  const { id } = req.params;
  mySqlConnection.query(
    "SELECT * FROM period WHERE id = ?",
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

//! Get period by userId
router.get("/period-by-user/year/:userId/:year", (req, res) => {
  const { userId, year } = req.params;
  const query = `
    select
    *
  from
    period
  where
    id_user = ?
  and 
    year(date_start) = ?
  order by
    date_finish desc
    `;
  mySqlConnection.query(query, [userId, year], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//! Get total_expences by periodID
router.get("/total-expences/:periodId", (req, res) => {
  const { periodId } = req.params;
  mySqlConnection.query(
    "select p.id as 'period_id', p.name, sum(e.amount) as 'total_expences' from period p join expences e on e.id_period = p.id where p.id = ?",
    [periodId],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//! Get total_incomes by periodID
router.get("/total-incomes/:periodId", (req, res) => {
  const { periodId } = req.params;
  mySqlConnection.query(
    "select p.id as 'period_id', p.name, sum(i.amount) as 'total_expences' from period p join incomes i on i.id_period = p.id where p.id = ?",
    [periodId],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//! Crear un periodo =====================================================================================
router.post("/period", (req, res) => {
  function createUser() {
    const { name, id_user, date_start, date_finish } = req.body;
    mySqlConnection.query(
      "INSERT INTO period (name, id_user, date_start, date_finish) VALUES (?,?,?,?)",
      [name, id_user, date_start, date_finish],
      (err, rows, fields) => {
        if (!err) {
          res.json({ message: "Periodo creado", status: 200 });
        } else {
          console.log(err);
        }
      }
    );
  }

  createUser();
});

module.exports = router;
