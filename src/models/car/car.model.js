import mongoose from "mongoose";

const schema = new mongoose.Schema({
    'inspection_request_id':{
        type: mongoose.Types.ObjectId,
        ref: "sell-requests"
    },
    'car_slug': {
        type: String
    },
    'car_title': {
        type: String
    },
    'car_brand': {
        type: mongoose.Types.ObjectId,
        ref: "car-brands"
    },
    'car_model': {
        type: mongoose.Types.ObjectId,
        ref: "car-models"
    },
    'make_year': {
        type: Date
    },
    'registration_year': {
        type: Date
    },
    'insurance_type': {
        type: String
    },
    'fuel_type': {
        type: String
    },
    'kms_driven': {
        type: String
    },
    'car_variant': {
        type: mongoose.Types.ObjectId,
        ref: "car-variants"
    },
    'insurance_validity':{
        type:Date
    },
    'color': {
        type: String
    },
    'rto': {
        type: String
    },
    'mmf_assured': {
        type: String,
        enum: ["yes", "no"]
    },
    'car_banner':{
        type:Object
    },
    'rc_photos': [
        {
            rc_img: Object
        }
    ],
    'exterior_photos': [
        {
            exterior_img: Object
        }
    ],
    'exterior_videos': {
        type: String
    },
    'interior_photos': [
        {
            interior_img: Object
        }
    ],
    'interior_videos': {
        type: String
    },
    'engine_photos': [
        {
            engine_img: Object
        }
    ],
    'tyre_photos': [
        {
            tyre_img: Object
        }
    ],
    'dent_photos': [
        {
            dent_img: Object
        }
    ],
    'dent_videos': {
        type: String
    },
    'engine_and_periphals': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'drivetrain_tested': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'body_structure': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'interior': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'mechanical_tested': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'exterior': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'wheels_and_tyres': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    // 'engine_and_periphals':{
    //     'answer':{
    //         type:String,
    //         enum:['yes','no']
    //     },
    //     'stars':{
    //         type:Number,
    //         default:0
    //     }
    // }
    'engine_assembly_tested': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'engine_cooling_system': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'air_supply_system': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'fuel_supply_system': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'mechanical': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'exhaust_system': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'ignation_system_tested': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'transmission': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'final_drive': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'core_structure': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'support_structure': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'air_condition_system': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'standrad_fitment_and_features': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'breaks': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'steering': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'susspension': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'wheels': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'tyres': {
        'answer': {
            type: String,
            enum: ['yes', 'no']
        },
        'stars': {
            type: Number,
            default: 0
        }
    },
    'is_published': {
        type: Boolean,
        default: false
    },
    'is_booked': {
        type: Boolean,
        default: false
    },
    'book_date': {
        type: Date
    },
    'is_sold': {
        type: Boolean,
        default: false
    },
    'sold_date': {
        type: Date
    },
    'price': {
        type: Number
    },
    'owner_serial_no': {
        type: String
    },
    'body_type': {
        type: String,
        enum: ["hatchback", "minivan", "pickup truck", "convertible", "coupe", "wagaon", "luxry", "hybrid", "sedan"]
    },
    'lifestyle': {
        type: String
    },
    'transmission': {
        type: String
    },
    'customer_type': {
        type: String,
        enum: ["seller", "dealer"]
    },
    'contact_details':{
        'full_name':{
            type:String
        },
        'email':{
            type:String
        },
        'phone_number':{
            type:String
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
    },
    'reg_no':{
        type:String
    },
    'views':{
        type:Number,
        default:0
    }
}, { timestamps: true })

export default mongoose.model('car-details', schema, 'car-details')