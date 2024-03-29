import { ApiError } from "../Utils/apiError.js";
import Vehicle from "../models/vehicle.model.js";
import VehicleInfo from "../models/vehicleInfo.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import dailySummary from "../models/dailySummary.model.js";
import weeklySummary from "../models/weeklySummary.model.js";
import montlySummary from "../models/montlySummary.model.js";
import yearlySummary from "../models/yearlySummary.model.js";
import moment from "moment";

const createVehicle = asyncHandler(async (req, res) => {
  const { licencePlate, brand, model, type, Vin, mileage } = req.body;

  const vehicleExist = await Vehicle.findOne({ licencePlate });
  if (vehicleExist) {
    throw new ApiError(400, "Vehicle already exist");
  }
  const vehicle = await Vehicle.create({
    licencePlate,
    brand,
    model,
    type,
    Vin,
    mileage,
  });
  return res.status(201).json(new ApiResponse(201, vehicle));
});

const addInfo = asyncHandler(async (req, res) => {
  let { licencePlate, miles, date } = req.body;
  const vehicle = await Vehicle.findOne({ licencePlate });
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  const vehicleInfo = await VehicleInfo.create({
    licencePlate: vehicle._id,
    miles,
    date,
  });

  return res.status(201).json(new ApiResponse(201, vehicleInfo));
});

function energyConsumption(miles, mileage) {
  return miles / mileage;
}

function costAnalysis(miles, mileage) {
  return (miles / mileage) * 0.16;
}  
  

const dailyReport = asyncHandler(async (req, res) => {
  const {fromDate,toDate}=req.body
  if(moment(toDate).isBefore(fromDate)){
    throw new ApiError(400,"Invalid date range")
  }

  const dailyReport=await dailySummary.find(
    {
        date:{
            $gte:fromDate,
            $lte:toDate
        
        }
    }
  ).populate("licencePlate").select("-createdAt -updatedAt -__v -_id -weeklyTotalMiles -monthlyTotalMiles -yearlytTotalMiles")
  
    const energyconsumtion = dailyReport.map((report) => {
        return{
            energyConsumption: energyConsumption(report.dailyTotalMiles, report.licencePlate.mileage),
        }
    }
    )
    const costanalysis = dailyReport.map((report) => {
        return{
            costAnalysis: costAnalysis(report.dailyTotalMiles, report.licencePlate.mileage),
        }
    }
    )

  return res
  .status(200)
  .json(
    new ApiResponse(
        200,
        [
            {
                "date": fromDate,
                "dailyReport": dailyReport,
                "energyConsumption": energyconsumtion,
                "costAnalysis": costanalysis
            }
        ]
    )
  )
});

const weeklyReport = asyncHandler(async (req, res) => {
    const {fromDate,toDate}=req.body
    console.log(moment(toDate))
    console.log(moment(fromDate))
    if(moment(toDate).isBefore(fromDate)){
        throw new ApiError(400,"Invalid date range")
    }
    if(moment(toDate).diff(fromDate)<7){
        throw new ApiError(400,"Date range must be at least 7 days")
    }
    const week = moment(fromDate).startOf("week").format("YYYY-MM-DD");
    const end= moment(toDate).endOf("week").format("YYYY-MM-DD");
    const weeklyReport=await weeklySummary.find(
        {
            date:{
                $gte:week,
                $lte:end
            }
        }
    ).populate("licencePlate").select("-createdAt -updatedAt -__v -_id")


    const energyconsumtion = weeklyReport.map((report) => {
        return{
            energyConsumption: energyConsumption(report.weeklyTotalMiles, report.licencePlate.mileage),
        }
    }
    )
    const costanalysis = weeklyReport.map((report) => {
        return{
            costAnalysis: costAnalysis(report.weeklyTotalMiles, report.licencePlate.mileage),
        }
    }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            [
                {
                    "date": fromDate,
                    "weeklyReport": weeklyReport,
                    "energyConsumption": energyconsumtion,
                    "costAnalysis": costanalysis
                }
            ]
        )
    )
});



const milesCalculator = asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({});
    let year = 0;
    for (const vehicle of vehicles) {
      // Fetch daily mileage data for the vehicle
      const dailyData = await VehicleInfo.find({ licencePlate: vehicle._id });
    //   console.log(dailyData)
      const dailyMileage = [];
      const weeklyMileage = [];
      const monthlyMileage = {};
      const yearlyMileage = {};
    
      // Iterate over each daily mileage entry
      for (const miles of dailyData) {
        if (!miles.date || !miles.miles) {
          continue;
        }
    
        const date = miles.date;
         year = date.getFullYear();
        const month = date.getMonth();
    
        dailyMileage.push({
          date,
          licencePlate: vehicle._id,
          dailyTotalMiles: miles.miles,
        });
    
        // Group data by week
        const week = moment(date).startOf("week").format("YYYY-MM-DD");
        const existingWeekly = weeklyMileage.find((item) => item.date === week);
        console.log(existingWeekly)
        if (existingWeekly) {
          existingWeekly.weeklyTotalMiles += miles.miles;
        } else {
          weeklyMileage.push({ date:week, licencePlate: vehicle._id, weeklyTotalMiles: miles.miles });
        }
    
        // Group data by month (use object for efficient updates)
        const monthlyKey = `${year}-${month + 1}`;
        monthlyMileage[monthlyKey] = (monthlyMileage[monthlyKey] || 0) + miles.miles;
    
        // Group data by year
        yearlyMileage[year] = (yearlyMileage[year] || 0) + miles.miles;
      }
    
      // Insert data into respective collections
    //   await dailySummary.insertMany(dailyMileage, { ordered: false });
      await weeklySummary.insertMany(weeklyMileage, { ordered: false });
    
      const monthlyData = [];
      for (const [date, value] of Object.entries(monthlyMileage)) {
        monthlyData.push({ date: new Date(date), licencePlate: vehicle._id, montlyTotalMiles: value });
      }
    //   await montlySummary.insertMany(monthlyData);
    
    //   await yearlySummary.insertMany({ date: year, licencePlate: vehicle._id, yearlyTotalMiles: yearlyMileage[year] });
    }
    return res.status(200).json(new ApiResponse(200, "Miles calculated successfully"));
});

export {
  createVehicle,
  addInfo,
  dailyReport,
  energyConsumption,
  milesCalculator,
    weeklyReport
};
