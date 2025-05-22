import { Router } from "express";
import NewsController from "../controllers/news.controller";
import NewsService from "../services/news.service";
import Verification from "../middleware/verification";
import NewsRepository from "../repositories/news";

const router = Router();

const newsRepository = new NewsRepository();
const newsService = new NewsService(newsRepository);
const newsController = new NewsController(newsService);


router.post("/", Verification.verifyToken, (req, res) => newsController.createNews(req, res));
router.get("/", (req, res) => newsController.getAllNews(req, res));
router.get("/:id", (req, res) => newsController.getNewsById(req, res));
router.put("/:id", Verification.verifyToken, (req, res) => newsController.updateNews(req, res));
router.delete("/:id", Verification.verifyToken, (req, res) => newsController.deleteNews(req, res));

export default router; 