const mongoose = require('mongoose'); //importing mongoose

const mustDoSchema = new mongoose.Schema({
    item:{
        type:String,
        required : true
    }
})

//exporting
module.exports= mongoose.model("mustDo", mustDoSchema);