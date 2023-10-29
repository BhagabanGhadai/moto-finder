import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'user_id': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user-details"
    },
    'car_brand':{
        type:mongoose.Schema.Types.ObjectId,
        ref:"car-brands"
    },
    'rto_location': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rto-locations"
    },
    'year': {
        type: Date,
        required: true
    },
    'car_model': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car-models"
    },
    'owner_serial_no': {
        type: Number,
        required: true
    },
    'kms_driven': {
        type: Number,
        required: true
    },
    'transmission':{
        type:String,
        enum:["Automatic","Manual"],
        required:true
    },
    'when_want_to_sell': {
        type: String,
        validate: {
            validator: (v) => {
                if (!(v == 'immediately' || v == 'in a month'|| v == ' after a month' || v == 'just checking price')) {
                    return false
                }
                return true
            },
            msg: 'Invalid type'
        }
    },
    'status': {
        type: String,
        validate: {
            validator: (v) => {
                if (!(v == 'initiated' || v == 'paid' || v == 'cancelled'|| v=="approved")) {
                    return false
                }
                return true
            },
            msg: 'Invalid status'
        },
        default:'initiated'
    },
    'expected_price':{
        type:Number
    },
    'schedule_date':{
        type:Date
    },
    'is_dealer_verification':{
        type:Boolean,
        default:false
    },
    'contact_details':{
        'full_name':{
            type:String
        },
        'email':{
            type:String
        },
        'phone_number':{
            type:Number
        },
        'state':{
            type:String
        },
        'city':{
            type:String
        },
        'pincode':{
            type:Number
        },
        'address':{
            type:String
        }
    }
},{timestamps: true })
export default mongoose.model('sell-requests', schema, 'sell-requests')