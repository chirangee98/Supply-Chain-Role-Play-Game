import Customer from "../models/Customer_m.js";
import Game from "../models/StartGameFormSchema.js";
import express, { urlencoded } from "express";
import { Week } from "../models/WeekSchema.js";
import { GameDetails } from "../models/GameDetails.js";
import { logIn } from "./user.js";
const app = express();
app.use(express.json());

//fetch user using userid
export const fetchUsers = async (req, res) => {
  try {
    // const users = await Customer.find({ status: "inactive" });
    // const filter = {
    //   status: "inactive", // Filter for inactive users
    //   userType: { $ne: 'admin' } // Exclude users with 'admin' user type
    // };

    const users = await Customer.find({ status: "inactive" });
    res.json(users);
  } catch (error) {
    console.error("Error fetching usera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//All active user
export const allActiveUser = async (req, res) => {
  // console.log("all active user")
  try {
    // const users = await Customer.find({ status: "inactive" });
    // const filter = {
    //   status: "inactive", // Filter for inactive users
    //   userType: { $ne: 'admin' } // Exclude users with 'admin' user type
    // };

    const users = await Customer.find({ status: "active" });
    res.json(users);
  } catch (error) {
    console.error("Error fetching usera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchGames = async (req, res) => {
  // console.log("chla fetch game")
  try {
    const { userid, userType } = req.body;
    // console.log(userType);
    if (userType === "SuperAdmin") {
      const game = await Game.find().populate("adminId", "name");
      // console.log("sa chala");
      res.json(game);
    } else {
      const game = await Game.find({ adminId: userid });
      res.json(game);
    }
  } catch (error) {
    console.error("error fetching game ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const Games = async (req, res) => {
  // console.log("chla fetch game")
  try {
    const { userid, userType } = req.body;
    console.log(userType);
    let query;
    switch (userType) {
      case "retailer":
        // Assuming 'retailer' column exists in the Game table
        query = await Game.find({ retailer: userid });
        break;
      case "wholesaler":
        // Assuming 'wholesaler' column exists in the Game table
        query = await Game.find({ wholesaler: userid });
        break;
      case "distributor":
        // Assuming 'distributor' column exists in the Game table
        query = await Game.find({ distributor: userid });
        break;
      case "manufacturer":
        // Assuming 'manufacturer' column exists in the Game table
        query = await Game.find({ manufacturer: userid });
        break;
      default:
        // This shouldn't happen due to the validation above, but handle unexpected cases
        return res.status(500).json({ message: "Internal server error" });
    }

    const games = query;
    res.json(games);
  } catch (error) {
    console.error("error fetching game ", error);
    res.status(500).json({ massage: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    //  console.log(userId);
    // console.log(status);
    const user = await Customer.findById(userId);
    user.status = status;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const startGame = async (req, res) => {
//   const { userId , instance, week } = req.body;
//   console.log("chla");
//   try {
//       const newGame =  new Game({
//         instance: instance,
//         week: week,
//         adminId: userId
//       });
//       await newGame.save();
//       res.json("success");
//   } catch (error) {
//       console.error('Error starting game:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
export const startGame = async (req, res) => {
  console.log(req.body);
  const {
    userId,
    weeks,
    initialInventory,
    deliveryLeadTime,
    holdingCost,
    backorderCost,
    retailer,
    distributor,
    wholesaler,
    manufacturer,
  } = req.body;
  console.log("chla");
  try {
    const newGame = await Game.create({
      userId,
      weeks,
      initialInventory,
      deliveryLeadTime,
      holdingCost,
      backorderCost,
      retailer,
      distributor,
      wholesaler,
      manufacturer,
    });

    const retailerData = await Customer.findById(retailer);
    const wholesalerData = await Customer.findById(wholesaler);
    const distributorData = await Customer.findById(distributor);
    const manufacturerData = await Customer.findById(manufacturer);

    const weeksArray = await Promise.all(
      Array.from({ length: weeks }).map(async (_, i) => {
        const week = new Week({ game: newGame._id });
        const retailerGameDetails = await GameDetails.create({
          user: retailerData._id,
          inventory: i === 0 ? initialInventory : 0,
          demand: Math.ceil(Math.random() * 100 + 1),
        });
        const wholesalerGameDetails = await GameDetails.create({
          user: wholesalerData._id,
          inventory: i === 0 ? initialInventory : 0,
        });
        const distributorGameDetails = await GameDetails.create({
          user: distributorData._id,
          inventory: i === 0 ? initialInventory : 0,
        });
        const manufacturerGameDetails = await GameDetails.create({
          user: manufacturerData._id,
          inventory: i === 0 ? initialInventory : 0,
        });
        week.gameDetails = [
          retailerGameDetails._id,
          wholesalerGameDetails._id,
          distributorGameDetails._id,
          manufacturerGameDetails._id,
        ];
        week.game = newGame._id;
        await week.save();
        return week._id;
      })
    );
        
    console.log("weeks created");
    newGame.weeksData = weeksArray;
    await newGame.save();
    console.log("done start game");
    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to start game");
  }
};


// controllers/gameController.js
// import Game from '../models/Game'; // adjust the path as needed

export const gameDetails = async (req, res) => {
  const { gameid } = req.params;
  console.log("gamedatials chla");
  try {
    const game = await Game.findById(gameid).populate({
      path: "weeksData",
      model: "Week",
      populate: {
        path: "gameDetails",
        model: "GameDetails",
        populate: {
          path: "user",
          model: "Customer",
          select: "-password",
        },
      },
    });

    res.status(200).json(game);
  } catch (error) {
    console.error("error fetching game ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const showGames = async (req, res) => {
  try {
    const { userid, userType } = req.body;
    console.log(userType);
    let query;

    switch (userType) {
      case "retailer":
        query = await Game.find({ retailer: userid });
        break;
      case "wholesaler":
        query = await Game.find({ wholesaler: userid });
        break;
      case "distributor":
        query = await Game.find({ distributor: userid });
        break;
      case "manufacturer":
        query = await Game.find({ manufacturer: userid });
        break;
      case "admin":
      case "superadmin":
        query = await Game.find({});
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }

    const games = query;
    res.json(games);
  } catch (error) {
    console.error("error fetching games", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


