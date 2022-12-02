
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path:'./config.env'})
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then((con)=>{
    console.log("success");
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})