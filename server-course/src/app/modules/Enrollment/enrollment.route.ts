import {Router} from "express"
import { enrollmentControllers } from "./enrollment.controller";

const router = Router();

router.post("/enroll", enrollmentControllers.enrollMentUser);
router.get("/", enrollmentControllers.getUserEnrollments)
export const enrolmentRoutes = router;

