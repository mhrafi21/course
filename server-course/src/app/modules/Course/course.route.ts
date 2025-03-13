import { Router } from "express";
import { courseControllers } from "./course.controller";
import auth from "../../middlewares/auth";
import { TURole, USER_ROLE } from "../Auth/auth.constant";
const router = Router();

router.post("/create-course", auth(USER_ROLE.instructor as TURole, USER_ROLE.admin as TURole), courseControllers.createCourse);
router.get("/", courseControllers.getCourses);
router.get("/instructor", auth(USER_ROLE.instructor), courseControllers.getCourseByInstructorId);
router.patch("/approve/:id", courseControllers.approvedCourse);
router.get("/:slug", courseControllers.getCourseById);
router.put("/:id", courseControllers.updateCourseById);
router.delete("/:id", courseControllers.deleteCourseById);

export const courseRoutes = router;