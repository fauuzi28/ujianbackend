const { db } = require("../connections");
const { uploader } = require("../helper/uploader");
const fs = require("fs");



module.exports = {
  addInven: (req, res) => {
    var sql = `insert into inventory set ?`;
    db.query(sql, req.body, (err, results) => {
      if (err) res.status(500).send(err.message);
      res.status(200).send({
        status: "successful added",
        message: "inventory has created",
      });
    });
  },
  getInven: (req, res) => {
    var sql = `select nama as "Product", branch_name as "Branch Name", inventory as "Stock"
    from inventory i
    join product p on i.id_product = p.product_id
    join store s on i.id_store = s.store_id;`;
    db.query(sql, (err, results) => {
      if (err) res.status(500).send(err.message);
      res.status(200).send(results);
    });
  },
  editInven: (req, res) => {
    var sql = `update inventory set ? where idinventory = ${req.params.id}`;
    db.query(sql, req.body, (err, results) => {
      if (err) res.status(500).send(err.message);
      res.status(200).send({
        status: "successful edited",
        message: "inventory has edited",
      });
    });
  },
  deletInven: (req, res) => {
    var id = req.params.id
    var sql = `delete from inventory where idinventory = ${id}`;
    db.query(sql, (err, results) => {
      if (err) res.status(500).send(err.message);
      res.status(200).send({
        status: "successful deleted",
        message: "inventory has deleted",
      });
    });
  },
};