import Customer from "../models/Customer_m.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import Game from "../models/StartGameFormSchema.js";
import { GameDetails } from "../models/GameDetails.js";
const app = express();

app.use(cookieParser());
app.use(express.json());

export const logIn = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await Customer.findOne({ email: email });
    if (!user) {
      return res.json({ msg: "user not registered" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      // console.log(password);
      return res.json({ msg: "check password" });
    }
    if (user.userType != userType) {
      return res.json({ msg: "check userType" });
    }
    if (user.status != "active") {
      return res.json({ msg: "user not active" });
    }

    const token = jwt.sign({ id: user._id }, "blockchain", { expiresIn: "1h" });
    user.token = token;
    user.password = "";

    const options = {
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json(user._id);
    // res.status(201).json(user);
  } catch (e) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const signUp = async (req, res) => {
  const { name, email, password, mobile, userType } = req.body;
  const myEncPassword = await bcrypt.hash(password, 10);
  const data = {
    email: email,
    password: myEncPassword,
    name: name,
    mobile: mobile,
    userType: userType,
  };

  try {
    const check = await Customer.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      const newUser = await Customer.create(data); // Use create instead of insertMany
      console.log("New user created:", newUser);
      const token = jwt.sign({ id: newUser._id }, "blockchain", {
        expiresIn: "1h",
      });
      res.json("notexist");
    }
  } catch (e) {
    console.error("Error:", e);
    res.json("fail");
  }
};

//fetch user using userid
export const fetchUser = async (req, res) => {
  // const { name, email, password, mobile, userType } = req.body;
  const { userid } = req.body;
  try {
    const user = await Customer.findOne({ _id: userid });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const showGames = async (req, res) => {
  try {
    const { userid, userType } = req.body;
    // console.log(userType);
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

export const getGameDetails = async (req, res) => {
  const { gameid } = req.params;
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
    res.status(500).json({ massage: "Internal Server Error" });
  }
};

export const placeOrder = async (req, res) => {
  const { gameid, userid, userType, orderQuantity, weekNumber } = req.body;
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

    console.log(game);

    const currentUser = await Customer.findById(userid);
    const gameDetails = game.weeksData[weekNumber].gameDetails.find((game) =>
      game.user._id.equals(currentUser._id)
    );

    const dbCurrentWeekGameDetails = await GameDetails.findById(
      gameDetails._id
    );
    const currentWeekInventory = dbCurrentWeekGameDetails.inventory;
    const currentWeekTotalInventory =
      dbCurrentWeekGameDetails.inventory +
      dbCurrentWeekGameDetails.receivedInventory;

    const currentWeekTotalDemand =
      dbCurrentWeekGameDetails.backOrder + dbCurrentWeekGameDetails.demand;

    dbCurrentWeekGameDetails.orderPlaced = orderQuantity;

    dbCurrentWeekGameDetails.shippedDemand =
      currentWeekTotalInventory >= currentWeekTotalDemand
        ? currentWeekTotalDemand
        : currentWeekTotalInventory;

    dbCurrentWeekGameDetails.backOrderNextWeek =
      currentWeekTotalInventory >= currentWeekTotalDemand
        ? 0
        : currentWeekTotalDemand - currentWeekTotalInventory;

    dbCurrentWeekGameDetails.inventory =
      currentWeekTotalInventory >= currentWeekTotalDemand
        ? currentWeekTotalInventory - currentWeekTotalDemand
        : 0;

    dbCurrentWeekGameDetails.isOrdered = true;

    await dbCurrentWeekGameDetails.save();

    if (weekNumber + 1 < game.weeks) {
      const nextWeekGameDetails = game.weeksData[
        weekNumber + 1
      ].gameDetails.find((game) => game.user._id.equals(currentUser._id));

      const dbNextWeekGameDetails = await GameDetails.findById(
        nextWeekGameDetails._id
      );

      dbNextWeekGameDetails.backOrder =
        dbCurrentWeekGameDetails.backOrderNextWeek;

      dbNextWeekGameDetails.inventory = dbCurrentWeekGameDetails.inventory;

      await dbNextWeekGameDetails.save();
    }

    if (weekNumber + game.deliveryLeadTime + 1 < game.weeks) {
      const deliveryWeekGameDetails = game.weeksData[
        weekNumber + game.deliveryLeadTime + 1
      ].gameDetails.find((game) => game.user._id.equals(currentUser._id));

      const dbDeliveryWeekGameDetails = await GameDetails.findById(
        deliveryWeekGameDetails._id
      );

      if (userType !== "retailer") {
        const prevUserType =
          userType === "wholesaler"
            ? "retailer"
            : "distributor"
            ? "wholesaler"
            : "manufacturer"
            ? "distributor"
            : null;
        if (prevUserType !== null && weekNumber + 1 < game.weeks) {
          const prevPersonNextWeekGameDetails = game.weeksData[
            weekNumber + 1
          ].gameDetails.find((game) => game.user._id.equals(prevUserType));
          console.log(prevPersonNextWeekGameDetails);
          if(prevPersonNextWeekGameDetails){
            const dbPrevPersonNextWeekGameDetails = await GameDetails.findById(
              prevPersonNextWeekGameDetails._id
            );
  
            dbPrevPersonNextWeekGameDetails.receivedInventory =
              dbCurrentWeekGameDetails.shippedDemand;
            await dbPrevPersonNextWeekGameDetails.save();
          }
        }
      }

      await dbDeliveryWeekGameDetails.save();
    }

    if (weekNumber + 1 < game.weeks && userType !== "manufacturer") {
      const nextUserType =
        userType === "retailer"
          ? "wholesaler"
          : userType === "wholesaler"
          ? "distributor"
          : "manufacturer";

      const nextPersonGameDetails = game.weeksData[
        weekNumber + 1
      ].gameDetails.find((game) => game.user.userType === nextUserType);

      const dbNextPersonGameDetails = await GameDetails.findById(
        nextPersonGameDetails._id
      );

      dbNextPersonGameDetails.demand = orderQuantity;
      await dbNextPersonGameDetails.save();
    }

    res.status(200).json({ msg: "order placed successfully" });
  } catch (error) {
    console.error("error placing order ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
