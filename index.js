const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const app=express()

const PORT = 4040;

app.use(cors())
app.use(bodyparser.json())/
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send('<h1>Ujian Backend API </h1>')
})

const { productrouter,storerouter,invenrouter }=require('./routers')

app.use('/product',productrouter)
app.use('/store',storerouter)
app.use('/inven',invenrouter)



app.listen(PORT,()=>console.log(`Api jalan di PORT ${PORT}`))