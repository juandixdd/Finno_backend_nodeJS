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

module.exports = router;