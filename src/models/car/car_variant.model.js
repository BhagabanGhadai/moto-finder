import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'car_brand':{
        type:mongoose.Types.ObjectId,
        ref:"car-brands"
    },
    'car_model':{
        type:mongoose.Types.ObjectId,
        ref:"car-models"
    },
    'car_variant_name':{
        type:String,
        required:true
    }
},{timestamps:true})
schema.pre('save', function (next) {
    if (this.isModified('car_variant_name')) {
        this.car_variant_name = this.car_variant_name.toLowerCase();
    }
    next();
});
export default mongoose.model('car-variants', schema, 'car-variants')