import mongoose from "mongoose";

const schema = new mongoose.Schema({
'mobile': {
    type: Number,
    required:true
},
'status':{
    type:String,
    enum:["pending","compelted"],
    default:"pending"
}
},{timestamps: true })
export default mongoose.model('contact-requests', schema, 'contact-requests')