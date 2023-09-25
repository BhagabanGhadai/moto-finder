import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    'car_brand':{
        type:mongoose.Types.ObjectId,
        ref:"car-brands"
    },
    'car_model_name':{
        type:String,
        required:true
    }
},{timestamps:true})
schema.pre('save', function (next) {
    if (this.isModified('car_model_name')) {
        this.car_model_name = this.car_model_name.toLowerCase();
    }
    next();
});
export default mongoose.model('car-models', schema, 'car-models')