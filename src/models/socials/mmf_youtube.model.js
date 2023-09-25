import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'youtube_url': {
        type: String,
        required:true
    },
    'youtube_title':{
        type:String,
        required:true
    },
    'youtube_banner':{
        type:Object
    }
},{timestamps:true})

export default mongoose.model('youtube', schema, 'youtube')