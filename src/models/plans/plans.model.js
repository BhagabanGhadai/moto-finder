import mongoose from "mongoose";

const schema = new mongoose.Schema({
'plan_name':{
    type:String,
    required:true
},
'plan_amount':{
    type:Number,
    required:true
},
'plan_description':{
    type:[String],
    required:true
},
'number_of_leads':{
    type:Number,
    required:true
},
'is_best_deal':{
    type:Boolean,
    default:false
}
},{timestamps: true })
export default mongoose.model('plans', schema, 'plans')