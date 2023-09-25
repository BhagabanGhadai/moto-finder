import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'blog_title': {
        type: String,
        required:true
    },
    'date':{
        type: String,
        required:true
    },
    'description':{
        type:String,
        required:true
    },
    'blog_banner':{
        type:Object
    }
},{timestamps:true})

export default mongoose.model('blog', schema, 'blog')