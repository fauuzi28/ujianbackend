const express=require('express')
const { inventorycontroller }=require('../controllers')

const router=express.Router()

//====== Router Inventory ====== //
router.get('/get-inventory',inventorycontroller.getInven)
router.post('/add-inventory',inventorycontroller.addInven)
router.patch('/edit-inventory/:id',inventorycontroller.editInven)
router.delete('/delete-inventory/:id',inventorycontroller.deletInven)




module.exports=router