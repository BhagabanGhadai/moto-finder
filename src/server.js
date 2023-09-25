import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import env from './../env.js'
import { verifyBlackList } from './middlewares/auth.middleware.js';
import { connectDB } from '../src/utils/db.connection.js'
import { errorHandler } from './middlewares/error.middleware.js';

/**routers**/
import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user/user.routes.js"
import carRouter from "./routes/car/car.routes.js"
import sellRouter from "./routes/car-sell-request/car_sell_request.routes.js"
import socialRouter from "./routes/socials/social.routes.js"
import testimonialRouter from "./routes/testimonial/testimonial.routes.js"

export const start = () => {
    const app = express()
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: "*", credentials: true }));
    app.use(cookieParser());
    app.use(verifyBlackList)
    if (env.NODE_ENV == "dev") app.use(morgan('dev'))

    /**Api's**/
    app.use("/api/v1/healthcheck", healthcheckRouter);
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/car", carRouter);
    app.use("/api/v1/sell", sellRouter);
    app.use("/api/v1/social", socialRouter);
    app.use("/api/v1/testimony", testimonialRouter);
    
    connectDB()
    app.listen(env.PORT, () => {
        console.log("⚙️  Server is running on port: " + env.PORT);
    }).on('error', (err) => {
        console.log(err)
        process.exit()
    })
    app.use(errorHandler)
}
