const express=require('express')
const { productcontroller }=require('../controllers')

const router=express.Router()

//====== Router Product ====== //
router.get('/get-product',productcontroller.getProduct)
router.post('/add-product',productcontroller.addProduct)
router.patch('/edit-product/:id',productcontroller.updateProduct)
router.delete('/delete-product/:id',productcontroller.deleteProduct)


module.exports=router