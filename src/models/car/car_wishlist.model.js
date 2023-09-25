import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'user_id': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user-details"
    },
    'car_id':{
        type:mongoose.Schema.Types.ObjectId,
        ref:"car-details"
    }
},{timestamps:true})

export default mongoose.model('user-wishlist', schema, 'user-wishlist')