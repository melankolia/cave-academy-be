import { Router } from "express";
import FileController from "../controllers/file.controller";
import Verification from "../middleware/verification";

const router = Router();

const fileController = new FileController();

router.post("/uploadFile", 
    fileController.uploadMiddleware,
    fileController.uploadFile.bind(fileController)
);

export default router;