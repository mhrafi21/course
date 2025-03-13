import {Router} from "express"
import { enrollmentControllers } from "./enrollment.controller";
import auth from "../../middlewares/auth";
import { TURole, USER_ROLE } from "../Auth/auth.constant";

const router = Router();

router.post("/create-enroll", enrollmentControllers.enrollMentUser);
router.get("/", auth(USER_ROLE.student as TURole || USER_ROLE.admin as TURole), enrollmentControllers.getUserEnrollments)
export const enrolmentRoutes = router;

