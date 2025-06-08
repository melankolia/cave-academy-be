import { Router } from "express";
import LinkPreviewController from "../controllers/link_preview.controller";
import Verification from "../middleware/verification";

const router = Router();
const linkPreviewController = new LinkPreviewController();

router.get("/preview", Verification.verifyToken, linkPreviewController.getLinkPreview.bind(linkPreviewController));

export default router;