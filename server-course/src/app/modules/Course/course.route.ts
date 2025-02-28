import { Router } from "express";
import { courseControllers } from "./course.controller";
const router = Router();


router.post("/create-course", courseControllers.createCourse);
router.get("/", courseControllers.getCourses);
router.get("/:id", courseControllers.getCourseById);
router.put("/:id", courseControllers.updateCourseById);
router.delete("/:id", courseControllers.deleteCourseById);

export const courseRoutes = router;