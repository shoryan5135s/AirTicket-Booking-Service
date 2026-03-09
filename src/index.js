const express=require('express')
const bodyParser=require('body-parser')


const app=express();

const {PORT}=require('./config/serverConfig.js');
const apiRoutes=require('./Routes/index.js')
const db=require('../models/index.js')
const setupAndStartServer=()=>{


    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.use('/api',apiRoutes)

    app.listen(PORT,()=>{

        console.log(`server is running at ${PORT}`);
        

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }





    })





}



setupAndStartServer();