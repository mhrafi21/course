import {Router} from "express"
import { lectureControllers } from "./lecture.controller";

const router = Router();

router.post("/create-lecture", lectureControllers.addLecture);

router.get("/:lecture_slug", lectureControllers.getLectureById);


export const lectureRoutes = router;
