const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/students-api",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify : false
}).then(()=>{
    console.log("connection is securd");
}).catch((error)=>{
    console.log("connection is not secured");
})