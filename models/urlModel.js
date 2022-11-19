import mongoose from "mongoose";


const Url = mongoose.model("Url", new mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true
    }
}))

export default Url;