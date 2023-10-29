import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    'car_brand_name':{
        type:String,
        required:true
    },
    'car_brand_image':{
        type:Object
    }
},{timestamps:true})

schema.pre('save', function (next) {
    if (this.isModified('car_brand_name')) {
        this.car_brand_name = this.car_brand_name.toLowerCase();
    }
    next();
});
export default mongoose.model('car-brands', schema, 'car-brands')