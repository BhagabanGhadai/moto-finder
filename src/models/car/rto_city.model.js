import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'city_name':{
        type:String,
        required:true
    },
    'city_image':{
        type:Object
    }
},{timestamps:true})
schema.pre('save', function (next) {
    if (this.isModified('city_name')) {
        this.city_name = this.city_name.toLowerCase();
    }
    next();
});
export default mongoose.model('rto-locations', schema, 'rto-locations')