import {Router} from "express"
import { paymentControllers } from "./payment.controller";
const route = Router();

route.post("/create-payment", paymentControllers.createPayment);

export const paymentRoutes = route;