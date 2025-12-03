import express from "express";
import { fetchHotels } from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", fetchHotels);

export default router;
