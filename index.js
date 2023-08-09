const express = require("express")

const app = express();
const cors = require('cors')
                                        
require('./Database/Connection')

const StudentDataRoute = require("./Routes/register")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('',StudentDataRoute)


app.listen(3000,()=>{
    console.log("connected to port")
})

