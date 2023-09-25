import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'user_id': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user-details"
    },
    'car_brand':{
        type:mongoose.Types.ObjectId,
        ref:"car-brands"
    },
    'rto_location': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rto-locations"
    },
    'year': {
        type: Number,
        required: true
    },
    'model': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car-models"
    },
    'owner_serial_no': {
        type: String,
        required: true
    },
    'kms_driven': {
        type: String,
        required: true
    },
    'transmission':{
        type:String,
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
                if (!(v == 'initiated' || v == 'pending'|| v == 'cancelled')) {
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
    }
},{timestamps: true })
export default mongoose.model('sell-requests', schema, 'sell-requests')