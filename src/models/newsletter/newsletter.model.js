import mongoose from "mongoose";

const schema = new mongoose.Schema({
'email': {
    type: String,
    required:true
}
},{timestamps: true })
export default mongoose.model('newsletters', schema, 'newsletters')