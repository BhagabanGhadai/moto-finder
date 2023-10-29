import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'instagram_url': {
        type: String,
        required:true
    },
    'instagram_title':{
        type: String,
        required:true
    },
    'price':{
        type:Number,
        required:true
    },
    'instagram_banner':{
        type:Object
    },
    'instagram_video':{
        type:String
    }
},{timestamps:true})

export default mongoose.model('instagram', schema, 'instagram')