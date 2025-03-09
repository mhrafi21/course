import {Router} from "express"
import { paymentControllers } from "./payment.controller";
import auth from "../../middlewares/auth";
import { TURole, USER_ROLE } from "../Auth/auth.constant";
const route = Router();

route.post("/create-payment", auth(USER_ROLE.student as TURole), paymentControllers.createPayment);

export const paymentRoutes = route;