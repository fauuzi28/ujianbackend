const { db } = require("../connections");
const { uploader } = require("../helper/uploader");
const fs = require("fs");


module.exports = {
  // ===========
  //  PRODUCT
  // ===========
  getProduct: (req, res) => {
    var sql = `select * from product`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(result);
    });
  },

  addProduct: (req, res) => {
    const path = '/product'
        const upload = uploader(path, 'PROD').fields([{ name : 'image' }]);
        upload(req, res, (err) => {
            const { image } = req.files;
            const { nama, harga } = JSON.parse(req.body.data)
            const imagePath = image ? `${path}/${image[0].filename}` : null
    
            let sql = `INSERT INTO product (nama, harga, imagePath) VALUES ('${nama}', ${harga}, '${imagePath}')`
            db.query(sql, req.body, (err, result) => {
                if(err){
                    fs.unlinkSync(`./public${imagePath}`)
                    res.status(500).send(err.message)
                }
                res.status(200).send(result)
            })
        })
    },

  updateProduct: (req, res) => {
    let { id } = req.params
    let sql = `select * from product where product_id = ${id}`;
    db.query(sql, (err, results) => {
        if(err)res.status(500).send(err.message)

        const oldImagePath = results[0].imagePath
        const path = '/images'
        const upload = uploader(path, 'IMG').fields([{ name : 'image' }])
        upload(req, res, (err) => {
            const { image } = req.files;
            const { nama, harga } = JSON.parse(req.body.data)
            const imagePath = image ? `${path}/${image[0].filename}` : null

            let sql = `update product set nama = '${nama}', harga = ${harga}, imagePath = '${imagePath}' where product_id = ${id}`;
            db.query(sql, req.body, (err, update) => {
                if(err){
                    fs.unlinkSync(`./public${imagePath}`)
                    res.status(500).send(err.message)
                }
                if(image){
                    fs.unlinkSync(`./public${oldImagePath}`)
                }
                res.status(200).send({
                    status : "successful edited",
                    message : "data has edited"
                })
            })
        })
    })
  },

  deleteProduct:(req,res)=>{
    var { id } = req.params
    var sql = `select * from product where product_id = ${id}`;
    db.query(sql, (err, results) => {
        if(err)res.status(500).send(err.message)

        const oldImagePath = results[0].imagePath
        var sql = `delete from product where product_id = ${id}`;
        db.query(sql, (err, response) => {
            if(err)res.status(500).send(err.message)
            fs.unlinkSync(`./public${oldImagePath}`)
            res.status(200).send({
                status : "successful deleted",
                message : "data has deleted"
            })
        })
    })
  },
};