const { db } = require("../connections");
const fs = require("fs");


module.exports = {
  addStore: (req, res) => {
    var sql = "insert into store set ?";
    db.query(sql, req.body, (err, result) => {
      if (err) res.status(500).send(err);
      sql = "select * from store";
      db.query(sql, (err, result1) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result1);
      });
    });
  },

  getStore: (req, res) => {
    var sql = `select * from store`;
    db.query(sql, (err, results) => {
      if (err) res.status(500).send(err.message);
      res.status(200).send(results);
    });
  },
  editStore: (req, res) => {
    var sql = `update store set ? where store_id = ${req.params.id}`;
    db.query(sql, req.body, (err, results) => {
      if (err) res.status(500).send(err.message);
      res.status(200).send({
        status: "successful edited",
        message: "store has edited",
      });
    });
  },
  deleteStore: (req, res) => {
    var sql = `delete from store where store_id = ${req.params.id}`;
    db.query(sql, (err, results) => {
      if (err) res.status(500).send(err.message);
      res.status(200).send({
        status: "successful deleted",
        message: "store has deleted",
      });
    });
  },
};