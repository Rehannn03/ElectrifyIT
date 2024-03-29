import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:true,
    methods:'GET,POST,PUT,DELETE',
    allowedHeaders:'Content-Type,Authorization',
    credentials:true
}))


//routes

import vehicleRoutes from './routes/vehicle.routes.js';
app.use('/api/v1/vehicles',vehicleRoutes)

export default app;