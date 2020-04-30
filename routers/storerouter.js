const express=require('express')
const {storecontroller}=require('../controllers')

const router=express.Router()

//====== Store Router ======//

router.post('/add-store',storecontroller.addStore)
router.get('/get-store',storecontroller.getStore)
router.patch('/edit-store/:id',storecontroller.editStore)
router.delete('/delete-store/:id',storecontroller.deleteStore)

module.exports=router