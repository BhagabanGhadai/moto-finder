import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import carSellRequest from '../../models/car-sell-request/car_sell_req.model.js'
import carBrand from '../../models/car/car_brand.model.js'
import carModel from '../../models/car/car_model.model.js'
import rtoCity from '../../models/car/rto_city.model.js'
import User from '../../models/user/user.model.js';
import mongoose from 'mongoose';
import moment from 'moment';

export const makeSellRequest = asyncHandler(async (req, res) => {
    if (!req.user.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.user.user_id });
    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    req.body.user_id = user._id
    if (mongoose.isValidObjectId(req.body.car_brand)) {
        let car = await carBrand.findById(req.body.car_brand)
        if (!car) {
            throw new ApiError(404, 'no such car brand found')
        }
    } else {
        let car = await carBrand.findOne({ car_brand_name: req.body.car_brand })
        req.body.car_brand = car._id
        if (!car) {
            let newCar = await carBrand.create({ car_brand_name: req.body.car_brand })
            req.body.car_brand = newCar._id
        }
    }
    if (mongoose.isValidObjectId(req.body.rto_location)) {
        let location = await rtoCity.findById(req.body.rto_location)
        if (!location) {
            throw new ApiError(404, 'no such location found')
        }
    } else {
        let location = await rtoCity.findOne({ city_name: req.body.rto_location })
        req.body.rto_location = location._id
        if (!location) {
            let newLocation = await rtoCity.findOne({ city_name: req.body.rto_location })
            req.body.rto_location = newLocation._id
        }
    }
    if (mongoose.isValidObjectId(req.body.car_model)) {
        let car = await carModel.findById(req.body.car_model)
        if (!car) {
            throw new ApiError(404, 'no such car brand found')
        }
    } else {
        let car = await carModel.findOne({ car_model_name: req.body.car_model })
        req.body.car_model = car._id
        if (!car) {
            let newCar = await carBrand.create({ car_brand: req.body.car_brand, car_model_name: req.body.car_model })
            req.body.car_model = newCar._id
        }
    }
    if (req.body.year) {
        req.body.year = moment(req.body.year, 'DD-MMM-YY').toDate()
    }
    if (req.body.schedule_date) {
        req.body.schedule_date = moment(req.body.schedule_date, 'DD-MMM-YY').toDate()
    }
    let new_sell_request = new carSellRequest(req.body)
    await new_sell_request.save()
    return res.status(201).send(new ApiResponse(201, new_sell_request, 'sell request marked successfully'))
});

export const getSingleSellRequestDetails = asyncHandler(async (req, res) => {
    if (!req.query.sell_request_id) {
        throw new ApiError(400, 'sell request id required')
    }
    let sell_request_deatils = await carSellRequest.findById(req.query.sell_request_id)

    if (!sell_request_deatils) {
        throw new ApiError(404, 'no such sell request details found')
    }
    res.status(200).send(new ApiResponse(200, sell_request_deatils, 'sell request details fetched successfully'))
});

export const getAllSellRequest = asyncHandler(async (req, res) => {
    let page = 1
    if (req.query.page) {
        page = parseInt(req.query.page)
    }

    let page_size = 10
    if (req.query.page_size) {
        page_size = parseInt(req.query.page_size)
    }
    let pipeline = [
        {
            $sort: { createdAt: -1 }
        }
    ]
    if (req.query.user_id) {
        pipeline.push({
            $match: { user_id: new mongoose.Types.ObjectId(req.query.user_id) }
        })
    }
    if(req.query.status){
        pipeline.push({
            $match:{status:req.query.status}
        })
    }
    if(req.query.dealer_verification){
        req.query.dealer_verification=="true"?req.query.dealer_verification=true:req.query.dealer_verification=false
        pipeline.push({
            $match:{is_dealer_verification:req.query.dealer_verification}
        })
    }
    pipeline.push(
        { "$skip": (page - 1) * page_size },
        { "$limit": page_size }
    )
    let all_sell_request_list = await carSellRequest.aggregate(pipeline)
    if (!all_sell_request_list.length) {
        throw new ApiError(404, 'no loan request found')
    }
    return res.status(200).send(new ApiResponse(200, all_sell_request_list, 'all sell request fetched successful'))

});

export const updateAsellRequest = asyncHandler(async (req, res) => {
    if (!req.query.sell_request_id) {
        throw new ApiError(400, 'sell request id required')
    }
    let sell_request_deatils = await carSellRequest.findById(req.query.sell_request_id)

    if (!sell_request_deatils) {
        throw new ApiError(404, 'no such sell request details found')
    }
    if (req.body.car_brand) {
        if (mongoose.isValidObjectId(req.body.car_brand)) {
            let car = await carBrand.findById(req.body.car_brand)
            if (!car) {
                throw new ApiError(404, 'no such car brand found')
            }
        } else {
            let car = await carBrand.findOne({ car_brand_name: req.body.car_brand })
            if (!car) {
                let newCar = await carBrand.create({ car_brand_name: req.body.car_brand })
                req.body.car_brand = newCar._id
            }
            req.body.car_brand = car._id
        }
    }
    if (req.body.rto_location) {
        if (mongoose.isValidObjectId(req.body.rto_location)) {
            let location = await rtoCity.findById(req.body.rto_location)
            if (!location) {
                throw new ApiError(404, 'no such location found')
            }
        } else {
            let location = await rtoCity.findOne({ city_name: req.body.rto_location })
            if (!location) {
                let newLocation = await rtoCity.findOne({ city_name: req.body.rto_location })
                req.body.rto_location = newLocation._id
            }
            req.body.rto_location = location._id
        }
    }
    if (req.body.car_model) {
        if (mongoose.isValidObjectId(req.body.car_model)) {
            let car = await carModel.findById(req.body.car_model)
            if (!car) {
                throw new ApiError(404, 'no such car brand found')
            }
        } else {
            let car = await carModel.findOne({ car_model_name: req.body.car_model })
            if (!car) {
                let newCar = await carBrand.create({ car_brand: req.body.car_brand, car_model_name: req.body.car_model })
                req.body.car_model = newCar._id
            }
            req.body.car_model = car._id
        }
    }
    if (req.body.year) {
        req.body.year = moment(req.body.year, 'DD-MMM-YY').toDate()
    }
    if (req.body.schedule_date) {
        req.body.schedule_date = moment(req.body.schedule_date, 'DD-MMM-YY').toDate()
    }
    let update_sell_deatils = await carSellRequest.findOneAndUpdate(
        { _id: req.query.sell_request_id },
        req.body,
        { new: true }
    )
    if (!update_sell_deatils) {
        throw new ApiError(400, 'updation failed')
    }
    return res.status(200).send(new ApiResponse(200, update_sell_deatils, 'update successful'))


});

export const deleteAsellRequest = asyncHandler(async (req, res) => {
    if (!req.query.sell_request_id) {
        throw new ApiError(400, 'sell request id required')
    }
    let sell_request_deatils = await carSellRequest.findById(req.query.sell_request_id)

    if (!sell_request_deatils) {
        throw new ApiError(404, 'no such sell request details found')
    }
    let delete_sell_deatils = await carSellRequest.findOneAndDelete({ _id: req.query.sell_request_id })
    if (!delete_sell_deatils) {
        throw new ApiError(400, 'delation failed')
    }
    return res.status(204).send(new ApiResponse(204, {}, 'deletion successful'))

});