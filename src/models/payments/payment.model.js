import mongoose from "mongoose";

const schema = new mongoose.Schema({
'inspection_request_id':{
    type: mongoose.Schema.Types.ObjectId,
    ref:"sell-requests"
},
'car_id':{
    type:mongoose.Schema.Types.ObjectId,
    ref:"car-details"
},
'user_id': {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user-details"
},
'plan_id':{
    type:mongoose.Schema.Types.ObjectId,
    ref: "plans"
},
'price':{
    type:Number
},
'order_id':{
    type:String
},
'transcation_id':{
    type:String
},
'signature':{
    type:String
},
'payment_time':{
    type:Date
},
'status':{
    type:String,
    enum:["initiate","success","failed"],
    default:"initiate"
}
},{timestamps: true })
export default mongoose.model('payments', schema, 'payments')