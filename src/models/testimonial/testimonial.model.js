import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'customer_name': {
        type: String,
        required:true
    },
    'customer_address':{
        type:String,
        required:true
    },
    'testimony':{
        type:String,
        required:true
    },
    'testimony_img':{
        type:Object
    },
    'testimony_video':{
        type:String
    }
},{timestamps:true})

export default mongoose.model('testimonials', schema, 'testimonials')