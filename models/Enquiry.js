const mongoose=require('mongoose');

const schema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
        required:true,
    },
    ItemID:{
        type:String,
        required:true,
    }
});
const model=mongoose.model('enquirymodel',schema);

module.exports=model;