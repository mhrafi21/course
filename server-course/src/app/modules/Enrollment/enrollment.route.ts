import {Router} from "express"
import { enrollmentControllers } from "./enrollment.controller";

const router = Router();

router.post("/enroll", enrollmentControllers.enrollMentUser);

export const enrolmentRoutes = router;

