import { createVehicle,addInfo,dailyReport,milesCalculator,weeklyReport } from "../controllers/vehicle.controller.js";
import express from 'express';

const router = express.Router()


router.post('/createVehicle',createVehicle)
router.post('/addInfo',addInfo)
router.get('/dailyReport',dailyReport)
router.get('/milesCalculator',milesCalculator)
router.get('/weeklyReport',weeklyReport)
export default router;